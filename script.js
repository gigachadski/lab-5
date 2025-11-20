
function swapContent() {
    const blockX = document.getElementById('x-content');
    const blockY = document.getElementById('y-content');

    if (blockX && blockY) {
        const temp = blockX.innerHTML;
        blockX.innerHTML = blockY.innerHTML;
        blockY.innerHTML = temp;
    } else {
        console.error("Елементи X або Y не знайдені. Перевірте HTML.");
    }
}


swapContent();



function calculateRectangleArea() {
   
    const length = Math.floor(Math.random() * 100) + 1;
    const width = Math.floor(Math.random() * 100) + 1;
    const area = length * width;

    const block5 = document.getElementById('block-5');
    
    if (block5) {
        const resultDiv = document.createElement('div');
        resultDiv.style.marginTop = "20px";
        resultDiv.style.border = "2px solid red";
        resultDiv.style.padding = "10px";
        resultDiv.innerHTML = `
            <h3>Завдання 2: Площа прямокутника</h3>
            <p>Довжина: ${length}, Ширина: ${width}</p>
            <p><strong>Площа: ${area}</strong></p>
        `;
        block5.appendChild(resultDiv);
    }
}

calculateRectangleArea();


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

function findMinValues() {
    const cookieName = "minCountResult";
    const savedResult = getCookie(cookieName);
    const block5 = document.getElementById('block-5');

    if (!block5) return;

   
    if (savedResult) {
       
        const keepData = confirm(
            `В Cookies знайдена збережена інформація:\n"${savedResult}"\n\n` +
            `Натисніть "ОК", щоб зберегти ці дані (форма не буде виведена).\n` +
            `Натисніть "Скасувати", щоб видалити дані і ввести нові.`
        );

        if (keepData) {
            
            alert("Cookies наявні. Необхідно перезавантажити веб-сторінку для оновлення даних.");
            
           
        } else {
           
            eraseCookie(cookieName);
            location.reload(); 
            
        }

    } else {
       
        const formContainer = document.createElement('div');
        formContainer.style.marginTop = "20px";
        formContainer.style.background = "#f0f0f0";
        formContainer.style.padding = "15px";
        formContainer.style.border = "1px solid #999";
        
        let inputsHTML = '<h3>Завдання 3: Визначення мінімальних чисел</h3><form id="minForm" style="display:flex; flex-wrap:wrap; gap:10px;">';
        
        
        for (let i = 1; i <= 10; i++) {
            inputsHTML += `
                <label style="display:flex; flex-direction:column; align-items:center;">
                    <span>Число ${i}</span>
                    <input type="number" name="num" value="${Math.floor(Math.random() * 20)}" required style="width: 50px;">
                </label>`;
        }
        inputsHTML += '<div style="width:100%; margin-top:10px;"><button type="submit" style="padding:8px 16px; cursor:pointer;">Визначити мінімум</button></div></form>';
        
        formContainer.innerHTML = inputsHTML;
        block5.appendChild(formContainer);

        
        document.getElementById('minForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const inputs = document.querySelectorAll('input[name="num"]');
            let numbers = [];
            inputs.forEach(input => numbers.push(Number(input.value)));

            
            const minVal = Math.min(...numbers);
            const count = numbers.filter(x => x === minVal).length;

            const message = `Мінімальне число: ${minVal}, Кількість: ${count}`;
            
            
            alert(message);
            
            
            setCookie(cookieName, message, 1); 
            
            
            location.reload();
        });
    }
}


findMinValues();



function italicLogic() {
    const block3 = document.getElementById('block-3');
    const checkbox = document.getElementById('italicCheckbox');
    const lsKey = 'block3ItalicState';

    if (!block3) return;

    const savedState = localStorage.getItem(lsKey);
    if (savedState === 'true') {
        block3.style.fontStyle = 'italic';
        if(checkbox) checkbox.checked = true;
    } else {
        block3.style.fontStyle = 'normal';
    }

    function updateItalic() {
        if (checkbox && checkbox.checked) {
            block3.style.fontStyle = 'italic';
            localStorage.setItem(lsKey, 'true');
        } else {
            block3.style.fontStyle = 'normal';
            localStorage.setItem(lsKey, 'false');
        }
    }

  
    window.addEventListener('keydown', function() { 
        updateItalic();
    });

    
    if(checkbox) {
        checkbox.addEventListener('change', updateItalic);
    }
}

italicLogic();



function setupDynamicCSS() {

    const blockX = document.getElementById('x-content');
    const blockY = document.getElementById('y-content');
    
    const formContainerBlock = document.getElementById('block-5');
    const buttonsContainerBlock = document.getElementById('block-2');
    const lsKey = 'cssRules';

    
    let rules = [];
    try {
        rules = JSON.parse(localStorage.getItem(lsKey)) || [];
    } catch (e) {
        console.error("Помилка читання LocalStorage", e);
        rules = [];
    }

    
    const safeApply = (sel, prop, val) => {
        try {
            const els = document.querySelectorAll(sel);
            els.forEach(el => el.style[prop] = val);
        } catch (error) {
            console.warn(`Пропускаємо некоректний селектор: ${sel}`);
        }
    };

    
    rules.forEach(rule => safeApply(rule.selector, rule.property, rule.value));


   
    const renderButtons = () => {
        if (!buttonsContainerBlock) return;
        buttonsContainerBlock.querySelectorAll('.del-css-btn').forEach(b => b.remove());
        
       
        const currentRules = JSON.parse(localStorage.getItem(lsKey)) || [];

        currentRules.forEach((rule, idx) => {
            const btn = document.createElement('button');
            btn.className = 'del-css-btn';
            btn.innerText = `Видалити: ${rule.selector}`;
            btn.style.display = 'block';
            btn.style.marginTop = '5px';
            btn.style.fontSize = '11px';
            btn.style.cursor = 'pointer';
            btn.style.background = '#ffcccc';
            btn.style.border = '1px solid red';

            btn.onclick = () => {
                
                try {
                    document.querySelectorAll(rule.selector).forEach(el => el.style[rule.property] = '');
                } catch(e) {} 

                
                currentRules.splice(idx, 1);
                localStorage.setItem(lsKey, JSON.stringify(currentRules));
                renderButtons(); 
            };
            buttonsContainerBlock.appendChild(btn);
        });
    };
    renderButtons();


    const openFormHandler = () => {
        console.log("Double click detected!"); 

        if (document.getElementById('css-form-wrapper')) return;

        const formDiv = document.createElement('div');
        formDiv.id = 'css-form-wrapper';
        formDiv.style.border = "3px solid orange";
        formDiv.style.padding = "15px";
        formDiv.style.marginTop = "15px";
        formDiv.style.background = "#fff";
        formDiv.style.position = "relative";
        formDiv.style.zIndex = "1000"; 

        formDiv.innerHTML = `
            <h4 style="margin-top:0; color: orange;">Додати стиль CSS</h4>
            <p style="font-size:12px; margin:0;">Селектор (напр: #block-5 або body)</p>
            <input type="text" id="inpSel" placeholder="#block-5" style="width:95%; margin-bottom:5px; border:1px solid #ccc; padding:5px;">
            <p style="font-size:12px; margin:0;">Властивість (напр: background)</p>
            <input type="text" id="inpProp" placeholder="background" style="width:95%; margin-bottom:5px; border:1px solid #ccc; padding:5px;">
            <p style="font-size:12px; margin:0;">Значення (напр: gold)</p>
            <input type="text" id="inpVal" placeholder="gold" style="width:95%; margin-bottom:10px; border:1px solid #ccc; padding:5px;">
            
            <button id="btnSaveCss" style="cursor:pointer; background:orange; border:none; color:white; padding:8px 15px; font-weight:bold;">Застосувати</button>
            <button onclick="this.parentElement.remove()" style="cursor:pointer; margin-left:10px;">Закрити</button>
        `;
        
        if(formContainerBlock) {
            formContainerBlock.appendChild(formDiv);
            
            formDiv.scrollIntoView({behavior: "smooth"});
        }

       
        document.getElementById('btnSaveCss').addEventListener('click', () => {
            const sel = document.getElementById('inpSel').value.trim();
            const prop = document.getElementById('inpProp').value.trim();
            const val = document.getElementById('inpVal').value.trim();

            if (sel && prop && val) {
               
                try {
                    const test = document.querySelectorAll(sel);
                    if(test.length === 0) {
                        alert(`Увага: Елемент "${sel}" не знайдено.\nПеревірте # для ID або . для класів.`);
                        return; 
                    }
                } catch (err) {
                    alert(`Помилка в синтаксисі селектора: "${sel}"`);
                    return;
                }

                
                safeApply(sel, prop, val);

                const currentRules = JSON.parse(localStorage.getItem(lsKey)) || [];
                currentRules.push({ selector: sel, property: prop, value: val });
                localStorage.setItem(lsKey, JSON.stringify(currentRules));

                renderButtons();
                formDiv.remove();
            } else {
                alert("Заповніть всі поля!");
            }
        });
    };

 
    if (blockX) {
        blockX.style.cursor = "pointer"; 
        blockX.addEventListener('dblclick', openFormHandler);
    }
    if (blockY) {
        blockY.style.cursor = "pointer";
        blockY.addEventListener('dblclick', openFormHandler);
    }
}

setupDynamicCSS();