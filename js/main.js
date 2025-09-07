// Dark Mode Button
const darkBtn = document.getElementById("darkModeBtn");
let scrollToTop = document.getElementById("toTop");
const body = document.body;
const themeKey = "theme";
const darkTheme = "dark-mode";
const lightTheme = "light";
const personalImg = document.getElementById("MYphoto");

// Function to smoothly change image
function changeImage(newSrc) {
  personalImg.style.opacity = 0; // fade out
  setTimeout(() => {
    personalImg.src = newSrc; // change image
    personalImg.style.opacity = 1; // fade in
  }, 300); // delay يساوي نص وقت الـ transition
}

// Set initial theme on page load
const currentTheme = localStorage.getItem(themeKey) || lightTheme;
if (currentTheme === darkTheme) {
  body.classList.add(darkTheme);
  darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  changeImage("img/Untitled-2.gif"); // ✅ Dark mode image
} else {
  body.classList.remove(darkTheme);
  darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  changeImage("img/Untitled-1.gif"); // ✅ Light mode image
}

// Scroll To Top
scrollToTop.addEventListener("click", () => {
  scroll({
    top: 0,
    behavior: "smooth",
  });
});
window.onscroll = function () {
  if (scrollY >= 600) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
};

// Toggle theme on button click
darkBtn.addEventListener("click", () => {
  if (body.classList.toggle(darkTheme)) {
    darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    changeImage("img/Untitled-2.gif"); // ✅ Dark image
    localStorage.setItem(themeKey, darkTheme);
  } else {
    darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    changeImage("img/Untitled-1.gif"); // ✅ Light image
    localStorage.setItem(themeKey, lightTheme);
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
