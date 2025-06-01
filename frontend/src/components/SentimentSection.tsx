import React from "react";
import { Button } from "./ui/button";
import { Brain, Loader2 } from "lucide-react";

interface SentimentSectionProps {
  transcript: string;
  sentiment: string;
  sentimentLoading: boolean;
  onSentimentAnalyze: () => void;
}

const SentimentSection: React.FC<SentimentSectionProps> = ({
  transcript,
  sentiment,
  sentimentLoading,
  onSentimentAnalyze,
}) => {
  if (!transcript.trim()) return null;

  return (
    <div className="mt-8">
      <Button onClick={onSentimentAnalyze} className="flex items-center gap-2">
        <Brain size={18} /> 🧠 Analyze Sentiment
      </Button>

      {sentimentLoading && (
        <div className="mt-4 flex items-center gap-2 text-pink-600">
          <Loader2 className="animate-spin" size={18} />
          <p>Analyzing sentiment...</p>
        </div>
      )}

      {!sentimentLoading && sentiment && (
        <div className="mt-4 bg-pink-50 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <Brain size={18} /> Sentiment
          </h3>
          <p className="text-sm leading-relaxed">{sentiment}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentSection;