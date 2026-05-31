const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const countText = document.querySelector("#count");
const filterButtons = document.querySelectorAll(".filter");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";
let clickTimer = null;

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCount() {
    const left = todos.filter(todo => !todo.completed).length;
    countText.textContent = left + " items left";
}

function getFilteredTodos() {
    if (currentFilter === "active") return todos.filter(todo => !todo.completed);
    if (currentFilter === "completed") return todos.filter(todo => todo.completed);
    return todos;
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");
    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const button = document.createElement("button");
    button.className = "delete-btn";
    button.textContent = "❌";

    li.appendChild(span);
    li.appendChild(button);
    return li;
}

function renderTodos() {
    list.textContent = "";
    getFilteredTodos().forEach(todo => {
        list.appendChild(createTodoElement(todo));
    });
    updateCount();
    saveTodos();
}

form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    todos.push({ id: Date.now(), text, completed: false });
    input.value = "";
    renderTodos();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        renderTodos();
    });
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

list.addEventListener("click", event => {
    const li = event.target.closest(".todo-item");
    if (!li) return;
    const id = Number(li.dataset.id);

    if (event.target.classList.contains("delete-btn")) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
        return;
    }

    if (event.target.classList.contains("todo-text")) {
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            const todo = todos.find(item => item.id === id);
            todo.completed = !todo.completed;
            renderTodos();
        }, 180);
    }
});

list.addEventListener("dblclick", event => {
    if (!event.target.classList.contains("todo-text")) return;
    clearTimeout(clickTimer);
    const span = event.target;
    const li = span.closest(".todo-item");
    const editInput = document.createElement("input");
    editInput.className = "edit-input";
    editInput.value = span.textContent;
    li.replaceChild(editInput, span);
    editInput.focus();
});

list.addEventListener("keydown", event => {
    if (!event.target.classList.contains("edit-input")) return;
    if (event.key !== "Enter") return;
    const li = event.target.closest(".todo-item");
    const id = Number(li.dataset.id);
    const todo = todos.find(item => item.id === id);
    const newText = event.target.value.trim();
    if (newText) todo.text = newText;
    renderTodos();
});

renderTodos();
