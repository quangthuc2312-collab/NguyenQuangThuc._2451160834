function money(n) {
    return Math.round(n).toLocaleString("vi-VN") + "đ";
}

function printBill(items, day, hasTip) {
    let total = 0;

    console.log("╔════════════════════════════════════════════╗");
    console.log("║              HÓA ĐƠN NHÀ HÀNG            ║");
    console.log("╠════════════════════════════════════════════╣");

    for (let i = 0; i < items.length; i++) {
        let itemTotal = items[i].price * items[i].quantity;
        total += itemTotal;
        let line = (i + 1) + ". " + items[i].name + " x" + items[i].quantity + " @" + money(items[i].price) + " = " + money(itemTotal);
        console.log(line);
    }

    let discountRate = 0;
    if (total > 1000000) {
        discountRate = 15;
    } else if (total > 500000) {
        discountRate = 10;
    }

    if (day === "Wednesday") {
        discountRate += 5;
    }

    let discount = total * discountRate / 100;
    let afterDiscount = total - discount;
    let vat = afterDiscount * 0.08;
    let tip = 0;

    if (hasTip) {
        tip = afterDiscount * 0.05;
    }

    let pay = afterDiscount + vat + tip;

    console.log("╠════════════════════════════════════════════╣");
    console.log("Tổng cộng: " + money(total));
    console.log("Giảm giá (" + discountRate + "%): " + money(discount));
    console.log("VAT (8%): " + money(vat));
    console.log("Tip (5%): " + money(tip));
    console.log("╠════════════════════════════════════════════╣");
    console.log("THANH TOÁN: " + money(pay));
    console.log("╚════════════════════════════════════════════╝");
}

const items = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 },
    { name: "Lẩu gà", price: 450000, quantity: 2 }
];

printBill(items, "Wednesday", true);
