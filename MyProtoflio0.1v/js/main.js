// Dark Mode Button
const darkBtn = document.getElementById("darkModeBtn");
const body = document.body;
const themeKey = "theme";
const darkTheme = "dark";
const lightTheme = "light";

// Set initial theme on page load
const currentTheme = localStorage.getItem(themeKey) || lightTheme;
if (currentTheme === darkTheme) {
  body.classList.add("dark-mode");
  darkBtn.textContent = "Light Mode";
} else {
  body.classList.remove("dark-mode");
  darkBtn.textContent = "Dark Mode";
}

// Toggle theme on button click
darkBtn.addEventListener("click", () => {
  if (body.classList.toggle("dark-mode")) {
    darkBtn.textContent = "Light Mode";
    localStorage.setItem(themeKey, darkTheme);
  } else {
    darkBtn.textContent = "Dark Mode";
    localStorage.setItem(themeKey, lightTheme);
  }
});
