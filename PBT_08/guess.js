function playGame() {
    const answer = Math.floor(Math.random() * 100) + 1;
    const guessed = [];
    let count = 0;

    while (count < 7) {
        const input = prompt("Nhập số bạn đoán từ 1 đến 100:");
        if (input === null) {
            alert("Bạn đã thoát game");
            return;
        }

        const number = Number(input);
        if (!Number.isInteger(number) || number < 1 || number > 100) {
            alert("Vui lòng nhập số nguyên từ 1 đến 100");
            continue;
        }

        if (guessed.includes(number)) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        guessed.push(number);
        count++;

        if (number === answer) {
            alert("Đúng rồi! Bạn đoán đúng sau " + count + " lần!");
            return;
        }

        if (number < answer) {
            alert("Cao hơn");
        } else {
            alert("Thấp hơn");
        }
    }

    alert("Bạn đã thua. Đáp án là " + answer);
}
