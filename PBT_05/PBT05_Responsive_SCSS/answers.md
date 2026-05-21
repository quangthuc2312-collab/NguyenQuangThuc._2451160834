# PBT05 - CSS Responsive & SCSS

> Ghi chú: Bài làm đã bỏ phần video, README và bỏ folder `images/`. Sản phẩm dùng khung placeholder CSS để bài trông đơn giản như sinh viên tự làm.

---

## PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1 - Viewport & Mobile-First

### 1. Thẻ meta viewport chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Giải thích:

- `name="viewport"`: khai báo vùng hiển thị của trình duyệt.
- `width=device-width`: chiều rộng trang bằng chiều rộng thiết bị.
- `initial-scale=1.0`: mức zoom ban đầu là 100%.

Nếu thiếu thẻ này, iPhone có thể hiển thị trang như bản desktop thu nhỏ. Khi đó chữ nhỏ, layout khó đọc và người dùng phải zoom tay.

Nguồn tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md` - phần Viewport.

### 2. Mobile-First và Desktop-First

Mobile-First: viết CSS mặc định cho mobile trước, sau đó dùng `min-width` để mở rộng lên tablet/desktop.

```css
.product-grid {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

Desktop-First: viết CSS mặc định cho desktop trước, sau đó dùng `max-width` để thu nhỏ xuống mobile.

```css
.product-grid {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

Mobile-First được khuyên dùng vì hiện nay nhiều người truy cập bằng điện thoại. Cách này cũng dễ mở rộng layout từ nhỏ đến lớn.

Nguồn tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md` - phần Mobile-First.

---

## Câu A2 - Breakpoints

| Breakpoint | Kích thước | Thiết bị đại diện | Product grid |
|---|---:|---|---:|
| Extra small | < 576px | Điện thoại nhỏ | 1 cột |
| Small | ≥ 576px | Điện thoại lớn | 1 cột |
| Medium | ≥ 768px | Tablet | 2 cột |
| Large | ≥ 992px | Laptop nhỏ | 3 cột |
| Extra large | ≥ 1200px | Desktop | 4 cột |
| XXL | ≥ 1400px | Màn hình lớn | 4 hoặc 5 cột |

Nguồn tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md` - phần Breakpoints.

---

## Câu A3 - Media Queries

CSS:

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

Nguồn tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md` - phần Media Queries.

---

## Câu A4 - SCSS Basics

### 1. Variables

Dùng biến để lưu màu, font, spacing.

```scss
$primary-color: #2457a6;

button {
  background: $primary-color;
}
```

### 2. Nesting

Viết CSS lồng nhau cho dễ nhìn.

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

### 3. Mixins

Tạo đoạn CSS dùng lại nhiều lần.

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

### 4. Extend / Inheritance

Kế thừa style có sẵn.

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

Trình duyệt không đọc trực tiếp file `.scss` vì browser chỉ hiểu HTML, CSS, JS. Cần biên dịch SCSS sang CSS.

Lệnh compile:

```bash
sass scss/style.scss scss/style.css
```

Nguồn tham chiếu: `tuan_3_css_advanced/16_sass_scss.md` - phần SCSS Basics.

---

# PHẦN B - THỰC HÀNH CODE

## Bài B1 - Responsive Product Page

File đã làm:

- `responsive.html`
- `responsive.css`

Đã có:

- Mobile-First: CSS mặc định là mobile.
- Breakpoint tablet: `@media (min-width: 768px)`.
- Breakpoint desktop: `@media (min-width: 1024px)`.
- Mobile: 1 cột, hiện hamburger, ẩn sidebar.
- Tablet: 2 cột, hiện nav ngang, sidebar dạng ngang.
- Desktop: 4 cột, layout có sidebar + product grid + ads bar.
- Có 8 product cards.
- Không dùng folder `images`; phần ảnh sản phẩm được thay bằng khung placeholder CSS cho đơn giản.

Ảnh chụp:

- `screenshots/responsive_375.png`
- `screenshots/responsive_768.png`
- `screenshots/responsive_1200.png`

Nguồn tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md` - phần Responsive Layouts, Mobile-First, Media Queries.

---

## Bài B2 - CSS Transitions & Animations

File đã làm:

- `animations.html`
- `animations.css`

Đã có 5 hiệu ứng:

1. Card hover: `transform: translateY(-8px)` và tăng `box-shadow`.
2. Button hover: đổi màu và `transform: scale(1.05)`.
3. Zoom phần ảnh giả: dùng `.demo-image` và `transform: scale(1.1)`.
4. Loading spinner: dùng `@keyframes spin`.
5. Fade-in: dùng `@keyframes fadeIn`.

Ảnh chụp:

- `screenshots/animations_page.png`

Nguồn tham chiếu: `tuan_3_css_advanced/15_transitions_animations.md` - phần Transitions, Transform, Keyframes.

---

## Bài B3 - SCSS Refactor

Folder đã làm:

```text
scss/
├── _variables.scss
├── _mixins.scss
├── _components.scss
├── style.scss
└── style.css
```

Đã có:

- Variables: màu, font, breakpoint, spacing, radius.
- Nesting: `.site-header`, `.product-card`, `.section-title`.
- Parent selector: `&:hover`, `&.featured`.
- Mixins: `respond-to`, `flex-center`, `card-shadow`.
- Partial + import: dùng `_variables.scss`, `_mixins.scss`, `_components.scss`.

Lệnh compile SCSS sang CSS:

```bash
sass scss/style.scss scss/style.css
```

Nguồn tham chiếu: `tuan_3_css_advanced/16_sass_scss.md` - phần Variables, Nesting, Mixins, Partials.

---

# PHẦN C - PHÂN TÍCH

## Câu C1 - Phân tích trang web thực

Trang chọn: `VNExpress`.

Ảnh chụp:

- Mobile 375px: `screenshots/vnexpress_375.png`
- Tablet 768px: `screenshots/vnexpress_768.png`
- Desktop 1440px: `screenshots/vnexpress_1440.png`
- Media query 1: `screenshots/c1_media_query_1.png`
- Media query 2: `screenshots/c1_media_query_2.png`

### 1. Navigation thay đổi thế nào?

- Mobile: menu chính thu gọn, thường có icon menu/hamburger hoặc chỉ hiện ít mục quan trọng.
- Tablet: menu hiển thị nhiều mục hơn nhưng vẫn gọn.
- Desktop: thanh menu ngang hiển thị đầy đủ các chuyên mục.

### 2. Lưới content thay đổi mấy cột?

- Mobile 375px: nội dung xếp 1 cột.
- Tablet 768px: nội dung thường chia 2 cột.
- Desktop 1440px: nội dung chia nhiều cột hơn, có cột tin chính và cột tin phụ/sidebar.

### 3. Elements nào bị ẩn trên mobile?

- Một số chuyên mục trên thanh nav.
- Sidebar hoặc các khối quảng cáo phụ.
- Một số tin phụ để tiết kiệm chiều ngang.

### 4. Font size có thay đổi không?

Có. Mobile thường dùng font nhỏ hơn một chút, desktop có tiêu đề lớn hơn để tận dụng màn hình rộng.

### 5. Media queries tìm được

Ví dụ dạng media query:

```css
@media screen and (max-width: 767px) {
  .main-nav { display: none; }
  .menu-mobile { display: block; }
  .item-news { width: 100%; }
}
```

```css
@media screen and (min-width: 1024px) {
  .container { max-width: 1130px; }
  .list-news { display: grid; grid-template-columns: 2fr 1fr; }
  .sidebar { display: block; }
}
```

Nguồn tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md` - phần Media Queries và quan sát giao diện VNExpress ở 3 kích thước.

---

## Câu C2 - Thiết kế Responsive Strategy

Trang: Đặt bàn nhà hàng.

### 1. Wireframe Mobile

```text
┌────────────────────────┐
│ Logo + nút gọi điện    │
├────────────────────────┤
│ Hero image             │
├────────────────────────┤
│ Form đặt bàn           │
│ - Ngày                 │
│ - Giờ                  │
│ - Số người             │
│ - Ghi chú              │
├────────────────────────┤
│ Grid ảnh món ăn: 1 cột │
├────────────────────────┤
│ Google Maps            │
├────────────────────────┤
│ Footer                 │
└────────────────────────┘
```

Mobile: không cần ẩn form. Có thể ẩn bớt slogan dài hoặc ảnh phụ. Form đặt ngay sau hero để người dùng đặt bàn nhanh.

### 2. Wireframe Tablet

```text
┌──────────────────────────────┐
│ Logo          SĐT đặt bàn    │
├──────────────────────────────┤
│ Hero image                   │
├──────────────────────────────┤
│ Form đặt bàn                 │
├──────────────────────────────┤
│ Grid ảnh món ăn: 2 cột       │
├──────────────────────────────┤
│ Google Maps                  │
├──────────────────────────────┤
│ Footer                       │
└──────────────────────────────┘
```

Tablet: grid ảnh 2 cột. Bản đồ nằm dưới form và grid ảnh.

### 3. Wireframe Desktop

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

Desktop: layout 2 cột. Bên trái là ảnh món ăn, bên phải là form + bản đồ. Không cần sidebar riêng vì form đã là khối phụ quan trọng.

### 4. CSS skeleton Mobile-First

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

Nguồn tham chiếu: `tuan_3_css_advanced/13_creating_responsive_layouts.md` - phần Mobile-First, CSS Grid, Media Queries.

---

# Gợi ý 4 commit

```bash
git add .
git commit -m "create responsive product page"

git add .
git commit -m "add transitions and animations"

git add .
git commit -m "refactor css to scss"

git add .
git commit -m "add answers and screenshots"
```
