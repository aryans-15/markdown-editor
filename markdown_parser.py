import re

class MarkdownParser:
    def __init__(self, text):
        # make this cleaner in the future
        self.text = text + ("\n" if len(text) != 0 else "")

    def convert_headers(self):
        self.text = re.sub(r'###### (.*?)\n', r'<h6>\1</h6>\n', self.text)
        self.text = re.sub(r'##### (.*?)\n', r'<h5>\1</h5>\n', self.text)
        self.text = re.sub(r'#### (.*?)\n', r'<h4>\1</h4>\n', self.text)
        self.text = re.sub(r'### (.*?)\n', r'<h3>\1</h3>\n', self.text)
        self.text = re.sub(r'## (.*?)\n', r'<h2>\1</h2>\n', self.text)
        self.text = re.sub(r'# (.*?)\n', r'<h1>\1</h1>\n', self.text)

    def convert_bold(self):
        self.text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', self.text)
        self.text = re.sub(r'__(.*?)__', r'<strong>\1</strong>', self.text)

    def convert_italic(self):
        self.text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', self.text)
        self.text = re.sub(r'_(.*?)_', r'<em>\1</em>', self.text)

    def convert_strikethrough(self):
        self.text = re.sub(r'~~(.*?)~~', r'<del>\1</del>', self.text)

    def convert_links(self):
        self.text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', self.text)

    def convert_blockquotes(self):
        self.text = re.sub(r'^>(.*)$', r'<blockquote>\1</blockquote>', self.text, flags=re.MULTILINE)

    def convert_linebreaks(self):
        self.text = re.sub(r'\n', r'<br>', self.text)

    def to_html(self):
        self.convert_headers()
        self.convert_bold()
        self.convert_italic()
        self.convert_strikethrough()
        self.convert_links()
        self.convert_blockquotes()
        self.convert_linebreaks()
        return self.text
