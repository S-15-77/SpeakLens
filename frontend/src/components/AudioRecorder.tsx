import React, { useState, useRef } from "react";
import axios from "axios";
import RecordRTC from "recordrtc";

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [question,setQuestion] = useState("");
  const [answer,setAnswer] = useState("");
  const [qaLoading, setQaLoading] = useState(false);
  const recorderRef = useRef<any>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new RecordRTC(stream, {
      type: "audio",
      mimeType: "audio/wav",
      recorderType: RecordRTC.StereoAudioRecorder,
      desiredSampRate: 16000,
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
      setSummary("");
      const res = await axios.post("http://127.0.0.1:8000/transcribe", formData);
      setTranscript(res.data.transcript || res.data.error || "No transcript received.");
    } catch (error) {
      console.error("Transcription failed:", error);
      setTranscript("❌ Error: Failed to transcribe audio.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!transcript.trim()) {
      setSummary("⚠️ No transcript available to summarize.");
      return;
    }

    try {
      setSummaryLoading(true);
      setSummary("");
      const res = await axios.post("http://127.0.0.1:8000/summarize", {
        text: transcript,
      });
      setSummary(res.data.summary || res.data.error || "No summary returned.");
    } catch (err) {
      console.error("Summarization failed:", err);
      setSummary("❌ Error generating summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleQuestionsubmit = async()=>{
    if(!question.trim() || !transcript.trim()){
      setAnswer("Enter a question or Transript is empty");
      return;
    }
    try{
      setQaLoading(true);
      setAnswer("");

      const res =  await axios.post("http://127.0.0.1:8000/answer",{question: { question: question },
  content: { content: transcript },});
      setAnswer(res.data.answer || res.data.error || "No answer");

    }
    catch(err){
      console.log("QA Error:",err);
      setAnswer("❌ Error generating answer.");
      
    }finally{
      setQaLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      {/* <h2>🎧 SpeakLens: Real-Time Meeting Assistant</h2> */}

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
      <div style={{ marginTop: "1.5rem" }}>
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

      {/* 📄 Summarization Section */}
      {transcript && (
        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={handleSummarize} style={{ padding: "0.5rem 1rem" }}>
            📄 Summarize
          </button>

          {summaryLoading && <p>⏳ Summarizing...</p>}
          {!summaryLoading && summary && (
            <>
              <h3>🔍 Summary</h3>
              <div style={{ background: "#e6f7ff", padding: "1rem", borderRadius: "8px" }}>
                <p>{summary}</p>
              </div>
            </>
          )}
        </div>
      )}

      {/*Question answer Section */}
      {transcript && (
        <div style={{marginTop : "2rem"}}>
        <h3>❓ Ask a Question</h3>
        <input
        type ="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question here"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" ,borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button onClick={handleQuestionsubmit} style={{ padding: "0.5rem 1rem", marginBottom: "1rem" }}>Send</button>
        {qaLoading && <p>⏳ Answering...</p>}
        {!qaLoading && answer && (
          <div
          style ={{background : "#fff8dc",marginTop:"1rem",padding: "1rem", borderRadius: "8px"}}
          >
            <strong>Answer : </strong><p>{answer}</p>
          </div>
        )}
        
        
        </div>
      )

      }

    </div>
  );
};

export default AudioRecorder;
