function test(name, fn) {
    console.log(name);
    try {
        fn();
    } catch (error) {
        console.log(error.name + ": " + error.message);
    }
    console.log("----------------");
}

test("Đoạn 1", function () {
    console.log(x);
    var x = 5;
});

test("Đoạn 2", function () {
    console.log(y);
    let y = 10;
});

test("Đoạn 3", function () {
    const z = 15;
    z = 20;
    console.log(z);
});

test("Đoạn 4", function () {
    const arr = [1, 2, 3];
    arr.push(4);
    console.log(arr);
});

test("Đoạn 5", function () {
    let a = 1;
    {
        let a = 2;
        console.log("Trong block:", a);
    }
    console.log("Ngoài block:", a);
});
