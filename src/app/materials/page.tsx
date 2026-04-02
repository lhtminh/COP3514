"use client";

import { useEffect, useState, useCallback } from "react";
import type { Material } from "@/lib/types";
import { MaterialUploader } from "@/components/MaterialUploader";
import { MaterialViewer } from "@/components/MaterialViewer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, Trash2Icon, FileIcon } from "lucide-react";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMaterial, setViewMaterial] = useState<Material | null>(null);

  const loadMaterials = useCallback(() => {
    fetch("/api/materials")
      .then((r) => r.json())
      .then(setMaterials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this material?")) return;
    await fetch(`/api/materials/${id}`, { method: "DELETE" });
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Materials Library</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Upload PDF and PPTX files for reference
        </p>
      </div>

      <MaterialUploader onUploaded={loadMaterials} />

      <Separator className="my-6" />

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-md" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : materials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
            <FileIcon className="size-10 text-muted-foreground/30" />
            <CardDescription>No materials uploaded yet.</CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {materials.map((mat) => (
            <Card key={mat.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-md bg-muted text-[10px] font-bold uppercase text-muted-foreground">
                    {mat.type}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">{mat.filename}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(mat.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {mat.type.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setViewMaterial(mat)}
                  >
                    <EyeIcon />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(mat.id)}
                  >
                    <Trash2Icon className="text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <MaterialViewer
        material={viewMaterial}
        open={!!viewMaterial}
        onClose={() => setViewMaterial(null)}
      />
    </div>
  );
}
