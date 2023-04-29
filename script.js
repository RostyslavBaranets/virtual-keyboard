import {keys} from "./keys.js";

const textArea = document.createElement('textarea');
textArea.placeholder = 'Type here...';
document.body.appendChild(textArea);

const keyboard = document.createElement('div');
document.body.appendChild(keyboard);

const keyss = keys.en.lowercase;

keyss.forEach(row => {
    const rowKey = document.createElement('div');
    row.forEach(key => {
        const button = document.createElement('button');
        button.classList.add('keyboard__btn')
        button.textContent = key;
        rowKey.appendChild(button);
    })
    keyboard.appendChild(rowKey);
})

const buttons = document.querySelectorAll('.keyboard__btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        textArea.value += btn.textContent;
    })
})