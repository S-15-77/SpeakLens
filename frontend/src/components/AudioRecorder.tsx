import React, { useState, useRef } from "react";
import axios from "axios";

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Start recording from mic
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      await transcribeAudio(formData);
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  // Stop recording from mic
  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  // Upload audio file from input
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await transcribeAudio(formData);
  };

  // Shared transcription logic
  const transcribeAudio = async (formData: FormData) => {
    try {
      setLoading(true);
      setTranscript("");
      const res = await axios.post("http://127.0.0.1:8000/transcribe", formData);
      console.log("Transcription response:", res.data);
      setTranscript(res.data.transcript || res.data.error || "No transcript received.");
    } catch (error) {
      console.error("Error during transcription:", error);
      setTranscript("❌ Error: Failed to transcribe audio.");
    } finally {
      setLoading(false);
      audioChunks.current = [];
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      {/* 🎙️ Record Button */}
      <button onClick={recording ? stopRecording : startRecording} style={{ padding: "0.5rem 1rem" }}>
        {recording ? "🛑 Stop Recording" : "🎙️ Start Recording"}
      </button>

      {/* 📂 Upload Button */}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        style={{ marginTop: "1rem", display: "block" }}
      />

      {/* 📝 Transcript Output */}
      <div style={{ marginTop: "1rem" }}>
        {loading && <p>⏳ Transcribing...</p>}
        {!loading && transcript && (
          <>
            <h3>📝 Transcript</h3>
            <div style={{ background: "#f2f2f2", padding: "1rem", borderRadius: "8px" }}>
              <p>{transcript}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
