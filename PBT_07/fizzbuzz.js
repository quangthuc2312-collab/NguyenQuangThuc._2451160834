function classicFizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log(i + " = FizzBuzz");
        } else if (i % 3 === 0) {
            console.log(i + " = Fizz");
        } else if (i % 5 === 0) {
            console.log(i + " = Buzz");
        } else {
            console.log(i);
        }
    }
}

function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let text = "";
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                text += rules[j].word;
            }
        }

        if (text === "") {
            console.log(i);
        } else {
            console.log(i + " = " + text);
        }
    }
}

console.log("Version 1");
classicFizzBuzz();
console.log("Version 2");
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);
