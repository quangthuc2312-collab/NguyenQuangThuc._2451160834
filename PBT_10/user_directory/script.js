const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async updateUser(id, data) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    },

    async deleteUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return true;
    }
};

const userList = document.querySelector("#userList");
const loading = document.querySelector("#loading");
const toast = document.querySelector("#toast");
const userForm = document.querySelector("#userForm");
const searchInput = document.querySelector("#searchInput");
const formTitle = document.querySelector("#formTitle");
const cancelBtn = document.querySelector("#cancelBtn");
const userIdInput = document.querySelector("#userId");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

let users = [];

const ui = {
    renderUsers(list) {
        userList.innerHTML = "";

        if (list.length === 0) {
            userList.innerHTML = `<div class="card">Không có user phù hợp.</div>`;
            return;
        }

        list.forEach(user => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone || "Chưa có"}</p>
                <div class="actions">
                    <button class="green" data-edit="${user.id}">Edit</button>
                    <button class="red" data-delete="${user.id}">Delete</button>
                </div>
            `;
            userList.appendChild(card);
        });
    },

    showLoading() {
        loading.classList.remove("hidden");
        userList.classList.add("hidden");
        loading.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            const item = document.createElement("div");
            item.className = "skeleton";
            loading.appendChild(item);
        }
    },

    hideLoading() {
        loading.classList.add("hidden");
        userList.classList.remove("hidden");
    },

    showError(message) {
        toast.innerHTML = `<div class="toast error">${message}</div>`;
    },

    showSuccess(message) {
        toast.innerHTML = `<div class="toast">${message}</div>`;
    }
};

function applySearch() {
    const keyword = searchInput.value.toLowerCase();
    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );
    ui.renderUsers(filtered);
}

function resetForm() {
    userForm.reset();
    userIdInput.value = "";
    formTitle.textContent = "Thêm user";
    cancelBtn.classList.add("hidden");
}

async function loadUsers() {
    ui.showLoading();

    try {
        users = await api.getUsers();
        ui.hideLoading();
        ui.renderUsers(users);
        ui.showSuccess("Load users thành công.");
    } catch (error) {
        ui.hideLoading();
        ui.showError("Không tải được danh sách users.");
    }
}

userForm.addEventListener("submit", async event => {
    event.preventDefault();

    const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    const id = userIdInput.value;

    try {
        if (id) {
            const updated = await api.updateUser(id, data);
            users = users.map(user => user.id == id ? { ...user, ...updated, id: Number(id) } : user);
            ui.showSuccess("Cập nhật user thành công.");
        } else {
            const created = await api.createUser(data);
            users.unshift({ ...data, id: created.id || Date.now() });
            ui.showSuccess("Thêm user thành công.");
        }

        resetForm();
        applySearch();
    } catch (error) {
        ui.showError("Thao tác thất bại.");
    }
});

userList.addEventListener("click", async event => {
    const editId = event.target.dataset.edit;
    const deleteId = event.target.dataset.delete;

    if (editId) {
        const user = users.find(item => item.id == editId);
        if (!user) return;
        userIdInput.value = user.id;
        nameInput.value = user.name;
        emailInput.value = user.email;
        phoneInput.value = user.phone || "";
        formTitle.textContent = "Sửa user";
        cancelBtn.classList.remove("hidden");
    }

    if (deleteId) {
        const ok = confirm("Bạn có chắc muốn xóa user này?");
        if (!ok) return;

        try {
            await api.deleteUser(deleteId);
            users = users.filter(user => user.id != deleteId);
            applySearch();
            ui.showSuccess("Xóa user thành công.");
        } catch (error) {
            ui.showError("Xóa user thất bại.");
        }
    }
});

searchInput.addEventListener("input", applySearch);
cancelBtn.addEventListener("click", resetForm);
loadUsers();
