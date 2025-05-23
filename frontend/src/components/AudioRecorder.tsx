import React, { useState, useRef } from "react";
import axios from "axios";
import RecordRTC from "recordrtc";

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const recorderRef = useRef<any>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new RecordRTC(stream, {
      type: "audio",
      mimeType: "audio/wav", // real WAV format
      recorderType: RecordRTC.StereoAudioRecorder,
      desiredSampRate: 16000, // Whisper prefers 16kHz
      numberOfAudioChannels: 1,
    });

    recorder.startRecording();
    recorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = async () => {
    const recorder = recorderRef.current;
    if (!recorder) return;

    recorder.stopRecording(async () => {
      const audioBlob = recorder.getBlob();

      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");
      await transcribeAudio(formData);

      setRecording(false);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    await transcribeAudio(formData);
  };

  const transcribeAudio = async (formData: FormData) => {
    try {
      setLoading(true);
      setTranscript("");
      const res = await axios.post("http://127.0.0.1:8000/transcribe", formData);
      setTranscript(res.data.transcript || res.data.error || "No transcript received.");
    } catch (err) {
      console.error("Transcription failed:", err);
      setTranscript("❌ Error during transcription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <button onClick={recording ? stopRecording : startRecording} style={{ padding: "0.5rem 1rem" }}>
        {recording ? "🛑 Stop Recording" : "🎙️ Start Recording"}
      </button>

      <input type="file" accept="audio/*" onChange={handleFileUpload} style={{ marginTop: "1rem", display: "block" }} />

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
