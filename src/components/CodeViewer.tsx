"use client";

import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "next-themes";

interface CodeViewerProps {
  code: string;
}

const baseTheme = EditorView.theme({
  "&": { height: "auto" },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "none",
  },
  ".cm-content": {
    padding: "12px 0",
  },
  ".cm-scroller": {
    overflow: "auto",
  },
});

export function CodeViewer({ code }: CodeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    const isDark = resolvedTheme === "dark";
    const state = EditorState.create({
      doc: code,
      extensions: [
        lineNumbers(),
        cpp(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        baseTheme,
        ...(isDark ? [oneDark] : []),
        EditorState.readOnly.of(true),
        EditorView.editable.of(false),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [code, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="rounded-lg border overflow-hidden"
    />
  );
}
