export class Calculator {
    constructor(displayId) {
        this.display = document.getElementById(displayId);
        this.expression = '';
        this.hasError = false;
    }

    init() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleButtonClick(button.textContent);
            });
        });
    }

    handleButtonClick(value) {
        if (this.hasError && value !== 'C') {
            this.clear();
        }

        if (value === 'C') {
            this.clear();
        } else if (value === '=') {
            this.calculate();
        } else {
            this.addToExpression(value);
        }
    }

    addToExpression(value) {
        if (this.isOperator(value)) {
            if (this.expression === '' && value !== '-') return;
            if (this.isLastCharOperator()) return;
        }

        if (value === '.') {
            if (this.hasDuplicateDot()) return;
        }

        this.expression += value;
        this.updateDisplay();
    }

    calculate() {
        if (!this.isValidExpression()) {
            this.showError();
            return;
        }

        if (/\/0(?!\.)/.test(this.expression)) {
            this.showError();
            return;
        }

        try {
            const result = this.safeEvaluate(this.expression);
            this.expression = String(result);
            this.updateDisplay();
        } catch {
            this.showError();
        }
    }

    safeEvaluate(expr) {
        if (!this.isValidExpression()) {
            throw new Error('Invalid expression');
        }
        return eval(expr);
    }

    isValidExpression() {
        if (/[\+\-\*\/]{2,}/.test(this.expression)) return false;
        if (this.isLastCharOperator()) return false;
        return true;
    }

    clear() {
        this.expression = '';
        this.hasError = false;
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.expression || '0';
    }

    showError() {
        this.display.value = 'Ошибка';
        this.expression = '';
        this.hasError = true;
    }

    isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    isLastCharOperator() {
        const last = this.expression[this.expression.length - 1];
        return this.isOperator(last);
    }

    hasDuplicateDot() {
        const parts = this.expression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        return lastPart.includes('.');
    }
}
