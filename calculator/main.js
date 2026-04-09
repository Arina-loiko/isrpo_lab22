const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const clearBtn = document.querySelector('button');

let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            expression = '';
            display.value = '';
            return;
        }

        if (value === '=') {
            try {
                expression = String(eval(expression));
                display.value = expression;
            } catch {
                display.value = 'Ошибка';
                expression = '';
            }
            return;
        }

        expression += value;
        display.value = expression;
    });
});
