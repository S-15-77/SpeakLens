from transformers import pipeline

class Summerizer:
    def __init__(self):
        self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        # self.summarizer.model.to("cuda" if torch.cuda.is_available() else "cpu")
        # self.summarizer.tokenizer.to("cuda" if torch.cuda.is_available() else "cpu")
    def summarize(self, text: str) -> str:
        if(len(text.split())<40):
            return "Text is too short to summarize"
        summary = self.summarizer(text, max_length=130, min_length=30, do_sample=False)
        return summary[0]['summary_text']