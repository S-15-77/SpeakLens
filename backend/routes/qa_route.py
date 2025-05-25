# backend/routes/qa_route.py

from fastapi import APIRouter, Body
from backend.models.qa import QuestionAnswerModel

router = APIRouter()
qa_model = QuestionAnswerModel()

@router.post("/answer")
async def get_answer(payload: dict = Body(...)):
    question = payload.get("question")
    transcript = payload.get("transcript") or payload.get("content")  # support both keys
    
    if not question or not transcript:
        return {"error": "Missing question or transcript."}
    
    try:
        print(transcript)
        print(question)
        answer = qa_model.answer(content= transcript['content'],question= question['question'])
        print(answer)
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}
