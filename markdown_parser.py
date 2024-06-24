import re
# add escape characters soon
class MarkdownParser:
    def __init__(self, text):
        self.text = text + ("\n" if len(text) != 0 else "")

    def convert_headers(self):
        self.text = re.sub(r'###### (.*?)\n', r'<h6>\1</h6>', self.text)
        self.text = re.sub(r'##### (.*?)\n', r'<h5>\1</h5>', self.text)
        self.text = re.sub(r'#### (.*?)\n', r'<h4>\1</h4>', self.text)
        self.text = re.sub(r'### (.*?)\n', r'<h3>\1</h3>', self.text)
        self.text = re.sub(r'## (.*?)\n', r'<h2>\1</h2>', self.text)
        self.text = re.sub(r'# (.*?)\n', r'<h1>\1</h1>', self.text)

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

    def convert_linked_images(self):
        self.text = re.sub(r'!\[(.*?)\]\((.*?)\)', r'<img src="\2" alt="\1">', self.text)

    # to be done: fix issue with heading then blockquote
    def convert_blockquotes(self):
        self.text = re.sub(r'^>(.*?)\n', r'<blockquote>\1</blockquote>\n', self.text, flags=re.MULTILINE | re.DOTALL)

    # line breaks are a bit iffy
    def convert_linebreaks(self):
        self.text = re.sub(r'\n', r'<br>', self.text)
        self.text = re.sub(r' \n{2,}', r'<br>', self.text)

    def convert_lists(self):
        self.text = re.sub(r'^( *)- (.*)$', r'\1<li>\2</li>', self.text, flags=re.MULTILINE)
        self.text = re.sub(r'(<li>.*</li>)', r'<ul>\n\1\n</ul>', self.text, flags=re.DOTALL)

    def to_html(self):
        self.convert_headers()
        self.convert_bold()
        self.convert_italic()
        self.convert_strikethrough()
        self.convert_linked_images()
        self.convert_links()
        self.convert_blockquotes()
        self.convert_linebreaks()
        self.convert_lists()
        return self.text