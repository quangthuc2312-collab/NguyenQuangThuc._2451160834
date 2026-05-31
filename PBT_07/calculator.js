function calculate(num1, operator, num2) {
    if (typeof num1 !== "number" || typeof num2 !== "number" || Number.isNaN(num1) || Number.isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    if ((operator === "/" || operator === "%") && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    if (operator === "+") {
        return num1 + num2;
    } else if (operator === "-") {
        return num1 - num2;
    } else if (operator === "*") {
        return num1 * num2;
    } else if (operator === "/") {
        return num1 / num2;
    } else if (operator === "%") {
        return num1 % num2;
    } else if (operator === "**") {
        return num1 ** num2;
    } else {
        return "Lỗi: Operator '" + operator + "' không hợp lệ";
    }
}

console.log(calculate(10, "+", 5));
console.log(calculate(10, "/", 0));
console.log(calculate(10, "^", 5));
console.log(calculate("abc", "+", 5));
console.log(calculate(2, "**", 10));
