"use client";

import { useCallback, useRef } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: string;
  fontSize: number;
}

export function CodeEditor({ code, onChange, language, fontSize }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd } = textarea;

      if (e.key === "Tab") {
        e.preventDefault();
        const before = code.slice(0, selectionStart);
        const after = code.slice(selectionEnd);
        const newCode = before + "  " + after;
        onChange(newCode);

        requestAnimationFrame(() => {
          textarea.selectionStart = selectionStart + 2;
          textarea.selectionEnd = selectionStart + 2;
        });
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const before = code.slice(0, selectionStart);
        const after = code.slice(selectionEnd);
        const currentLine = before.split("\n").pop() || "";
        const indentMatch = currentLine.match(/^(\s*)/);
        const indent = indentMatch ? indentMatch[1] : "";

        const lastChar = before.trimEnd().slice(-1);
        const extraIndent = ["{", "(", "[", ":"].includes(lastChar) ? "  " : "";

        const newCode = before + "\n" + indent + extraIndent + after;
        onChange(newCode);

        const newPos = selectionStart + 1 + indent.length + extraIndent.length;
        requestAnimationFrame(() => {
          textarea.selectionStart = newPos;
          textarea.selectionEnd = newPos;
        });
      }
    },
    [code, onChange]
  );

  const lineCount = code.split("\n").length;

  return (
    <div className="relative bg-[#141414]">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
        <div className="text-xs text-zinc-500 font-mono uppercase tracking-wide">
          Editor
        </div>
        <div className="ml-auto text-xs text-zinc-600 font-mono">
          {language} | {lineCount} lines | {code.length} chars
        </div>
      </div>
      <div className="flex">
        <div
          className="select-none text-right pr-3 pl-4 py-4 text-zinc-600 font-mono"
          style={{ fontSize: fontSize - 1 }}
          aria-hidden="true"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-1 bg-transparent text-zinc-200 font-mono resize-none p-4 pl-0 leading-6 scrollbar-thin min-h-[200px]"
          style={{ fontSize, tabSize: 2 }}
        />
      </div>
    </div>
  );
}
