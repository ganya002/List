const homeBtn = document.querySelector('#home-btn');
const darkToggle = document.querySelector('#dark-mode-toggle');

homeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

function applyTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDark);
}

let isDark = localStorage.getItem('darkMode');
if (isDark === null) isDark = 'true'; 
isDark = isDark === 'true';

darkToggle.checked = isDark;
applyTheme(isDark);

darkToggle.addEventListener('change', () => {
    applyTheme(darkToggle.checked);
});