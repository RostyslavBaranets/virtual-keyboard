import {keys} from "./keys.js";

const textArea = document.createElement('textarea');
textArea.placeholder = 'Type here...';
document.body.appendChild(textArea);

const keyboard = document.createElement('div');
document.body.appendChild(keyboard);

let isCapsLock = false;
let isShift = false;

addKeys("lowerCase");

function addKeys(cases){
    keyboard.innerHTML = "";
    
    keys.en[cases].forEach(row => {
        const rowKey = document.createElement('div');
        row.forEach(key => {
            const button = document.createElement('button');
            button.classList.add('keyboard__btn')
            button.textContent = key;
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

        btn.addEventListener('click', () => {
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
    })
}

document.addEventListener('keydown', event => {
    const { key } = event;
    const cursor = textArea.selectionEnd;
    event.preventDefault();
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
        default:
            break;
    }
});

function addText(cursor, value){
    textArea.value = textArea.value.slice(0, cursor) + value + textArea.value.slice(cursor);
    textArea.focus();
    textArea.selectionEnd = cursor + 1;
}

