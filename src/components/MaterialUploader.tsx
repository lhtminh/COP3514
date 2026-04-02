"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MaterialUploaderProps {
  onUploaded: () => void;
}

export function MaterialUploader({ onUploaded }: MaterialUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "pptx") {
      setError("Only PDF and PPTX files are supported");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/materials", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      onUploaded();
    } catch (err) {
      setError(String(err));
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <Card
        className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.pptx"
          onChange={handleFileChange}
          className="hidden"
        />
        {uploading ? (
          <p className="text-muted-foreground">Uploading...</p>
        ) : (
          <>
            <p className="text-muted-foreground mb-1">
              Drop a PDF or PPTX file here, or click to browse
            </p>
            <Button variant="outline" size="sm" type="button">
              Choose File
            </Button>
          </>
        )}
      </Card>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
