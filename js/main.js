// Dark Mode Button
const darkBtn = document.getElementById("darkModeBtn");
const body = document.body;
const themeKey = "theme";
const darkTheme = "dark-mode";
const lightTheme = "light";

// Set initial theme on page load
const currentTheme = localStorage.getItem(themeKey) || lightTheme;
if (currentTheme === darkTheme) {
  body.classList.add(darkTheme);
  darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Light Mode Icon
} else {
  body.classList.remove(darkTheme);
  darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Dark Mode Icon
}

// Toggle theme on button click
darkBtn.addEventListener("click", () => {
  if (body.classList.toggle(darkTheme)) {
    darkBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem(themeKey, darkTheme);
  } else {
    darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem(themeKey, lightTheme);
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
