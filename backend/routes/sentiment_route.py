from fastapi import APIRouter,Body
from backend.models.Sentiment_analysis.sentiment_model import SentimentModel

router = APIRouter()
model = SentimentModel()

@router.post("/sentiment")
async def get_sentiment(text: str = Body(..., embed=True)):
    try:
        sentiment = model.predict(text)
        return {"sentiment": sentiment}
    except Exception as e:
        return {"error": str(e)}