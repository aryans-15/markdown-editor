# to be done in future: write parser myself
import markdown

class MarkdownParser:
    def __init__(self, text):
        self.text = text

    def to_html(self):
        return markdown.markdown(self.text)