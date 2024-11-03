"use client";
import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState, useRef } from "react";

// Define the props type
interface FileUploadProps {
  name: string;
  label: string;
  placeHolder: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  placeHolder,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Validating the file");
      validateFile(file);
    }
  };

  const validateFile = (file: File) => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    if (file.type !== "text/csv") {
      setError("Only CSV files are allowed.");
      setSelectedFile(null);
      return;
    }

    if (file.size === 0) {
      setError("File cannot be empty.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  return (
    <div
      onDrop={handleDrop}
      onClick={() => {
        inputRef.current?.click(); // Trigger file input click
      }}
      onDragOver={(e) => e.preventDefault()}
      className="w-full bg-card border-dashed rounded-lg border flex justify-center items-center h-[200px] cursor-pointer"
    >
      <FormField
        name={name}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="w-full h-full cursor-pointer">
                {label}
              </FormLabel>
              <FormControl>
                {/* Ensure file selection works */}
                <Input
                  type="file" 
                  accept=".csv" 
                  className="hidden"
                  {...field}
                  ref={inputRef} 
                  onChange={handleFileSelect}
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default FileUpload;
