"use client";

import { useEffect, useRef, useCallback } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, indentOnInput } from "@codemirror/language";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const lightTheme = EditorView.theme({
  "&": {
    height: "100%",
    fontSize: "14px",
  },
  ".cm-scroller": {
    fontFamily: "var(--font-geist-mono), monospace",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "1px solid var(--border)",
  },
});

const darkThemeOverride = EditorView.theme({
  "&": {
    height: "100%",
    fontSize: "14px",
  },
  ".cm-scroller": {
    fontFamily: "var(--font-geist-mono), monospace",
  },
});

export function CodeEditor({ value, onChange, className }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  const { resolvedTheme } = useTheme();

  onChangeRef.current = onChange;

  const createExtensions = useCallback(
    (isDark: boolean) => [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      history(),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      indentOnInput(),
      cpp(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      ...(isDark ? [oneDark, darkThemeOverride] : [lightTheme]),
      keymap.of([
        ...defaultKeymap,
        ...historyKeymap,
        ...closeBracketsKeymap,
        indentWithTab,
      ]),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current(update.state.doc.toString());
        }
      }),
      EditorView.lineWrapping,
      EditorState.tabSize.of(4),
    ],
    []
  );

  // Create editor
  useEffect(() => {
    if (!containerRef.current) return;

    const isDark = resolvedTheme === "dark";
    const state = EditorState.create({
      doc: value,
      extensions: createExtensions(isDark),
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
    // Only recreate on theme change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme, createExtensions]);

  // Sync external value changes
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: "100%", overflow: "hidden" }}
    />
  );
}
