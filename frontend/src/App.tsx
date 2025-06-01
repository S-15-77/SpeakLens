import React from "react";
import "./App.css";
import AudioRecorder from "./components/AudioRecorder";

function App() {
  return (
    <div className="App" style={{ padding: "2rem", maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🎙️ SpeakLens: AI Meeting Assistant</h1>
      <AudioRecorder />
    </div>
  );
}

export default App;
