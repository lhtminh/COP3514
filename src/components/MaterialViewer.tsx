"use client";

import type { Material } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MaterialViewerProps {
  material: Material | null;
  open: boolean;
  onClose: () => void;
}

export function MaterialViewer({ material, open, onClose }: MaterialViewerProps) {
  if (!material) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{material.filename}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-hidden">
          {material.type === "pdf" ? (
            <iframe
              src={`/api/materials/${material.id}/content`}
              className="w-full h-full rounded-md border"
              title={material.filename}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <p className="mb-2">PPTX preview not available in browser</p>
                <a
                  href={`/api/materials/${material.id}/content`}
                  download={material.filename}
                  className="text-primary underline"
                >
                  Download file
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
