import { FileText } from "lucide-react";
import React from "react";

interface TranscriptSectionProps {
  transcript: string;
  loading: boolean;
}

const TranscriptSection: React.FC<TranscriptSectionProps> = ({ transcript, loading }) => {
  if (loading) return <p className="text-blue-500 font-medium">⏳ Transcribing...</p>;
  if (!transcript) return null;

  return (
    <div className="mt-8">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-2">
        <FileText className="mr-2 text-blue-600" /> Transcript
      </h2>
      <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-base leading-relaxed shadow-sm">
        {transcript}
      </div>
    </div>
  );
};

export default TranscriptSection;