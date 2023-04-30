import {keys} from "./keys.js";

const textArea = document.createElement('textarea');
textArea.placeholder = 'Type here...';
document.body.appendChild(textArea);

const keyboard = document.createElement('div');
document.body.appendChild(keyboard);

let isCapsLock = false;

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
        if(btn.textContent == 'shift'){
            btn.addEventListener('mousedown', () => {
                if(isCapsLock == false){
                    addKeys("upperCase");
                }else{
                    addKeys("lowerCase");
                }
            });
        }
        if(btn.textContent == 'shift'){
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
                case 'tab':
                    textArea.value = textArea.value.slice(0, cursor) + '    ' + textArea.value.slice(cursor);
                    textArea.focus();
                    textArea.selectionEnd = cursor + 4;
                    break;
                case 'caps lock':
                    isCapsLock = !isCapsLock;
                    if(isCapsLock == false){
                        addKeys("lowerCase");
                    }else{
                        addKeys("capsLock");
                    }
                    break;
                case 'shift': break;
                case 'space': addText(cursor, ' ');
                    break;
                case 'backspace': textArea.value = textArea.value.slice(0, cursor - 1) + textArea.value.slice(cursor);
                    textArea.focus();
                    textArea.selectionEnd = cursor - 1;
                    break;
                case 'del': 
                    if(cursor < textArea.value.length){  
                        textArea.value = textArea.value.slice(0, cursor) + textArea.value.slice(cursor + 1);
                        textArea.focus();
                        textArea.selectionEnd = cursor;
                    }
                    break;
                case 'enter': addText(cursor, '\n');
                    break;
                default: addText(cursor, btn.textContent);
                    break;
            }   
        })
    })
}

function addText(cursor, value){
    textArea.value = textArea.value.slice(0, cursor) + value + textArea.value.slice(cursor);
    textArea.focus();
    textArea.selectionEnd = cursor + 1;
}

