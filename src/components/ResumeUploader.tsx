"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";

interface ResumeUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

export default function ResumeUploader({
  onFileSelect,
  selectedFile,
}: ResumeUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        setError("Please upload a PDF or DOCX file under 10MB.");
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  if (selectedFile) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-green-800 truncate">
            {selectedFile.name}
          </p>
          <p className="text-xs text-green-600">
            {(selectedFile.size / 1024).toFixed(0)} KB
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFileSelect(null as any);
          }}
          className="p-1 hover:bg-green-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-green-600" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-brand-500 bg-brand-50/50"
            : "border-gray-200 hover:border-brand-300 hover:bg-gray-50/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
            {isDragActive ? (
              <FileText className="w-6 h-6 text-brand-600" />
            ) : (
              <Upload className="w-6 h-6 text-brand-600" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {isDragActive
                ? "Drop your resume here"
                : "Drag & drop your resume, or click to browse"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF or DOCX, up to 10MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
