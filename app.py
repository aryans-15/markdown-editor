from flask import Flask, request, jsonify, render_template
from markdown_parser import MarkdownParser

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    markdown_text = data.get('markdown', '')
    parser = MarkdownParser(markdown_text)
    html_output = parser.to_html()
    return jsonify({'html': html_output})

if __name__ == '__main__':
    app.run(debug=True)
