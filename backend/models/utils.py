from pydub import AudioSegment

def convert_webm_to_wav(inp_path: str,op_path: str):
    """
    Convert a .webm file to .wav format using pydub.
    
    Args:
        inp_path (str): Path to the input .webm file.
        op_path (str): Path to save the output .wav file.
    """
    audio = AudioSegment.from_file(inp_path, format="webm")
    audio.export(op_path, format="wav")