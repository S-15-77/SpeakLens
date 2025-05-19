from fastapi import APIRouter, UploadFile, File
from backend.models.asr_model import ASRModel
from backend.models.utils import convert_webm_to_wav
import os
import shutil

router = APIRouter()
asr_model = ASRModel()

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    os.makedirs("data", exist_ok=True)
    file_path = f"data/{file.filename}"

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    try:
        text = asr_model.transcribe(file_path)
    except Exception as e:
        return {"error": str(e)}
    finally:
        os.remove(file_path)

    return {"transcript": text}


