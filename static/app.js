// implement dark mode

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

function addMDListener() {
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

function addCounterListener() {
    const textarea = document.getElementById('markdown-input');
    textarea.addEventListener('input', updateCounts);
}

document.addEventListener("DOMContentLoaded", function() {
    addMDListener();
    addCounterListener();
});