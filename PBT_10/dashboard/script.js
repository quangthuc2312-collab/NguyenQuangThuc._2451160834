const widgets = [
    document.querySelector("#widgetUsers"),
    document.querySelector("#widgetWeather"),
    document.querySelector("#widgetCountry")
];

const summary = document.querySelector("#summary");
const refreshBtn = document.querySelector("#refreshBtn");

function showWidgetLoading(index, title) {
    widgets[index].className = "widget loading";
    widgets[index].innerHTML = `
        <h2>${title}</h2>
        <p>Đang tải...</p>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
    `;
}

function renderWidget(index, data) {
    widgets[index].className = "widget success";

    if (index === 0) {
        widgets[index].innerHTML = `
            <h2>Users</h2>
            <p>Số user: ${data.length}</p>
            <p>User đầu tiên: ${data[0].name}</p>
            <p>Email: ${data[0].email}</p>
        `;
    }

    if (index === 1) {
        widgets[index].innerHTML = `
            <h2>Weather</h2>
            <p>Thành phố: Hà Nội</p>
            <p>Nhiệt độ: ${data.current_weather.temperature}°C</p>
            <p>Tốc độ gió: ${data.current_weather.windspeed} km/h</p>
        `;
    }

    if (index === 2) {
        const country = data[0];
        widgets[index].innerHTML = `
            <h2>Country</h2>
            <p>Tên nước: ${country.name.common}</p>
            <p>Thủ đô: ${country.capital[0]}</p>
            <p>Dân số: ${country.population.toLocaleString("vi-VN")}</p>
        `;
    }
}

function renderWidgetError(index, message) {
    const names = ["Users", "Weather", "Country"];
    widgets[index].className = "widget error";
    widgets[index].innerHTML = `
        <h2>${names[index]}</h2>
        <p>API lỗi: ${message}</p>
    `;
}

async function loadDashboard() {
    const startTime = Date.now();

    summary.textContent = "Đang tải toàn bộ dashboard...";
    showWidgetLoading(0, "Users");
    showWidgetLoading(1, "Weather");
    showWidgetLoading(2, "Country");

    const results = await Promise.allSettled([
        fetch("https://jsonplaceholder.typicode.com/users").then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        }),
        fetch("https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true").then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        }),
        fetch("https://restcountries.com/v3.1/name/vietnam").then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });

    summary.textContent = `Data loaded in ${Date.now() - startTime} ms`;
}

refreshBtn.addEventListener("click", loadDashboard);
loadDashboard();
