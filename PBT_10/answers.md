# PHIẾU BÀI TẬP 10 - ASYNC JAVASCRIPT & API INTEGRATION

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

Thứ tự output:

```txt
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

Giải thích:

Code chạy đồng bộ trước nên `1 - Start` in ra đầu tiên. Hai `setTimeout` được đưa sang Macrotask Queue. Hai `Promise.then()` được đưa sang Microtask Queue. Sau khi chạy xong code đồng bộ, Event Loop ưu tiên chạy toàn bộ Microtask Queue trước Macrotask Queue, nên `3 - Promise` và `6 - Promise 2` chạy trước `setTimeout`. Trong `Promise 2` có tạo thêm `setTimeout` nên `7 - Nested timeout` được đưa vào Macrotask Queue sau `2 - Timeout 0ms`. Cuối cùng `5 - Timeout 100ms` chạy sau vì có thời gian chờ 100ms.

### Câu A2 — Fetch API

Đoạn code:

```js
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

`await fetch(...)`: `fetch()` trả về một Promise. Cần `await` để đợi server phản hồi xong rồi mới lấy được đối tượng `Response`.

`response.ok`: là `true` khi status nằm trong khoảng 200-299. Nó sẽ `false` với các lỗi như `404 Not Found`, `500 Internal Server Error`, `429 Too Many Requests`.

`response.json()`: cần `await` lần nữa vì việc đọc body và chuyển từ JSON text sang object cũng là thao tác bất đồng bộ.

`try...catch`: bắt được lỗi mất mạng, lỗi do tự `throw` khi status không ok, lỗi parse JSON sai định dạng. Riêng lỗi 404 không tự nhảy vào `catch`, nên phải kiểm tra `response.ok` rồi tự `throw`.

### Câu A3 — Promise States

Sơ đồ trạng thái Promise:

```txt
Pending
   |
   | resolve
   v
Fulfilled

Pending
   |
   | reject
   v
Rejected
```

Callback Hell là tình trạng lồng quá nhiều callback vào nhau, làm code bị thụt vào nhiều tầng, khó đọc và khó bắt lỗi.

Ví dụ callback hell 4 cấp:

```js
login(user, function (loginResult) {
    getProfile(loginResult.id, function (profile) {
        getOrders(profile.id, function (orders) {
            getOrderDetail(orders[0].id, function (detail) {
                console.log(detail);
            });
        });
    });
});
```

Refactor bằng async/await:

```js
async function showOrderDetail(user) {
    try {
        const loginResult = await login(user);
        const profile = await getProfile(loginResult.id);
        const orders = await getOrders(profile.id);
        const detail = await getOrderDetail(orders[0].id);
        console.log(detail);
    } catch (error) {
        console.log("Có lỗi:", error.message);
    }
}
```

## PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy

Trong app E-Commerce, em sẽ xử lý lỗi theo từng nhóm để người dùng không bị đứng màn hình trắng.

Network errors: nếu mất mạng giữa chừng thì hiện thông báo “Mất kết nối mạng, vui lòng thử lại”, giữ lại dữ liệu cũ nếu có và cho nút thử lại.

API errors:

| Status | Cách xử lý |
|---|---|
| 404 | Báo không tìm thấy sản phẩm hoặc tài nguyên |
| 500 | Báo server đang lỗi, người dùng thử lại sau |
| 429 | Báo gửi quá nhiều yêu cầu, chờ một lúc rồi thử lại |

Timeout: nếu API chậm quá 10 giây thì hủy request.

```js
async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timer);
        throw error;
    }
}
```

Retry logic: thử lại 3 lần nếu lỗi mạng hoặc lỗi tạm thời. Không retry những lỗi như 404 vì tài nguyên không tồn tại thì gọi lại cũng không có kết quả.

```js
async function fetchWithRetry(url, maxRetries = 3) {
    let lastError;

    for (let i = 0; i <= maxRetries; i++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Không tìm thấy dữ liệu");
                }
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            lastError = error;

            if (i === maxRetries || error.message.includes("Không tìm thấy")) {
                throw lastError;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
```

### Câu C2 — Promise.all vs Promise.allSettled vs Promise.race

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|---|---|---|---|
| `Promise.all()` | Khi tất cả Promise fulfilled | Khi có 1 Promise rejected | Cần đủ toàn bộ dữ liệu mới render trang |
| `Promise.allSettled()` | Khi tất cả Promise đã xong, dù thành công hay thất bại | Không reject theo kiểu thông thường | Dashboard nhiều widget, 1 API lỗi không làm hỏng cả trang |
| `Promise.race()` | Khi Promise đầu tiên fulfilled | Khi Promise đầu tiên rejected | Timeout request hoặc lấy kết quả phản hồi nhanh nhất |
| `Promise.any()` | Khi có Promise đầu tiên fulfilled | Khi tất cả Promise đều rejected | Gọi nhiều mirror API, lấy API nào thành công trước |

Ví dụ `Promise.all()`:

```js
async function loadProductPage(productId) {
    const [product, reviews, related] = await Promise.all([
        fetch(`/api/products/${productId}`).then(r => r.json()),
        fetch(`/api/products/${productId}/reviews`).then(r => r.json()),
        fetch(`/api/products/${productId}/related`).then(r => r.json())
    ]);

    return { product, reviews, related };
}
```

Ví dụ `Promise.allSettled()`:

```js
async function loadHomeDashboard() {
    const results = await Promise.allSettled([
        fetch("/api/orders/today").then(r => r.json()),
        fetch("/api/revenue").then(r => r.json()),
        fetch("/api/notifications").then(r => r.json())
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });
}
```

Ví dụ `Promise.race()`:

```js
async function fetchProductWithTimeout(productId) {
    const request = fetch(`/api/products/${productId}`).then(r => r.json());
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request quá chậm")), 5000);
    });

    return Promise.race([request, timeout]);
}
```

Ví dụ `Promise.any()`:

```js
async function loadBannerFromMirror() {
    const banner = await Promise.any([
        fetch("https://cdn1.example.com/banner.json").then(r => r.json()),
        fetch("https://cdn2.example.com/banner.json").then(r => r.json()),
        fetch("https://cdn3.example.com/banner.json").then(r => r.json())
    ]);

    renderBanner(banner);
}
```

## Dẫn chứng phần B

### Weather App

![Weather code](screenshots/code_weather_app.png)

![Weather loading](screenshots/weather_loading.png)

![Weather success](screenshots/weather_success.png)

![Weather error](screenshots/weather_error.png)

### User Directory

![User Directory code](screenshots/code_user_directory.png)

![User Directory loading](screenshots/user_directory_loading.png)

![User Directory success](screenshots/user_directory_success.png)

![User Directory error](screenshots/user_directory_error.png)

### Gallery

![Gallery code](screenshots/code_gallery.png)

![Gallery loading](screenshots/gallery_loading.png)

![Gallery success](screenshots/gallery_success.png)

![Gallery error](screenshots/gallery_error.png)

### Dashboard

![Dashboard code](screenshots/code_dashboard.png)

![Dashboard loading](screenshots/dashboard_loading.png)

![Dashboard success](screenshots/dashboard_success.png)

![Dashboard error](screenshots/dashboard_error.png)

## Phần video

Em bỏ phần video theo yêu cầu.
