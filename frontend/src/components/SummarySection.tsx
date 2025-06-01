import React from "react";
import { Loader2, FileText } from "lucide-react";
import { Button } from "./ui/button";

interface SummarySectionProps {
  transcript: string;
  summary: string;
  summaryLoading: boolean;
  onSummarize: () => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  transcript,
  summary,
  summaryLoading,
  onSummarize,
}) => {
  if (!transcript.trim()) return null;

  return (
    <div className="mt-8">
      <Button onClick={onSummarize} className="flex items-center gap-2">
        <FileText size={18} /> 📄 Summarize
      </Button>

      {summaryLoading && (
        <div className="mt-4 flex items-center gap-2 text-blue-600">
          <Loader2 className="animate-spin" size={18} />
          <p>Summarizing...</p>
        </div>
      )}

      {!summaryLoading && summary && (
        <div className="mt-4 bg-blue-50 p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <FileText size={18} /> 🔍 Summary
          </h3>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarySection;
