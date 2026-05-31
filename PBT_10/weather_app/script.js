const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const message = document.querySelector("#message");
const weatherBox = document.querySelector("#weatherBox");
const historyList = document.querySelector("#historyList");

function getHistory() {
    return JSON.parse(localStorage.getItem("weatherHistory")) || [];
}

function saveHistory(city) {
    const oldHistory = getHistory().filter(item => item.toLowerCase() !== city.toLowerCase());
    const newHistory = [city, ...oldHistory].slice(0, 5);
    localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
    renderHistory();
}

function renderHistory() {
    const history = getHistory();
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<p>Chưa có lịch sử.</p>";
        return;
    }

    history.forEach(city => {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.addEventListener("click", () => {
            cityInput.value = city;
            loadWeather(city);
        });
        historyList.appendChild(btn);
    });
}

function showLoading() {
    weatherBox.classList.add("hidden");
    message.innerHTML = `<div class="loading"><span class="spinner"></span>Đang tải...</div>`;
}

function showError(text) {
    weatherBox.classList.add("hidden");
    message.innerHTML = `<div class="error">${text}</div>`;
}

function showWeather(city, current) {
    message.innerHTML = `<div class="success">Lấy dữ liệu thành công</div>`;
    weatherBox.classList.remove("hidden");
    weatherBox.innerHTML = `
        <div class="weather-card">
            <img src="${current.weatherIconUrl[0].value}" alt="weather icon">
            <div>
                <h2>${city}</h2>
                <p>Nhiệt độ: ${current.temp_C}°C</p>
                <p>Độ ẩm: ${current.humidity}%</p>
                <p>Mô tả: ${current.weatherDesc[0].value}</p>
            </div>
        </div>
    `;
}

async function loadWeather(city) {
    const cleanCity = city.trim();

    if (!cleanCity) {
        showError("Vui lòng nhập tên thành phố.");
        return;
    }

    showLoading();

    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(cleanCity)}?format=j1`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const current = data.current_condition && data.current_condition[0];

        if (!current) {
            throw new Error("Không tìm thấy dữ liệu thời tiết.");
        }

        showWeather(cleanCity, current);
        saveHistory(cleanCity);
    } catch (error) {
        showError("Không lấy được thời tiết. Kiểm tra tên thành phố hoặc kết nối mạng.");
    }
}

searchBtn.addEventListener("click", () => loadWeather(cityInput.value));

cityInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        loadWeather(cityInput.value);
    }
});

renderHistory();
