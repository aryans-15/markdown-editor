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

    def to_html(self):
        self.convert_headers()
        return self.text
