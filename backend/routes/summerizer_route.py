from fastapi import APIRouter, Body
from backend.models.summerizer_model import Summerizer

router = APIRouter()
summarizer_model = Summerizer()

@router.post("/summarize")
async def summarize_text(text: str = Body(..., embed=True)):
    try:
        summary = summarizer_model.summarize(text)
    except Exception as e:
        return {"error": str(e)}

    return {"summary": summary}