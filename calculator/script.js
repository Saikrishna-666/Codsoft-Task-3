// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let displayValue = '';
    let expression = '';
    let operator = null;
    let resultDisplayed = false;

    function updateDisplay(value) {
        display.textContent = value || '0';
    }

    function handleNumber(number) {
        if (resultDisplayed) {
            displayValue = number;
            expression = number;
            resultDisplayed = false;
        } else {
            displayValue += number;
            expression += number;
        }
        updateDisplay(displayValue);
    }

    function handleOperator(nextOperator) {
        if (resultDisplayed) {
            expression = displayValue + nextOperator;
            resultDisplayed = false;
        } else {
            expression += nextOperator;
        }
        displayValue += nextOperator;
        operator = nextOperator;
        updateDisplay(displayValue);
    }

    function handleClear() {
        displayValue = '';
        expression = '';
        operator = null;
        resultDisplayed = false;
        updateDisplay(displayValue);
    }

    function handleDelete() {
        displayValue = displayValue.slice(0, -1);
        expression = expression.slice(0, -1);
        updateDisplay(displayValue);
    }

    function handleCalculate() {
        try {
            const result = eval(expression);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            updateDisplay(displayValue);
            expression = displayValue;
            resultDisplayed = true;
        } catch (error) {
            displayValue = 'Error';
            updateDisplay(displayValue);
            expression = '';
            resultDisplayed = false;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { action, value } = button.dataset;

            switch (action) {
                case 'number':
                    handleNumber(value);
                    break;
                case 'operator':
                    handleOperator(value);
                    break;
                case 'clear':
                    handleClear();
                    break;
                case 'delete':
                    handleDelete();
                    break;
                case 'calculate':
                    handleCalculate();
                    break;
            }
        });
    });
});
