"use client";

import { useState, useRef, useCallback } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { SnapshotPreview } from "@/components/SnapshotPreview";
import { Controls } from "@/components/Controls";
import { themes } from "@/lib/themes";

const DEFAULT_CODE = `function fibonacci(n: number): number {
  if (n <= 1) return n;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

console.log(fibonacci(10)); // 55`;

export default function Home() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("typescript");
  const [theme, setTheme] = useState("dracula");
  const [background, setBackground] = useState("gradient-candy");
  const [padding, setPadding] = useState(48);
  const [fontSize, setFontSize] = useState(14);
  const [borderRadius, setBorderRadius] = useState(12);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [title, setTitle] = useState("fibonacci.ts");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const el = previewRef.current;
      const rect = el.getBoundingClientRect();
      const scale = 2;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      ctx.scale(scale, scale);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const data = new XMLSerializer().serializeToString(el);
      const svgBlob = new Blob(
        [
          `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml">${data}</div>
            </foreignObject>
          </svg>`,
        ],
        { type: "image/svg+xml" }
      );

      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.download = `snapcode-${Date.now()}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  const currentTheme = themes[theme as keyof typeof themes] ?? themes.dracula;

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center font-bold text-sm">
              S
            </div>
            <h1 className="text-xl font-bold tracking-tight">SnapCode</h1>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors"
          >
            Export SVG
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-0">
        <aside className="lg:w-80 border-b lg:border-b-0 lg:border-r border-white/10 p-6 overflow-y-auto scrollbar-thin">
          <Controls
            language={language}
            onLanguageChange={setLanguage}
            theme={theme}
            onThemeChange={setTheme}
            background={background}
            onBackgroundChange={setBackground}
            padding={padding}
            onPaddingChange={setPadding}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            borderRadius={borderRadius}
            onBorderRadiusChange={setBorderRadius}
            showLineNumbers={showLineNumbers}
            onShowLineNumbersChange={setShowLineNumbers}
            title={title}
            onTitleChange={setTitle}
          />
        </aside>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-8 bg-[#0d0d0d]">
            <SnapshotPreview
              ref={previewRef}
              code={code}
              theme={currentTheme}
              background={background}
              padding={padding}
              fontSize={fontSize}
              borderRadius={borderRadius}
              showLineNumbers={showLineNumbers}
              title={title}
              language={language}
            />
          </div>

          <div className="border-t border-white/10">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
