class Calculater {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand == "") return;
    if (this.currentOperand !== "" && this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }

  dollarToShekell() {
    let current = parseFloat(this.currentOperand);
    let converter = current * 4;
    //console.log(converter);
    this.currentOperandTextElement.innerText = converter;
    this.currentOperand = "";
    return;
  }
  shekellToDollar() {
    let current = parseFloat(this.currentOperand);
    let converter = current / 4;
    // console.log(converter);
    this.currentOperandTextElement.innerText = converter;
    this.currentOperand = "";
    return;
  }
  euroToShekell() {
    let current = parseFloat(this.currentOperand);
    let converter = current * 5;
    //console.log(converter);
    this.currentOperandTextElement.innerText = converter;
    this.currentOperand = "";
    return;
  }
  shekellToEuro() {
    let current = parseFloat(this.currentOperand);
    let converter = current / 5;
    // console.log(converter);
    this.currentOperandTextElement.innerText = converter;
    this.currentOperand = "";
    return;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const convert = document.querySelectorAll("[converter]");

const calculater = new Calculater(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      calculater.previousOperand === "" &&
      calculater.currentOperand !== "" &&
      calculater.readyToReset
    ) {
      calculater.currentOperand = "";
      calculater.readyToReset = false;
    }
    calculater.appendNumber(button.innerText);
    calculater.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculater.chooseOperation(button.innerText);
    calculater.updateDisplay();
  });
});
equalsButton.addEventListener("click", (button) => {
  calculater.compute();
  calculater.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculater.clear();
  calculater.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculater.delete();
  calculater.updateDisplay();
});

convert.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "₪2$":
        calculater.shekellToDollar();
        break;

      case "$2₪":
        calculater.dollarToShekell();
        break;

      case "₪2€":
        calculater.shekellToEuro();
        break;

      case "€2₪":
        calculater.euroToShekell();
        break;
    }
  });
});
