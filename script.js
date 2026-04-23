const userInput = document.querySelector("#user-input");
const sendBtn = document.querySelector("#send-btn");
const listContainer = document.querySelector("#list-container");
const newListBtn = document.querySelector("#new-list-btn");
const settingsBtn = document.querySelector("#settings-btn");
const customAlert = document.querySelector("#new-list-alert");
const confirmBtn = document.querySelector("#confirmBtn");
const cancelBtn = document.querySelector("#cancelBtn");
let tasks = [];

// Ensure alert starts hidden
customAlert.style.display = "none";


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderList();
    saveTasks();
};

function renderList() {
    listContainer.innerHTML = "";

    tasks.forEach(task => {
        const item = document.createElement("div");
            item.className = "list-item";

            item.innerHTML = `
            <p class="list-item-text">${task.text}</p>
            <button class="list-item-delete">×</button>
        `;
            listContainer.appendChild(item);

            const deleteBtn = item.querySelector(".list-item-delete");
                deleteBtn.addEventListener("click", () => deleteTask(task.id));
    });
};

function addTask() {
    const text = userInput.value.trim();

    if (text === "") return;
    
    tasks.push({ id: Date.now(), text: text });
    userInput.value = "";
    renderList();
    saveTasks();
};

sendBtn.addEventListener("click", addTask);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        addTask();
    }
});

settingsBtn.addEventListener("click", () => {
    window.location.href = "settings.html";
});

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) tasks = JSON.parse(saved);
    renderList();
};

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

loadTasks();

newListBtn.addEventListener("click", function() {
    customAlert.style.display = "flex";
});

confirmBtn.addEventListener("click", function() {
    tasks = [];
    renderList();
    saveTasks();
    customAlert.style.display = "none";
});

cancelBtn.addEventListener("click", function() {
    customAlert.style.display = "none";
});

function applyTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
};

const savedDark = localStorage.getItem('darkMode');
const isDark = savedDark === null ? true : savedDark === 'true';
applyTheme(isDark);