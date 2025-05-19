import React from "react";
import "./App.css";
import AudioRecorder from "./components/AudioRecorder";

function App() {
  return (
    <div className="App">
      <h1>🎙️ SpeakLens: AI Meeting Assistant</h1>
      <AudioRecorder />
    </div>
  );
}

export default App;
