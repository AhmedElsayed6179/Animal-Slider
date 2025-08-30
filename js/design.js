const mainImg = document.getElementById("mainImg");
const animalTitle = document.getElementById("animalTitle");
const animalDesc = document.getElementById("animalDesc");
const thumbs = document.querySelectorAll(".thumb");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const sliderContainer = document.querySelector(".slider-container");

let currentIndex = 0;

function updateSlider(index) {
  const selectedThumb = thumbs[index];
  thumbs.forEach((t) => t.classList.remove("active"));
  selectedThumb.classList.add("active");
  mainImg.classList.add("fade");

  setTimeout(() => {
    mainImg.src = selectedThumb.src;
    animalTitle.textContent = selectedThumb.dataset.title;
    animalDesc.textContent = selectedThumb.dataset.desc;
    mainImg.classList.remove("fade");
    sliderContainer.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('${selectedThumb.src}') center/cover no-repeat`;
  }, 200);
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
  updateSlider(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % thumbs.length;
  updateSlider(currentIndex);
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    currentIndex = index;
    updateSlider(currentIndex);
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % thumbs.length;
    updateSlider(currentIndex);
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    updateSlider(currentIndex);
  }
});

updateSlider(currentIndex);

// --- Touch Swipe Support ---

let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector(".slider-container");

slider.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);

slider.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  },
  false
);

function handleGesture() {
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance > 50) {
    document.getElementById("prev").click(); // Previous
  } else if (swipeDistance < -50) {
    document.getElementById("next").click(); // Next
  }
}

// --- Auto adjust thumbnails layout on resize ---
window.addEventListener("resize", () => {
  const thumbs = document.querySelector(".thumbnails");
  if (window.innerWidth < 576) {
    thumbs.style.overflowX = "auto";
  } else {
    thumbs.style.overflowX = "visible";
  }
});
