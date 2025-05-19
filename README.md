# 🎙️ SpeakLens – AI-Powered Multimodal Meeting Assistant

SpeakLens is a real-time AI assistant designed to enhance video meetings on platforms like Zoom, Google Meet, and Microsoft Teams. It transcribes conversations, identifies speakers, extracts insights, and visualizes meeting intelligence — all in one powerful dashboard.

---

## 🚀 Features

- **📝 Real-Time Transcription**  
  Converts spoken words to text using state-of-the-art STT models.

- **🗣️ Speaker Diarization**  
  Identifies who is speaking using Voice Activity Detection (VAD) and segmentation.

- **📋 Intelligent Summarization & QA**  
  Extracts key points, decisions, and action items using transformer-based NLP models.

- **🎭 Sentiment & Emotion Analysis**  
  Detects emotional tone using both audio and text-based classification.

- **📊 Interactive Dashboard**  
  Displays highlights, action items, and emotional trends in an easy-to-use interface.

---

## 🧰 Tech Stack

| Layer                | Technology                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Frontend**         | React + TypeScript, Tailwind CSS                                            |
| **Audio Handling**   | WebRTC / MediaRecorder API (in-browser recording & streaming)               |
| **Backend API**      | Python + FastAPI                                                            |
| **Worker Services**  | Go (for VAD, segmentation, and Redis queue consumers)                       |
| **Model Serving**    | Hugging Face Inference API or local deployment using `transformers` + `torch` |
| **Storage**          | PostgreSQL (logs, metadata), Redis (task queues), MinIO or AWS S3 (audio)   |
| **Deployment**       | Docker + Fly.io / Railway / Render                                          |

---
