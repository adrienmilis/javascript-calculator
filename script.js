function add(a, b) {
    return (a + b).toFixed(10);
}

function substract(a, b) {
    return (a - b).toString();
}

function multiply(a, b) {
    return (a * b).toString();
}

function divide(a, b) {
    if (b === 0)
        return "no sir"
    return (a / b).toString();
}

function operate(a, b, operator) {
    dic = {
        '-': substract,
        '+': add,
        'x': multiply,
        '/': divide,
    }
    if (operator in dic)
        return dic[operator](a, b);
}

function clear() {

    numbers[1] = '';
    numbers[2] = '';
    operator = '';
    display.innerText = '0';
}

function displayInner(value) {
        
    if (value.includes('.') && value.length > 9) {
        value = value.slice(0, 8);
    }
    else if (value.length > 9)
        value = value.slice[0,8];
    if (value[value.length - 1] != '.')
        display.innerText = parseFloat(value);
    else
        display.innerText = value;
    return value;
}

function operatorPressed(innerText) {
    if (numbers[1] !== '' && numbers[2] !== '') {
        numbers[1] = operate(
            parseFloat(numbers[1]), parseFloat(numbers[2]), operator
            );
        numbers[1] = displayInner(numbers[1]);
        numbers[2] = '';
    }
    operator = innerText;

}

function percentOperatorPressed() {
    if (numbers[2] === '') {
        numbers[1] = operate(numbers[1], 100, '/');
        numbers[1] = displayInner(numbers[1]);
    }
    else {
        numbers[2] = operate(numbers[2], 100, '/');
        numbers[2] = displayInner(numbers[2]);
    }
}

function plusMinusButtonPressed() {
    if (operator === '') {
        numbers[1] = '-' + numbers[1];
        numbers[1] = displayInner(numbers[1]);
    }
    else if (numbers[2] != '') {
        numbers[2] = '-' + numbers[2];
        numbers[2] = displayInner(numbers[2]);
    }
}

function decimalPointPressed() {
    if (operator === '=')
        numbers[1] = '';
    if (operator  === '' || operator === '=') {
        if (numbers[1].includes('.'))
            return;
            (numbers[1] === '') ? numbers[1] = '0.' : numbers[1] += '.';
            numbers[1] = displayInner(numbers[1]);
        }
    else {
        if (numbers[2].includes('.'))
            return;
        (numbers[2] === '') ? numbers[2] = '0.' : numbers[2] += '.';
        numbers[2] = displayInner(numbers[2]);
    }
}

function numberPressed(whichNumber, innerText) {

    if (operator === '=') {
        whichNumber = 1;
        if (numbers[1] !== '0.')
        numbers[1] = '';
        numbers[2] = '';
    }
    if (numbers[whichNumber] === '0')
        numbers[whichNumber] = innerText;
    else
        numbers[whichNumber] += innerText;
    numbers[whichNumber] = displayInner(numbers[whichNumber]);
}

function calculator(innerText) {
    
    if (innerText === 'AC')
        clear();
    else if (operators.includes(innerText)) {   // operator button
        operatorPressed(innerText);
    }
    else if (operator === '' && !isNaN(parseFloat(innerText))) {    // number button for numbers[1]
        numberPressed(1, innerText);
    }
    else if (!isNaN(parseFloat(innerText))) {   // number button for numbers[2]
        numberPressed(2, innerText);
    }
    else if (innerText === '%') {   // % button
        percentOperatorPressed();
    }
    else if (innerText === '+/−' && (numbers[1] != '')) {  // +/- button
        plusMinusButtonPressed();
    }
    else if (innerText === ',') {   // decimal point button
        decimalPointPressed();
    }
}

let display = document.querySelector('.display');

// Assign each button an event that registers its data
let buttons = document.querySelectorAll('.button');
buttons.forEach( (button) => {
    button.addEventListener('click', () => calculator(button.innerText))
});

let operators = ['/', 'x', '+', '-', '='];
let numbers = {
    1: '',
    2: ''
}
let operator = '';

