// implement dark mode here
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
        if (data.html.length === 0) document.getElementById('html-output').innerHTML ="Your output goes here...";
    });
});