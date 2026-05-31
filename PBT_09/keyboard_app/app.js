const images = Array.from({ length: 9 }, (_, index) => {
    const number = index + 1;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520"><rect width="900" height="520" fill="hsl(${number * 35},70%,72%)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="80" font-family="Arial" fill="#111827">Ảnh ${number}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
});

const mainImage = document.querySelector("#mainImage");
const modalImage = document.querySelector("#modalImage");
const imageModal = document.querySelector("#imageModal");
const closeImageModal = document.querySelector("#closeImageModal");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");
const openPalette = document.querySelector("#openPalette");
const palette = document.querySelector("#palette");
const commandInput = document.querySelector("#commandInput");
const commandList = document.querySelector("#commandList");
const thumbs = document.querySelector("#thumbs");
const statusText = document.querySelector("#status");

let currentIndex = 0;
let playing = false;
let timer = null;
let activeCommand = 0;

const commands = [
    { name: "Next image", action: nextImage },
    { name: "Previous image", action: prevImage },
    { name: "Play slideshow", action: startSlideshow },
    { name: "Pause slideshow", action: stopSlideshow },
    { name: "Toggle dark mode", action: () => document.body.classList.toggle("dark") }
];

function renderImage() {
    mainImage.src = images[currentIndex];
    mainImage.alt = "Ảnh số " + (currentIndex + 1);
    statusText.textContent = "Đang xem ảnh " + (currentIndex + 1) + "/" + images.length;
    document.querySelectorAll(".thumb").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    renderImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderImage();
}

function startSlideshow() {
    if (playing) return;
    playing = true;
    playBtn.textContent = "Pause slideshow";
    timer = setInterval(nextImage, 1200);
}

function stopSlideshow() {
    playing = false;
    playBtn.textContent = "Play slideshow";
    clearInterval(timer);
}

function togglePlay() {
    playing ? stopSlideshow() : startSlideshow();
}

function openImageModal() {
    modalImage.src = images[currentIndex];
    imageModal.classList.add("show");
    closeImageModal.focus();
}

function closeModal() {
    imageModal.classList.remove("show");
    palette.classList.remove("show");
}

function renderThumbs() {
    thumbs.textContent = "";
    images.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = "Chọn ảnh " + (index + 1);
        img.className = "thumb";
        img.tabIndex = 0;
        img.dataset.index = index;
        img.setAttribute("aria-label", "Chọn ảnh " + (index + 1));
        thumbs.appendChild(img);
    });
}

function getFilteredCommands() {
    return commands.filter(command => command.name.toLowerCase().includes(commandInput.value.toLowerCase()));
}

function renderCommands() {
    commandList.textContent = "";
    const list = getFilteredCommands();
    if (activeCommand >= list.length) activeCommand = 0;
    list.forEach((command, index) => {
        const li = document.createElement("li");
        li.className = "command-item";
        if (index === activeCommand) li.classList.add("active");
        li.textContent = command.name;
        li.tabIndex = 0;
        li.dataset.index = index;
        commandList.appendChild(li);
    });
}

function showPalette() {
    palette.classList.add("show");
    commandInput.value = "";
    activeCommand = 0;
    renderCommands();
    commandInput.focus();
}

function runActiveCommand() {
    const list = getFilteredCommands();
    if (!list[activeCommand]) return;
    list[activeCommand].action();
    palette.classList.remove("show");
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
playBtn.addEventListener("click", togglePlay);
openPalette.addEventListener("click", showPalette);
mainImage.addEventListener("click", openImageModal);
mainImage.addEventListener("keydown", event => {
    if (event.key === "Enter") openImageModal();
});
closeImageModal.addEventListener("click", closeModal);

thumbs.addEventListener("click", event => {
    if (!event.target.classList.contains("thumb")) return;
    currentIndex = Number(event.target.dataset.index);
    renderImage();
});

thumbs.addEventListener("keydown", event => {
    if (!event.target.classList.contains("thumb") || event.key !== "Enter") return;
    currentIndex = Number(event.target.dataset.index);
    renderImage();
});

commandInput.addEventListener("input", () => {
    activeCommand = 0;
    renderCommands();
});

commandInput.addEventListener("keydown", event => {
    const list = getFilteredCommands();
    if (event.key === "ArrowDown") {
        event.preventDefault();
        activeCommand = (activeCommand + 1) % list.length;
        renderCommands();
    }
    if (event.key === "ArrowUp") {
        event.preventDefault();
        activeCommand = (activeCommand - 1 + list.length) % list.length;
        renderCommands();
    }
    if (event.key === "Enter") runActiveCommand();
});

commandList.addEventListener("click", event => {
    if (!event.target.classList.contains("command-item")) return;
    activeCommand = Number(event.target.dataset.index);
    runActiveCommand();
});

document.addEventListener("keydown", event => {
    if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        showPalette();
        return;
    }
    if (event.key === "Escape") closeModal();
    if (palette.classList.contains("show")) return;
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
    if (event.key === " ") {
        event.preventDefault();
        togglePlay();
    }
    const number = Number(event.key);
    if (number >= 1 && number <= images.length) {
        currentIndex = number - 1;
        renderImage();
    }
});

renderThumbs();
renderImage();
