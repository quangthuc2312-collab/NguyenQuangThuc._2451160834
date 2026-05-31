const gallery = document.querySelector("#gallery");
const statusBox = document.querySelector("#status");
const loadMoreBox = document.querySelector("#loadMore");
const loadTrigger = document.querySelector("#load-trigger");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightboxImg");
const closeLightbox = document.querySelector("#closeLightbox");

let page = 1;
let isLoading = false;
let hasMore = true;

const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});

const scrollObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
});

function setStatus(text, isError = false) {
    statusBox.textContent = text;
    statusBox.className = isError ? "error" : "";
}

function renderPhotos(photos) {
    photos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card";
        card.innerHTML = `
            <img data-src="${photo.download_url}" alt="${photo.author}">
            <p>${photo.author}</p>
        `;
        const img = card.querySelector("img");
        img.addEventListener("click", () => {
            lightboxImg.src = photo.download_url;
            lightbox.classList.remove("hidden");
        });
        gallery.appendChild(card);
        imageObserver.observe(img);
    });
}

async function loadMorePhotos() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    loadMoreBox.classList.remove("hidden");
    setStatus(page === 1 ? "Đang tải 20 ảnh đầu tiên..." : "Đang tải thêm ảnh...");

    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const photos = await response.json();

        if (photos.length === 0) {
            hasMore = false;
            setStatus("Đã hết ảnh để tải.");
            return;
        }

        renderPhotos(photos);
        setStatus(`Đã tải xong trang ${page}.`);
        page++;
    } catch (error) {
        setStatus("Không tải được ảnh. Kiểm tra mạng hoặc API.", true);
    } finally {
        isLoading = false;
        loadMoreBox.classList.add("hidden");
    }
}

closeLightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        lightbox.classList.add("hidden");
    }
});

scrollObserver.observe(loadTrigger);
loadMorePhotos();
