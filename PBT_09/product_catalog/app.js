const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung S25", price: 22990000, category: "phone", image: "https://placehold.co/200?text=Samsung+S25", rating: 4.6, inStock: true },
    { id: 3, name: "Xiaomi Redmi", price: 5990000, category: "phone", image: "https://placehold.co/200?text=Xiaomi", rating: 4.2, inStock: true },
    { id: 4, name: "MacBook Air", price: 27990000, category: "laptop", image: "https://placehold.co/200?text=MacBook", rating: 4.9, inStock: true },
    { id: 5, name: "Dell Inspiron", price: 15990000, category: "laptop", image: "https://placehold.co/200?text=Dell", rating: 4.3, inStock: true },
    { id: 6, name: "Asus Vivobook", price: 13990000, category: "laptop", image: "https://placehold.co/200?text=Asus", rating: 4.1, inStock: false },
    { id: 7, name: "AirPods Pro", price: 5490000, category: "audio", image: "https://placehold.co/200?text=AirPods", rating: 4.7, inStock: true },
    { id: 8, name: "Sony WH-1000", price: 6990000, category: "audio", image: "https://placehold.co/200?text=Sony", rating: 4.8, inStock: true },
    { id: 9, name: "JBL Go", price: 890000, category: "audio", image: "https://placehold.co/200?text=JBL", rating: 4.0, inStock: true },
    { id: 10, name: "Apple Watch", price: 9990000, category: "watch", image: "https://placehold.co/200?text=Watch", rating: 4.5, inStock: true },
    { id: 11, name: "Galaxy Watch", price: 6990000, category: "watch", image: "https://placehold.co/200?text=Galaxy+Watch", rating: 4.4, inStock: false },
    { id: 12, name: "Amazfit GTR", price: 3290000, category: "watch", image: "https://placehold.co/200?text=Amazfit", rating: 4.1, inStock: true }
];

const app = document.createElement("main");
app.className = "app";
document.body.appendChild(app);

const topBar = document.createElement("div");
topBar.className = "top";

const title = document.createElement("h1");
title.textContent = "Product Catalog";

const cart = document.createElement("div");
cart.className = "cart";
cart.textContent = "Giỏ hàng: 0";

topBar.append(title, cart);
app.appendChild(topBar);

const controls = document.createElement("section");
controls.className = "controls";

const searchInput = document.createElement("input");
searchInput.placeholder = "Tìm sản phẩm...";

const categoryBox = document.createElement("div");
categoryBox.className = "category-buttons";

const sortSelect = document.createElement("select");
[
    ["default", "Sắp xếp mặc định"],
    ["price-asc", "Giá tăng"],
    ["price-desc", "Giá giảm"],
    ["name", "Tên A-Z"],
    ["rating", "Đánh giá cao nhất"]
].forEach(item => {
    const option = document.createElement("option");
    option.value = item[0];
    option.textContent = item[1];
    sortSelect.appendChild(option);
});

const darkBtn = document.createElement("button");
darkBtn.id = "darkBtn";
darkBtn.textContent = "Dark mode";

controls.append(searchInput, categoryBox, sortSelect, darkBtn);
app.appendChild(controls);

const productGrid = document.createElement("section");
productGrid.className = "grid";
app.appendChild(productGrid);

const modal = document.createElement("div");
modal.className = "modal";
document.body.appendChild(modal);

let keyword = "";
let category = "all";
let sortType = "default";
let cartCount = 0;

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function renderCategories() {
    const categories = ["all", ...new Set(products.map(product => product.category))];
    categoryBox.textContent = "";
    categories.forEach(item => {
        const button = document.createElement("button");
        button.textContent = item;
        button.dataset.category = item;
        if (item === category) button.classList.add("active");
        categoryBox.appendChild(button);
    });
}

function searchProducts(list) {
    return list.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
}

function filterByCategory(list) {
    if (category === "all") return list;
    return list.filter(product => product.category === category);
}

function sortProducts(list) {
    const result = [...list];
    if (sortType === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortType === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortType === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
}

function createCard(product) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = product.id;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const info = document.createElement("p");
    info.textContent = "Loại: " + product.category + " | ⭐ " + product.rating;

    const stock = document.createElement("p");
    stock.className = "stock";
    stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";

    const button = document.createElement("button");
    button.className = "buy";
    button.textContent = "Thêm giỏ";
    button.disabled = !product.inStock;

    card.append(img, name, price, info, stock, button);
    return card;
}

function renderProducts() {
    productGrid.textContent = "";
    const result = sortProducts(filterByCategory(searchProducts(products)));
    result.forEach(product => productGrid.appendChild(createCard(product)));
}

function openModal(product) {
    modal.textContent = "";
    const box = document.createElement("div");
    box.className = "modal-box";

    const close = document.createElement("button");
    close.className = "close";
    close.textContent = "Đóng";

    const name = document.createElement("h2");
    name.textContent = product.name;

    const detail = document.createElement("p");
    detail.textContent = "Giá: " + formatPrice(product.price) + " | Danh mục: " + product.category + " | Rating: " + product.rating;

    const stock = document.createElement("p");
    stock.textContent = product.inStock ? "Sản phẩm đang còn hàng." : "Sản phẩm đã hết hàng.";

    box.append(close, name, detail, stock);
    modal.appendChild(box);
    modal.classList.add("show");
}

searchInput.addEventListener("input", () => {
    keyword = searchInput.value;
    renderProducts();
});

sortSelect.addEventListener("change", () => {
    sortType = sortSelect.value;
    renderProducts();
});

categoryBox.addEventListener("click", event => {
    if (event.target.tagName !== "BUTTON") return;
    category = event.target.dataset.category;
    renderCategories();
    renderProducts();
});

productGrid.addEventListener("click", event => {
    const card = event.target.closest(".card");
    if (!card) return;
    const product = products.find(item => item.id === Number(card.dataset.id));
    if (event.target.classList.contains("buy")) {
        event.stopPropagation();
        if (product.inStock) {
            cartCount++;
            cart.textContent = "Giỏ hàng: " + cartCount;
        }
        return;
    }
    openModal(product);
});

modal.addEventListener("click", event => {
    if (event.target === modal || event.target.classList.contains("close")) {
        modal.classList.remove("show");
    }
});

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

renderCategories();
renderProducts();
