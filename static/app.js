
const darkModeToggle = document.getElementById('dark-mode-toggle');
const textareas = document.querySelectorAll('textarea');
const inputs = document.querySelectorAll('input');
const navbar = document.querySelector('.navbar');
const body = document.body;
const isDarkMode = localStorage.getItem('darkMode') === 'true';
const aboutModalToggle = document.getElementById('about-modal-toggle');
const aboutModal = document.getElementById('aboutModal');
const aboutModalContent = document.getElementById('aboutModalContent');
const aboutModalClose = document.getElementById('aboutModalClose');

function toggleElements(isDark) {
    if (isDark) {
        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
    } else {
        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');
    }
    textareas.forEach(textarea => { toggleElementMode(textarea, isDark); });
    inputs.forEach(input => { toggleElementMode(input, isDark); });
    toggleElementMode(aboutModalContent, isDark);
    toggleElementMode(aboutModalClose, isDark);
}

function toggleElementMode(element, isDark) {
    if (isDark) {
        element.classList.remove('bg-light', 'text-dark');
        element.classList.add('bg-dark', 'text-light');
    } else {
        element.classList.remove('bg-dark', 'text-light');
        element.classList.add('bg-light', 'text-dark');
    }
}

function toggleDarkMode() {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    darkModeToggle.innerText = "Markdown Editor 🌙";
    body.classList.remove('bg-light', 'text-dark');
    body.classList.add('bg-dark', 'text-light');
    localStorage.setItem('darkMode', 'true');
    toggleElements(true);
}

function disableDarkMode() {
    darkModeToggle.innerText = "Markdown Editor ☀️";
    body.classList.remove('bg-dark', 'text-light');
    body.classList.add('bg-light', 'text-dark');
    localStorage.setItem('darkMode', 'false');
    toggleElements(false);
}

function stripHTMLtags(html) {
    let temp = document.createElement("div");
    temp.innerHTML = html;
    temp.querySelectorAll('img').forEach(img => {
        const altText = img.getAttribute('alt') || '';
        img.insertAdjacentText('afterend', altText); 
    });
    temp.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        heading.insertAdjacentText('beforeend', ' ');
    });
    return temp.textContent || temp.innerText || "";
}

function updateCounts() {
    const outputDiv = document.getElementById('html-output');
    const counterDiv = document.getElementById('counter');
    const htmlContent = outputDiv.innerHTML;
    const plainText = stripHTMLtags(htmlContent.replace(/<br\s*\/?>/gi, ' ')).trim();
    const words = plainText.split(/\s+/).filter(word => word.length > 0).length;
    const characters = plainText.length;
    counterDiv.textContent = `Words: ${words}, Characters: ${characters}`;
}

function MDListener() {
    document.getElementById('markdown-input').addEventListener('input', function() {
        const markdownText = this.value;
        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ markdown: markdownText })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('html-output').innerHTML = data.html;
            if (data.html.length === 0) {
                document.getElementById('html-output').innerHTML = "Your output is shown here.";
            }
            updateCounts();
        });
    });
}

function counterListener() {
    updateCounts();
    const textarea = document.getElementById('markdown-input');
    textarea.addEventListener('input', updateCounts);
}

function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      enableDarkMode();
    }
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

function modalListener() {
    const aboutModalToggle = document.getElementById('about-modal-toggle');
    const aboutModal = new bootstrap.Modal(document.getElementById('aboutModal'));

    aboutModalToggle.addEventListener('click', function(event) {
      event.preventDefault(); // not working
      aboutModal.show();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    MDListener();
    counterListener();
    modalListener();
    initDarkMode();
});