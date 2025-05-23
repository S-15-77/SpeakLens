from fastapi import APIRouter, UploadFile, File
from backend.models.asr_model import ASRModel
from backend.models.utils import convert_webm_to_wav
from backend.models.vad_utils import trim_silence
import os
import shutil

router = APIRouter()
asr_model = ASRModel()  

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    os.makedirs("data", exist_ok=True)
    input_path = f"data/{file.filename}"
    
    with open(input_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    try:
        # Convert if it's a webm file
        if input_path.endswith(".webm"):
            input_path = convert_webm_to_wav(input_path)
        if input_path.endswith(".wav"):
            input_path = trim_silence(input_path)
        transcript = asr_model.transcribe(input_path)
    except Exception as e:
        return {"error": str(e)}
    finally:
        # Clean up
        if os.path.exists(input_path):
            os.remove(input_path)

    return {"transcript": transcript}


