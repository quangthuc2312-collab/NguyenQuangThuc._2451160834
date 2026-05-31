function startGame() {
    const secret = Math.floor(Math.random() * 100) + 1;
    const guessed = [];
    let count = 0;
    let win = false;

    while (count < 7) {
        let input = prompt("Nhập số từ 1 đến 100:");

        if (input === null) {
            alert("Bạn đã thoát game");
            document.getElementById("result").textContent = "Bạn đã thoát game";
            return;
        }

        let number = Number(input);

        if (!Number.isInteger(number) || number < 1 || number > 100) {
            alert("Vui lòng nhập số nguyên từ 1 đến 100");
            continue;
        }

        let repeated = false;
        for (let i = 0; i < guessed.length; i++) {
            if (guessed[i] === number) {
                repeated = true;
            }
        }

        if (repeated) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        guessed.push(number);
        count++;

        if (number < secret) {
            alert("Cao hơn");
        } else if (number > secret) {
            alert("Thấp hơn");
        } else {
            alert("Đúng rồi! Bạn đoán đúng sau " + count + " lần!");
            document.getElementById("result").textContent = "Bạn đoán đúng sau " + count + " lần!";
            win = true;
            break;
        }
    }

    if (!win) {
        alert("Hết lượt! Đáp án là " + secret);
        document.getElementById("result").textContent = "Hết lượt! Đáp án là " + secret;
    }
}
