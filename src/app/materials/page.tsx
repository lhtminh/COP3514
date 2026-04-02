"use client";

import { useEffect, useState, useCallback } from "react";
import type { Material } from "@/lib/types";
import { MaterialUploader } from "@/components/MaterialUploader";
import { MaterialViewer } from "@/components/MaterialViewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <h1 className="text-2xl font-bold mb-6">Materials Library</h1>

      <MaterialUploader onUploaded={loadMaterials} />

      <div className="mt-6">
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : materials.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <p>No materials uploaded yet.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {materials.map((mat) => (
              <Card key={mat.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xs font-bold uppercase">
                      {mat.type}
                    </div>
                    <div>
                      <p className="font-medium">{mat.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded {new Date(mat.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{mat.type.toUpperCase()}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMaterial(mat)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(mat.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <MaterialViewer
        material={viewMaterial}
        open={!!viewMaterial}
        onClose={() => setViewMaterial(null)}
      />
    </div>
  );
}
