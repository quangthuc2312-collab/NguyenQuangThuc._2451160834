const form = document.querySelector("#registerForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirm");
const phoneInput = document.querySelector("#phone");
const submitBtn = document.querySelector("#submitBtn");
const strengthBar = document.querySelector("#strengthBar");
const modal = document.querySelector("#modal");
const result = document.querySelector("#result");
const closeModal = document.querySelector("#closeModal");

const state = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

function setMessage(input, msgId, ok, message) {
    const msg = document.querySelector(msgId);
    input.classList.remove("valid", "invalid");
    input.classList.add(ok ? "valid" : "invalid");
    msg.textContent = (ok ? "✅ " : "❌ ") + message;
    msg.className = ok ? "msg good" : "msg bad";
}

function updateSubmit() {
    submitBtn.disabled = !Object.values(state).every(Boolean);
}

function validateName() {
    const value = nameInput.value.trim();
    state.name = value.length >= 2 && value.length <= 50;
    setMessage(nameInput, "#nameMsg", state.name, state.name ? "Tên hợp lệ" : "Tên phải từ 2 đến 50 ký tự");
    updateSubmit();
}

function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    state.email = regex.test(value);
    setMessage(emailInput, "#emailMsg", state.email, state.email ? "Email hợp lệ" : "Email chưa đúng định dạng");
    updateSubmit();
}

function getPasswordLevel(value) {
    const medium = value.length >= 8 && /[a-zA-Z]/.test(value) && /\d/.test(value);
    const strong = value.length >= 8 && /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value) && /[^a-zA-Z0-9]/.test(value);
    if (strong) return "strong";
    if (medium) return "medium";
    if (value.length > 0) return "weak";
    return "";
}

function validatePassword() {
    const value = passwordInput.value;
    const level = getPasswordLevel(value);
    strengthBar.className = level;
    state.password = level === "medium" || level === "strong";
    let text = "Mật khẩu yếu";
    if (level === "medium") text = "Mật khẩu trung bình";
    if (level === "strong") text = "Mật khẩu mạnh";
    setMessage(passwordInput, "#passwordMsg", state.password, text);
    validateConfirm();
    updateSubmit();
}

function validateConfirm() {
    state.confirm = confirmInput.value.length > 0 && confirmInput.value === passwordInput.value;
    setMessage(confirmInput, "#confirmMsg", state.confirm, state.confirm ? "Mật khẩu khớp" : "Mật khẩu chưa khớp");
    updateSubmit();
}

function formatPhone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length > 7) return digits.slice(0, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7);
    if (digits.length > 4) return digits.slice(0, 4) + "-" + digits.slice(4);
    return digits;
}

function validatePhone() {
    phoneInput.value = formatPhone(phoneInput.value);
    const digits = phoneInput.value.replace(/\D/g, "");
    state.phone = /^\d{10}$/.test(digits);
    setMessage(phoneInput, "#phoneMsg", state.phone, state.phone ? "Số điện thoại hợp lệ" : "Số điện thoại phải có 10 chữ số");
    updateSubmit();
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmInput.addEventListener("input", validateConfirm);
phoneInput.addEventListener("input", validatePhone);

form.addEventListener("submit", event => {
    event.preventDefault();
    if (submitBtn.disabled) return;
    result.textContent = "Tên: " + nameInput.value + " | Email: " + emailInput.value + " | SĐT: " + phoneInput.value;
    modal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});
