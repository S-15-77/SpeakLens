# backend/models/asr_model.py

import torchaudio
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
import torch
import librosa
import math

class ASRModel:
    def __init__(self):
        self.processor = AutoProcessor.from_pretrained("openai/whisper-small")
        self.model = AutoModelForSpeechSeq2Seq.from_pretrained("openai/whisper-small")
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)

    def transcribe(self, audio_path):
        print(f"🎧 Loading {audio_path} with librosa")
        y, sr = librosa.load(audio_path, sr=16000)

        chunk_duration = 30  # seconds
        chunk_size = chunk_duration * sr
        total_chunks = math.ceil(len(y) / chunk_size)

        transcript = ""

        for i in range(total_chunks):
            start = i * chunk_size
            end = start + chunk_size
            y_chunk = y[start:end]

            inputs = self.processor(
                y_chunk, sampling_rate=16000, return_tensors="pt"
            ).to(self.device)

            with torch.no_grad():
                generated_ids = self.model.generate(inputs["input_features"])
                chunk_text = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
                transcript += chunk_text + " "

        print("✅ Full transcript length:", len(transcript))
        return transcript.strip()

