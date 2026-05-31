function createCart() {
    let items = [];
    let discount = null;

    function formatMoney(number) {
        return number.toLocaleString("vi-VN") + "đ";
    }

    function subtotal() {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function discountAmount() {
        const total = subtotal();
        if (!discount) return 0;
        if (discount.type === "percent") return total * discount.value;
        if (discount.type === "money") return Math.min(total, discount.value);
        return 0;
    }

    return {
        addItem(product, quantity = 1) {
            const existed = items.find(item => item.id === product.id);
            if (existed) {
                existed.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) item.quantity = newQuantity;
        },
        getTotal() {
            return subtotal() - discountAmount();
        },
        applyDiscount(code) {
            if (code === "SALE10") discount = { code, type: "percent", value: 0.1 };
            else if (code === "SALE20") discount = { code, type: "percent", value: 0.2 };
            else if (code === "FREESHIP") discount = { code, type: "money", value: 30000 };
            else return "Mã giảm giá không hợp lệ";
            return "Đã áp dụng mã " + code;
        },
        printCart() {
            console.log("┌──────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm        │ SL │ Đơn giá        │ Tổng          │");
            console.log("├──────────────────────────────────────────────────────────┤");
            items.forEach((item, index) => {
                const line = "│ " + String(index + 1).padEnd(1) + " │ " + item.name.padEnd(15) + " │ " + String(item.quantity).padStart(2) + " │ " + formatMoney(item.price).padStart(14) + " │ " + formatMoney(item.price * item.quantity).padStart(13) + " │";
                console.log(line);
            });
            console.log("├──────────────────────────────────────────────────────────┤");
            console.log("│ Tạm tính:                         " + formatMoney(subtotal()).padStart(20) + " │");
            if (discount) {
                console.log("│ Giảm giá " + discount.code.padEnd(8) + ":                 -" + formatMoney(discountAmount()).padStart(18) + " │");
            }
            console.log("│ Tổng cộng:                        " + formatMoney(this.getTotal()).padStart(20) + " │");
            console.log("└──────────────────────────────────────────────────────────┘");
        },
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },
        clearCart() {
            items = [];
            discount = null;
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();
console.log(cart.applyDiscount("SALE10"));
cart.printCart();
console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());
cart.updateQuantity(1, 1);
cart.printCart();
