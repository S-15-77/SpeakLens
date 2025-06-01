
import joblib

class SentimentModel:
    def __init__(self):
        self.vectorizer = joblib.load("backend\models\Sentiment_analysis\save_model\sentiment_vectorizer.pkl")
        self.model = joblib.load("backend\models\Sentiment_analysis\save_model\ssentiment_model.pkl")

    def predict(self, text: str) -> str:
        vec = self.vectorizer.transform([text])
        return self.model.predict(vec)[0]
