// 무한반복 구조 완성하기 > 완성
// 상 하 반복 구조 >> 완성
// 24.10.07 상하좌우 변경 구조 완성

const slideContainer = document.querySelector(".slide-container");
const slideTrack = document.querySelector(".slide-track");
const images = slideTrack.querySelectorAll("img");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const topBtn = document.querySelector("#topBtn");
const bottomBtn = document.querySelector("#bottomBtn");

let currentIndex = 0;
let falseIsToRight = false;
let falseIsToTop = false;
// false : L > R
// true : R > L

let intervalId = null;

let slideMode = true;
// true = 좌우
// false = 상하

const btns = [prevBtn, nextBtn, topBtn, bottomBtn];

function slideModeTracking() {
  if (slideMode) {
    stopSlideShow();
    slideTrack.style.transition = "none";
    setTimeout(() => {
      slideInside1("row");
      autoStartSlide();
    }, 50);
    slideInside2(falseIsToRight, "translateX");
  } else {
    stopSlideShow();
    slideTrack.style.transition = "none";
    setTimeout(() => {
      slideInside1("column");
      autoStartSlide();
    }, 50);
    slideInside2(falseIsToTop, "translateY");
  }
}

function slideInside1(flex) {
  slideTrack.style.flexDirection = flex;
  slideTrack.offsetHeight; // 리플로우 강제
  slideTrack.style.transition = "all 0.5s ease-in-out";
}

function slideInside2(falseValue, translate) {
  if (falseValue) {
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
      slideTrack.style.transition = "none";
      slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
      setTimeout(() => {
        slideTrack.offsetHeight;
        slideTrack.style.transition = "all 0.5s ease-in-out";
        slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
      }, 50);
    } else {
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
    }
  } else {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
      slideTrack.style.transition = "none";
      slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
      setTimeout(() => {
        slideTrack.offsetHeight;
        slideTrack.style.transition = "all 0.5s ease-in-out";
        slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
      }, 50);
    } else {
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `${translate}(-${currentIndex * 100}%)`;
    }
  }
}

function autoStartSlide() {
  stopSlideShow();
  // 인터벌 지우고 다시 재생하는것 때문에 슬라이드가 망가지네?!
  intervalId = setInterval(slideModeTracking, 2500);
}

function autoTopSlide() {
  stopSlideShow();
  intervalId = setInterval(slideModeTracking, 2500);
}

function stopSlideShow() {
  clearInterval(intervalId);
}

function mouseDectected() {
  slideContainer.addEventListener("mouseenter", () => {
    stopSlideShow();
    btns.forEach((i) => {
      i.style.opacity = 1;
      i.style.transition = "all 0.5s ease-in-out";
    });
  });
  slideContainer.addEventListener("mouseleave", () => {
    autoStartSlide();
    setTimeout(() => {
      btns.forEach((i) => {
        i.style.opacity = 0;
        i.style.transition = "all 0.5s ease-in-out";
      });
    }, 1000);
  });
}

function reverseSlides() {
  falseIsToRight = !falseIsToRight;
  stopSlideShow();
  slideModeTracking();
  autoStartSlide();
}

function reverseTopSlides() {
  falseIsToTop = !falseIsToTop;
  stopSlideShow();
  slideModeTracking();
  autoTopSlide();
}

function clickDetected() {
  prevBtn.addEventListener("click", () => {
    if (!slideMode) {
      slideMode = !slideMode;
    }
    stopSlideShow();
    reverseSlides();
  });
  nextBtn.addEventListener("click", () => {
    if (!slideMode) {
      slideMode = !slideMode;
    }
    stopSlideShow();
    reverseSlides();
  });
  topBtn.addEventListener("click", () => {
    if (slideMode) {
      slideMode = !slideMode;
    }
    stopSlideShow();
    reverseTopSlides();
  });
  bottomBtn.addEventListener("click", () => {
    if (slideMode) {
      slideMode = !slideMode;
    }
    stopSlideShow();
    reverseTopSlides();
  });
}

mouseDectected();
clickDetected();
slideModeTracking();
