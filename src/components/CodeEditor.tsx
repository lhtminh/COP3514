"use client";

import { useEffect, useRef, useCallback } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  indentOnInput,
  indentUnit,
  codeFolding,
  foldGutter,
  foldEffect,
} from "@codemirror/language";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Find top-level { ... } blocks that are "provided" code (not user-editable).
 * A block is provided if it has no editable marker AND has substantial code.
 */
function findProvidedRanges(
  code: string
): Array<{ from: number; to: number }> {
  const results: Array<{ from: number; to: number }> = [];
  const editablePattern = /\/\/.*(?:your code|code here)/i;
  let depth = 0;
  let blockStart = -1;

  for (let i = 0; i < code.length; i++) {
    if (code[i] === "{") {
      if (depth === 0) blockStart = i;
      depth++;
    } else if (code[i] === "}") {
      depth--;
      if (depth === 0 && blockStart >= 0) {
        const body = code.slice(blockStart, i + 1);

        // Skip if contains an editable marker
        if (!editablePattern.test(body)) {
          // Count actual code lines (not comments, empty, or lone braces)
          let codeLines = 0;
          for (const line of body.split("\n")) {
            const t = line.trim();
            if (!t || t === "{" || t === "}" || t.startsWith("//")) continue;
            codeLines++;
          }

          if (codeLines > 2) {
            results.push({ from: blockStart + 1, to: i });
          }
        }

        blockStart = -1;
      }
    }
  }

  return results;
}

function applyAutoFolds(view: EditorView) {
  const code = view.state.doc.toString();
  const ranges = findProvidedRanges(code);
  if (ranges.length === 0) return;

  requestAnimationFrame(() => {
    try {
      view.dispatch({
        effects: ranges.map((r) => foldEffect.of({ from: r.from, to: r.to })),
      });

      // Scroll to the editable region
      const editableMatch = code.match(/\/\/.*(?:your code|code here)/i);
      if (editableMatch && editableMatch.index != null) {
        const pos = editableMatch.index;
        view.dispatch({
          selection: { anchor: pos },
          scrollIntoView: true,
        });
      }
    } catch {
      // view may have been destroyed
    }
  });
}

const baseTheme = EditorView.theme({
  "&": { height: "100%" },
  ".cm-content": {
    fontVariantLigatures: "none",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    borderRight: "none",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "rgba(128, 128, 128, 0.12)",
    border: "none",
    padding: "0 6px",
    borderRadius: "3px",
    color: "inherit",
    opacity: 0.6,
  },
});

export function CodeEditor({ value, onChange }: CodeEditorProps) {
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
      codeFolding({ placeholderText: "..." }),
      foldGutter(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      baseTheme,
      ...(isDark ? [oneDark] : []),
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
      indentUnit.of("    "),
      EditorState.tabSize.of(4),
    ],
    []
  );

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
    applyAutoFolds(view);

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme, createExtensions]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
      applyAutoFolds(view);
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-hidden"
    />
  );
}
