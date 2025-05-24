# backend/models/asr_model.py

import torchaudio
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
import torch
import librosa

class ASRModel:
    def __init__(self):
        self.processor = AutoProcessor.from_pretrained("openai/whisper-small")
        self.model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-small")
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)

    def transcribe(self, audio_path):
        print(f"🎧 Loading {audio_path} with librosa")
        y, sr = librosa.load(audio_path, sr=16000)

        inputs = self.processor(
            y, sampling_rate=16000, return_tensors="pt"
        ).to(self.device)

        with torch.no_grad():
            generated_ids = self.model.generate(inputs["input_features"])
            transcription = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
        
        return transcription

