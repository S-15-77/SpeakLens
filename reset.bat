@echo off
cd /d "D:\Coding Project\SpeakLens"

echo Deleting old env...
rmdir /s /q env

echo Creating new Python 3.10 environment...
py -3.10 -m venv env

echo Activating env...
call env\Scripts\activate.bat

echo Upgrading pip...
python -m ensurepip --upgrade
python -m pip install --upgrade pip setuptools wheel

echo Installing dependencies...
python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
python -m pip install fastapi uvicorn[standard] transformers librosa soundfile pydub accelerate sentencepiece python-multipart scipy

echo Setup complete. Now run:
echo.
echo     uvicorn backend.main:app --reload
echo.
pause
