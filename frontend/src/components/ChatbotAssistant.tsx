import React, { useState } from "react";
import { SendHorizonal, Bot } from "lucide-react";
import { Button } from "./ui/button";

interface ChatbotAssistantProps {
  transcript: string;
}

const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({ transcript }) => {
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    setChatLog((prev) => [...prev, `🧑‍💻: ${chatInput}`]);

    try {
      const res = await fetch("http://127.0.0.1:8000/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: { question: chatInput },
          content: { content: transcript },
        }),
      });

      const data = await res.json();
      const reply = data.answer || data.error || "No answer";
      setChatLog((prev) => [...prev, `🤖: ${reply}`]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setChatLog((prev) => [...prev, "❌ Error fetching response"]);
    } finally {
      setChatInput("");
      setLoading(false);
    }
  };

  if (!transcript.trim()) return null;

  return (
    <div className="mt-10 p-4 border rounded-xl shadow-md bg-white">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <Bot size={20} /> AI Chat Assistant
      </h3>
      <div className="max-h-60 overflow-y-auto text-sm space-y-2 mb-4 bg-gray-50 p-2 rounded-md">
        {chatLog.map((msg, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
          placeholder="Ask me anything about the transcript..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} disabled={loading} className="px-3 py-1">
          <SendHorizonal size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatbotAssistant;
