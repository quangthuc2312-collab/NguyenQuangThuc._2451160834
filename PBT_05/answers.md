# PBT05 - CSS Responsive & SCSS

## PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1 - Viewport & Mobile-First

**Thẻ meta viewport chuẩn:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Giải thích:**

- `name="viewport"`: khai báo viewport cho trình duyệt.
- `width=device-width`: chiều rộng trang bằng chiều rộng thiết bị.
- `initial-scale=1.0`: mức zoom ban đầu là 100%.

Nếu thiếu thẻ này, iPhone thường hiển thị trang giống bản desktop bị thu nhỏ. Chữ và bố cục sẽ nhỏ, khó đọc, người dùng phải zoom bằng tay.

**Mobile-First:** viết CSS mặc định cho màn hình nhỏ trước, sau đó dùng `min-width` để mở rộng lên màn hình lớn.

```css
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Desktop-First:** viết CSS mặc định cho màn hình lớn trước, sau đó dùng `max-width` để chỉnh xuống màn hình nhỏ.

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

Mobile-First được khuyên dùng vì hiện nay người dùng điện thoại nhiều. Cách này giúp giao diện nhẹ hơn trên mobile và dễ mở rộng lên tablet, desktop.

---

## Câu A2 - Breakpoints

| Breakpoint | Kích thước | Thiết bị đại diện | Lưới sản phẩm |
|---|---:|---|---:|
| Extra small | < 576px | Điện thoại nhỏ | 1 cột |
| Small | ≥ 576px | Điện thoại lớn | 1 cột |
| Medium | ≥ 768px | Tablet | 2 cột |
| Large | ≥ 992px | Laptop nhỏ | 3 cột |
| Extra large | ≥ 1200px | Desktop | 4 cột |
| XXL | ≥ 1400px | Màn hình lớn | 4 hoặc 5 cột |

---

## Câu A3 - Media Queries

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | `.container width` |
|---:|---:|
| 375px | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

---

## Câu A4 - SCSS Basics

**1. Variables**

Variables dùng để lưu giá trị dùng nhiều lần như màu, font, khoảng cách.

```scss
$primary-color: #2457a6;

button {
  background: $primary-color;
}
```

**2. Nesting**

Nesting là viết CSS lồng nhau theo cấu trúc HTML.

```scss
.card {
  .card-title {
    font-size: 18px;
  }

  &:hover {
    transform: translateY(-4px);
  }
}
```

**3. Mixins**

Mixin dùng để tạo một đoạn CSS có thể gọi lại nhiều lần.

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  @include flex-center;
}
```

**4. Extend / Inheritance**

`@extend` dùng để kế thừa style từ class khác.

```scss
.btn {
  padding: 10px 16px;
  border-radius: 8px;
}

.btn-primary {
  @extend .btn;
  background: blue;
}
```

Trình duyệt không đọc trực tiếp file `.scss` vì trình duyệt chỉ hiểu CSS. Cần biên dịch SCSS sang CSS.

Lệnh compile:

```bash
sass scss/style.scss scss/style.css
```

---

# PHẦN B - THỰC HÀNH CODE

## Bài B1 - Responsive Product Page

File thực hiện:

- `responsive.html`
- `responsive.css`

Nội dung đã làm:

- CSS viết theo Mobile-First.
- Mobile mặc định: 1 cột, hiện hamburger, ẩn sidebar.
- Tablet từ `768px`: product grid 2 cột, sidebar hiện ngang.
- Desktop từ `1024px`: product grid 4 cột, có sidebar bên trái và ads bên phải.
- Có 8 product cards.
- Ảnh sản phẩm dùng khung giả bằng CSS, không dùng folder images.
- Font size thay đổi theo breakpoint.
- Navigation đổi từ hamburger sang menu ngang.

Ảnh chụp:

- `screenshots/responsive_375.png`
- `screenshots/responsive_768.png`
- `screenshots/responsive_1200.png`

---

## Bài B2 - CSS Transitions & Animations

File thực hiện:

- `animations.html`
- `animations.css`

5 hiệu ứng đã làm:

**1. Card hover**

```css
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
}
```

**2. Button hover**

```css
.buy-btn:hover {
  background: #111;
  color: white;
  transform: scale(1.05);
}
```

**3. Image zoom**

```css
.image-box {
  overflow: hidden;
}

.product-card:hover .demo-image {
  transform: scale(1.1);
}
```

**4. Loading spinner**

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**5. Fade-in**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Ảnh chụp:

- `screenshots/animations_page.png`

---

## Bài B3 - SCSS Refactor

Cấu trúc folder:

```text
scss/
├── _variables.scss
├── _mixins.scss
├── _components.scss
├── style.scss
└── style.css
```

**Variables:**

```scss
$primary-color: #2457a6;
$secondary-color: #f2f6ff;
$text-color: #222;
$font-primary: Arial, sans-serif;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 32px;
```

**Nesting:**

```scss
.product-card {
  padding: $spacing-md;

  .card-title {
    font-size: 18px;
  }

  &:hover {
    transform: translateY(-4px);
  }

  &.featured {
    border: 2px solid $primary-color;
  }
}
```

**Mixins:**

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin card-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}
```

**Import partials trong `style.scss`:**

```scss
@import 'variables';
@import 'mixins';
@import 'components';
```

Lệnh compile SCSS sang CSS:

```bash
sass scss/style.scss scss/style.css
```

---

# PHẦN C - PHÂN TÍCH

## Câu C1 - Phân tích trang web thực

Trang chọn: VNExpress.

Ảnh chụp:

- Mobile 375px: `screenshots/vnexpress_375.png`
- Tablet 768px: `screenshots/vnexpress_768.png`
- Desktop 1440px: `screenshots/vnexpress_1440.png`
- Media query 1: `screenshots/c1_media_query_1.png`
- Media query 2: `screenshots/c1_media_query_2.png`

**Navigation thay đổi:**

- Mobile: menu thu gọn, chỉ hiện các mục chính và icon menu.
- Tablet: menu hiện nhiều hơn mobile nhưng vẫn gọn.
- Desktop: thanh menu ngang hiển thị nhiều chuyên mục hơn.

**Lưới content:**

- Mobile 375px: 1 cột.
- Tablet 768px: khoảng 2 cột.
- Desktop 1440px: nhiều cột hơn, có tin chính và tin phụ.

**Elements bị ẩn trên mobile:**

- Một số mục trên thanh menu.
- Sidebar phụ.
- Một số khối quảng cáo hoặc tin phụ.

**Font size:**

Có thay đổi. Trên mobile tiêu đề và nội dung nhỏ hơn. Trên desktop tiêu đề chính lớn hơn.

**Media queries:**

```css
@media screen and (max-width: 767px) {
  .main-nav {
    display: none;
  }

  .menu-mobile {
    display: block;
  }

  .item-news {
    width: 100%;
  }
}
```

```css
@media screen and (min-width: 1024px) {
  .container {
    max-width: 1130px;
  }

  .list-news {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  .sidebar {
    display: block;
  }
}
```

---

## Câu C2 - Thiết kế Responsive Strategy

Trang: Đặt bàn nhà hàng.

**Mobile:**

```text
┌────────────────────────┐
│ Logo + số điện thoại   │
├────────────────────────┤
│ Hero image             │
├────────────────────────┤
│ Form đặt bàn           │
├────────────────────────┤
│ Grid ảnh món ăn 1 cột  │
├────────────────────────┤
│ Google Maps            │
├────────────────────────┤
│ Footer                 │
└────────────────────────┘
```

Trên mobile, có thể ẩn slogan dài hoặc ảnh phụ. Form đặt bàn nên nằm ngay sau hero.

**Tablet:**

```text
┌──────────────────────────────┐
│ Logo          SĐT đặt bàn    │
├──────────────────────────────┤
│ Hero image                   │
├──────────────────────────────┤
│ Form đặt bàn                 │
├──────────────────────────────┤
│ Grid ảnh món ăn 2 cột        │
├──────────────────────────────┤
│ Google Maps                  │
├──────────────────────────────┤
│ Footer                       │
└──────────────────────────────┘
```

Trên tablet, grid ảnh món ăn dùng 2 cột. Bản đồ nằm dưới form và grid ảnh.

**Desktop:**

```text
┌────────────────────────────────────────────┐
│ Logo                         SĐT đặt bàn  │
├────────────────────────────────────────────┤
│ Hero image toàn ngang                      │
├──────────────────────┬─────────────────────┤
│ Grid ảnh món ăn      │ Form đặt bàn        │
│ 3 cột                │ Google Maps         │
├──────────────────────┴─────────────────────┤
│ Footer                                     │
└────────────────────────────────────────────┘
```

Trên desktop, layout chia 2 cột. Bên trái là grid ảnh món ăn, bên phải là form đặt bàn và bản đồ. Không cần sidebar riêng.

**CSS skeleton Mobile-First:**

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.hero {
  min-height: 320px;
  background: #ddd;
}

.booking-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px;
}

.food-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.booking-form,
.map {
  width: 100%;
}

@media (min-width: 768px) {
  .food-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .booking-layout {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .booking-layout {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }

  .food-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .form-map-column {
    display: grid;
    gap: 20px;
  }
}
```
