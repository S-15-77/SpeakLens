# backend/models/utils.py
from pydub import AudioSegment
import os

def convert_webm_to_wav(input_path: str, output_path: str = None) -> str:
    if output_path is None:
        output_path = input_path.rsplit(".", 1)[0] + ".wav"

    print(f"🔄 Converting {input_path} → {output_path}")
    try:
        audio = AudioSegment.from_file(input_path, format="webm")
        audio = audio.set_channels(1).set_frame_rate(16000)
        audio.export(output_path, format="wav")
    except Exception as e:
        raise RuntimeError(f"WebM → WAV conversion failed: {e}")

    return output_path
