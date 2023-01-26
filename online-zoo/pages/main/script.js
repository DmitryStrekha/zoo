const mediaQueryMax640 = window.matchMedia("(max-width: 640px)");
const mediaQueryMax970 = window.matchMedia("(max-width: 970px)");
const blackout = document.querySelector(".blackout");
const headerBg = document.querySelector(".header");
const headerLogo = document.querySelector(".logo");
const areaBtnMenu = document.querySelector(".to-open-wrapper");
const btnMenu = document.querySelector(".to-open");
const menu = document.querySelector(".header__nav");
const designLink = document.querySelector(".header__link");

// burger menu
areaBtnMenu.addEventListener("click", openMenu);
blackout.addEventListener("click", openMenu);
function openMenu() {
  if (mediaQueryMax640.matches) {
    blackout.classList.toggle("blackout-visible");
    headerBg.classList.toggle("header-open-menu");
    headerLogo.classList.toggle("logo-open-menu");
    btnMenu.classList.toggle("cross-open");
    menu.classList.toggle("open-nav");
    designLink.classList.toggle("design-open-menu");
  }
}

// end burger menu

// slider
let blockCards = document.querySelectorAll(".pets__cards");
let cards = document.querySelectorAll(".card");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
let cardsSet = new Set();
const petsArr = [
  [
    "../../assets/img/Rectangle_panda.jpg",
    "Giant Pandas",
    "Native to Southwest China",
  ],
  ["../../assets/img/Rectangle_eagle.jpg", "Eagles", "Native to South America"],
  ["../../assets/img/Rectangle_gorillas.jpg", "Gorillas", "Native to Congo"],
  [
    "../../assets/img/Rectangle_sloth.jpg",
    "Two-toed Sloth",
    "Mesoamerica, South America",
  ],
  ["../../assets/img/Rectangle_cheetah.jpg", "cheetahs", "Native to Africa"],
  [
    "../../assets/img/Rectangle_penguin.jpg",
    "Penguins",
    "Native to Antarctica",
  ],
];

let currentBlockCards = 0;
let isEnabled = true;

function changeCurrentBlockCards(n) {
  currentBlockCards = (n + blockCards.length) % blockCards.length;
}
leftArrow.addEventListener("click", function () {
  console.log("left click", isEnabled);
  if (isEnabled) {
    console.log("currentBlockCards", currentBlockCards);
    previousBlockCards(currentBlockCards);
  }
});

rightArrow.addEventListener("click", function () {
  console.log("right click", isEnabled);
  if (isEnabled) {
    console.log("currentBlockCards", currentBlockCards);
    nextBlockCards(currentBlockCards);
  }
});

function previousBlockCards(n) {
  hideBlockCards("to-right");
  changeCurrentBlockCards(n - 1);
  showBlockCards("from-left");
}

function nextBlockCards(n) {
  hideBlockCards("to-left");
  changeCurrentBlockCards(n + 1);
  showBlockCards("from-right");
}

function hideBlockCards(direction) {
  isEnabled = false;
  blockCards[currentBlockCards].classList.add(direction);
  blockCards[currentBlockCards].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showBlockCards(direction) {
  blockCards[currentBlockCards].classList.add("next", direction);
  blockCards[currentBlockCards].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
  fillCardBlock(currentBlockCards);
}
function shuffleCard() {
  let ind = 0;
  cardsSet.clear();

  do {
    ind = getRandomIndex(0, 5);
    cardsSet.add(ind);
  } while (cardsSet.size < 6);
}

function fillCardBlock(currentBlock) {
  const currentBlockFill = blockCards[currentBlock];

  console.log("currentBlockFill", currentBlockFill);
  shuffleCard();
  console.log("cardsSet", cardsSet);
  for (let i = 0; i < currentBlockFill.children.length; i++) {
    console.log("i", i);
    let setArr = Array.from(cardsSet);
    console.log("setArr", setArr);
    console.log("petsArr[setArr[i]][0]", petsArr[setArr[i]][0]);
    currentBlockFill.children[i].children[0].children[0].src =
      petsArr[setArr[i]][0];
    currentBlockFill.children[i].children[1].children[0].textContent =
      petsArr[setArr[i]][1];
    currentBlockFill.children[i].children[1].children[1].textContent =
      petsArr[setArr[i]][2];
  }
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//  end slider

// pop up
const testimonials = document.querySelectorAll(".testimonial");
const blackoutUsers = document.querySelector(".blackout-testimonials");
const closePopUpBtn = document.querySelector(".user-cross-btn");
let isPopUpEnaibled = false;

blackoutUsers.addEventListener("click", closePopUp);
closePopUpBtn.addEventListener("click", closePopUpBtn);

testimonials.forEach((user) => {
  user.addEventListener("click", showPopUp);
});

function closePopUp() {
  if (isPopUpEnaibled) {
    testimonials.forEach((user) => {
      user.classList.remove("user-popup");
    });
    blackoutUsers.classList.remove("blackout-visible");
    closePopUpBtn.classList.remove("active");
    isPopUpEnaibled = false;
  }
}

function showPopUp() {
  if (mediaQueryMax970) {
    if (!isPopUpEnaibled) {
      this.classList.add("user-popup");
      blackoutUsers.classList.add("blackout-visible");
      closePopUpBtn.classList.add("active");
      isPopUpEnaibled = true;
    }
  }
}

// testimonials slider

const rangeElement = document.querySelector(".testimonials__range");
let gap = 30;
let cardWidth = 268;

rangeElement.addEventListener("input", () => {
  testimonials.forEach(
    (t) =>
      (t.style.transform = `translateX(-${
        (cardWidth + gap) * rangeElement.value
      }px)`)
  );
});

window
  .matchMedia("screen and (max-width: 1220px) and (min-width: 640px")
  .addEventListener("change", (e) => {
    resetCards();
    recalculateCardWidth();
  });


const resetCards = () => {
  rangeElement.value = 0;
  testimonials.forEach((t) => (t.style.transform = ''));
};

const recalculateCardWidth = () => {
  if (
    window.matchMedia("screen and (min-width: 640px) and (max-width: 1220px")
      .matches
     ) {
    cardWidth = 293;
    let hiddenCards = testimonials.length - 3;
    rangeElement.setAttribute("max", hiddenCards);
  } else if (window.matchMedia("screen and (min-width: 1221px").matches) {
    cardWidth = 268;
    let hiddenCards = testimonials.length - 4;
    rangeElement.setAttribute("max", hiddenCards);
  }
};

window.addEventListener("DOMContentLoaded", recalculateCardWidth);
window.addEventListener("resize", () => {
  resetCards();
  recalculateCardWidth();
});
