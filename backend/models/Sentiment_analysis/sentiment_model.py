
import joblib

class SentimentModel:
    def __init__(self):
        self.vectorizer = joblib.load("save_model\sentiment_vectorizer.pkl")
        self.model = joblib.load("save_model\ssentiment_model.pkl")

    def predict(self, text: str) -> str:
        vec = self.vectorizer.transform([text])
        return self.model.predict(vec)[0]
