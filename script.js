import {keys} from "./keys.js";

const textArea = document.createElement('textarea');
textArea.classList.add('text-area');
textArea.placeholder = 'Type here...';
document.body.appendChild(textArea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

let isCapsLock = false;
let isShift = false;

addKeys("lowerCase");

function addKeys(cases){
    keyboard.innerHTML = "";
    
    keys.en[cases].forEach(row => {
        const rowKey = document.createElement('div');
        rowKey.classList.add('keyboard__row')
        row.forEach(key => {
            const button = document.createElement('button');
            button.textContent = key;
            button.classList.add('keyboard__btn');
            if(key == 'Space'){
                button.classList.add('keyboard__btn-space');
            }else if(key == 'Shift'){
                button.classList.add('keyboard__btn-shift');
            }
            rowKey.appendChild(button);
        })
        keyboard.appendChild(rowKey);
    })
    addFunk();
}

function addFunk(){
    const buttons = document.querySelectorAll('.keyboard__btn');
    buttons.forEach(btn => {   
        if(btn.textContent == 'Shift'){
            btn.addEventListener('mousedown', () => {
                if(isCapsLock == false){
                    addKeys("upperCase");
                }else{
                    addKeys("lowerCase");
                }
            });
        }
        if(btn.textContent == 'Shift'){
            btn.addEventListener('mouseup', () => {
                if(isCapsLock == false){
                    addKeys("lowerCase");
                }else{
                    addKeys("capsLock");
                }
            });
        }

        btn.addEventListener('mousedown', () => {
            btn.classList.add('keyboard__btn_active');
            const cursor = textArea.selectionEnd;
            switch(btn.textContent){
                case 'Tab': 
                    textArea.value = textArea.value.slice(0, cursor) + '    ' + textArea.value.slice(cursor);
                    textArea.focus();
                    textArea.selectionEnd = cursor + 4;
                    break;
                case 'CapsLock':
                    isCapsLock = !isCapsLock;
                    if(isCapsLock == false){
                        addKeys("lowerCase");
                    }else{
                        addKeys("capsLock");
                    }
                    break;
                case 'Shift': break;
                case 'Space': addText(cursor, ' ');
                    break;
                case 'Backspace': textArea.value = textArea.value.slice(0, cursor - 1) + textArea.value.slice(cursor);
                    textArea.focus();
                    textArea.selectionEnd = cursor - 1;
                    break;
                case 'Delete': 
                    if(cursor < textArea.value.length){  
                        textArea.value = textArea.value.slice(0, cursor) + textArea.value.slice(cursor + 1);
                        textArea.focus();
                        textArea.selectionEnd = cursor;
                    }
                    break;
                case 'Enter': addText(cursor, '\n');
                    break;
                case 'Ctrl': break;
                case 'Win': break;
                case 'Alt': break;
                default:     
                addText(cursor, btn.textContent);
                    break;
            }   
        }) 

        btn.addEventListener('mouseup', () => {
            btn.classList.remove('keyboard__btn_active');
        });
    });
}

document.addEventListener('keydown', event => {
    const { key } = event;
    const buttons = document.querySelectorAll('.keyboard__btn');
    const cursor = textArea.selectionEnd;
    event.preventDefault();

    buttons.forEach(btn => {
        if(btn.textContent == key){
            btn.classList.add('keyboard__btn_active');
        }
    })

    switch(key){
        case 'Tab':
            textArea.value = textArea.value.slice(0, cursor) + '    ' + textArea.value.slice(cursor);
            textArea.focus();
            textArea.selectionEnd = cursor + 4;
            break;
        case 'CapsLock':
            isCapsLock = !isCapsLock;
            if(isCapsLock == false){
                addKeys("lowerCase");
            }else{
                addKeys("capsLock");
            }
            break;
        case 'Shift': 
            isShift = true;
            if(isCapsLock == false){
                addKeys("upperCase");
            }else{
                addKeys("lowerCase");
            }
            break;
        case 'Space': addText(cursor, ' ');
            break;
        case 'Backspace': textArea.value = textArea.value.slice(0, cursor - 1) + textArea.value.slice(cursor);
            textArea.focus();
            textArea.selectionEnd = cursor - 1;
            break;
        case 'Delete': 
            if(cursor < textArea.value.length){  
                textArea.value = textArea.value.slice(0, cursor) + textArea.value.slice(cursor + 1);
                textArea.focus();
                textArea.selectionEnd = cursor;
            }
            break;
        case 'Enter': addText(cursor, '\n');
            break;
        case 'Control': break;
        case 'Meta': break;
        case 'alt': break;
        case 'ALT': break;
        case 'ArrowUp': addText(cursor, '▲');
            break;
        case 'ArrowLeft': addText(cursor, '◄');
            break;
        case 'ArrowDown': addText(cursor, '▼');
            break;
        case 'ArrowRight': addText(cursor, '►');
            break;
        default:
            let value;
            if((isCapsLock == false && isShift == false) || (isCapsLock == true && isShift == true)){
                value = key.toLowerCase();
            }else if((isCapsLock == true && isShift == false) || (isCapsLock == false && isShift == true)){
                value = key.toUpperCase();
            }

            addText(cursor, value);
            break;
    }  
});

document.addEventListener('keyup', event => {
    const { key } = event;
    const button = document.querySelector('.keyboard__btn_active');
    
    switch(key){
        case 'CapsLock': break;
        case 'Shift':
            isShift = false;
            if(isCapsLock == false){
                addKeys("lowerCase");
            }else{
                addKeys("capsLock");
            }
            break;
        default: button.classList.remove('keyboard__btn_active');
            break;
    }
});

function addText(cursor, value){
    textArea.value = textArea.value.slice(0, cursor) + value + textArea.value.slice(cursor);
    textArea.focus();
    textArea.selectionEnd = cursor + 1;
}

