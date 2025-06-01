import React from "react";
import { Bot, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface QASectionProps {
  transcript: string;
  question: string;
  answer: string;
  qaLoading: boolean;
  onQuestionChange: (val: string) => void;
  onQuestionSubmit: () => void;
}

const QuestionAnswerSection: React.FC<QASectionProps> = ({
  transcript,
  question,
  answer,
  qaLoading,
  onQuestionChange,
  onQuestionSubmit,
}) => {
  if (!transcript.trim()) return null;

  return (
    <div className="mt-10">
      <h3 className="flex items-center gap-2 font-semibold text-lg">
        <MessageSquare size={18} /> Ask a Question
      </h3>
      <div className="flex items-center gap-2 mt-2">
        <Input
          type="text"
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder="Type your question here"
        />
        <Button onClick={onQuestionSubmit}>Send</Button>
      </div>

      {qaLoading && (
        <div className="mt-4 flex items-center gap-2 text-yellow-600">
          <Loader2 className="animate-spin" size={18} />
          <p>Answering...</p>
        </div>
      )}

      {!qaLoading && answer && (
        <div className="mt-4 bg-yellow-50 p-4 rounded-xl shadow-sm">
          <h4 className="font-semibold flex items-center gap-2 mb-2">
            <Bot size={18} /> Answer
          </h4>
          <p className="text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerSection;
