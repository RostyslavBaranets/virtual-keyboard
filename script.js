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
    btn.addEventListener('click', () => {
        const cursor = textArea.selectionEnd;
        switch(btn.textContent){
            case 'tab': textArea.value += '    ';
                break;
            case 'caps lock': 
                isCapsLock = !isCapsLock;
                if(isCapsLock == false){
                    addKeys("lowerCase");
                }else{
                    addKeys("upperCase");
                }
                break;
            case 'shift': textArea.value += '';
                break;
            case 'space': textArea.value += ' ';
                break;
            case 'backspace': textArea.value = textArea.value.slice(0, -1);
                break;
            case 'del': 
                if(cursor < textArea.value.length){  
                    textArea.value = textArea.value.slice(0, cursor) + textArea.value.slice(cursor + 1);
                    textArea.focus();
                    textArea.selectionEnd = cursor;
                }
                break;
            case 'enter': textArea.value += '\n';
                break;
            default: 
                textArea.value = textArea.value.slice(0, cursor) + btn.textContent + textArea.value.slice(cursor);
                textArea.focus();
                textArea.selectionEnd = cursor + 1;
                break;
        }   
    })
})
}

