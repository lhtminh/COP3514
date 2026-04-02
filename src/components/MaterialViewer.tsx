"use client";

import type { Material } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaterialViewerProps {
  material: Material | null;
  open: boolean;
  onClose: () => void;
}

export function MaterialViewer({
  material,
  open,
  onClose,
}: MaterialViewerProps) {
  if (!material) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{material.filename}</DialogTitle>
            <Badge variant="outline" className="text-[10px]">
              {material.type.toUpperCase()}
            </Badge>
          </div>
          <DialogDescription>
            Uploaded {new Date(material.uploadedAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-hidden">
          {material.type === "pdf" ? (
            <iframe
              src={`/api/materials/${material.id}/content`}
              className="w-full h-full rounded-lg border"
              title={material.filename}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
              <p className="text-sm">PPTX preview not available in browser</p>
              <a
                href={`/api/materials/${material.id}/content`}
                download={material.filename}
              >
                <Button variant="outline" size="sm">
                  <DownloadIcon data-icon="inline-start" />
                  Download file
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
