import torch
from torchaudio import save as save_audio_file

# Load Silero VAD from PyTorch Hub
model, utils = torch.hub.load(repo_or_dir='snakers4/silero-vad', model='silero_vad', trust_repo=True)
(get_speech_timestamps, save_audio, read_audio, VADIterator, collect_chunks) = utils

def trim_silence(input_path: str, output_path: str = None) -> str:
    if output_path is None:
        output_path = input_path.replace(".wav", "_trimmed.wav")

    # Read and preprocess audio
    wav = read_audio(input_path, sampling_rate=16000)
    speech_timestamps = get_speech_timestamps(wav, model, sampling_rate=16000)

    print("🟢 VAD detected speech at:")
    for ts in speech_timestamps:
        print(f"    - From {ts['start']} to {ts['end']}")
    if not speech_timestamps:
        raise ValueError("❌ No speech detected in audio.")

    speech_wav = collect_chunks(speech_timestamps, wav)
    save_audio_file(output_path, speech_wav.unsqueeze(0), 16000)

    return output_path

