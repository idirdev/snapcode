"use client";

import { forwardRef, useMemo } from "react";
import type { CodeTheme } from "@/lib/themes";

interface SnapshotPreviewProps {
  code: string;
  theme: CodeTheme;
  background: string;
  padding: number;
  fontSize: number;
  borderRadius: number;
  showLineNumbers: boolean;
  title: string;
  language: string;
}

const BACKGROUND_MAP: Record<string, string> = {
  "gradient-candy": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "gradient-sunset": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "gradient-ocean": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "gradient-forest": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "gradient-fire": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "gradient-night": "linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)",
  "gradient-slate": "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
  "solid-black": "#000000",
  "solid-white": "#ffffff",
  transparent: "transparent",
};

export const SnapshotPreview = forwardRef<HTMLDivElement, SnapshotPreviewProps>(
  function SnapshotPreview(
    {
      code,
      theme,
      background,
      padding,
      fontSize,
      borderRadius,
      showLineNumbers,
      title,
    },
    ref
  ) {
    const lines = useMemo(() => code.split("\n"), [code]);
    const bg = BACKGROUND_MAP[background] ?? BACKGROUND_MAP["gradient-candy"];
    const isGradient = bg.startsWith("linear-gradient");

    return (
      <div
        ref={ref}
        className="inline-block max-w-full shadow-2xl"
        style={{
          padding,
          background: isGradient ? bg : undefined,
          backgroundColor: !isGradient ? bg : undefined,
          borderRadius: borderRadius + 8,
        }}
      >
        <div
          className="overflow-hidden shadow-xl"
          style={{
            borderRadius,
            backgroundColor: theme.background,
            minWidth: 480,
            maxWidth: 720,
          }}
        >
          {/* Window title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ backgroundColor: theme.titleBar }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            {title && (
              <div
                className="flex-1 text-center text-xs font-mono opacity-60"
                style={{ color: theme.text }}
              >
                {title}
              </div>
            )}
            <div className="w-[52px]" />
          </div>

          {/* Code area */}
          <div className="overflow-x-auto p-5 font-mono scrollbar-thin">
            <pre style={{ fontSize, lineHeight: 1.7, margin: 0 }}>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  {showLineNumbers && (
                    <span
                      className="select-none text-right mr-6 inline-block"
                      style={{
                        minWidth: `${String(lines.length).length}ch`,
                        color: theme.lineNumber,
                        opacity: 0.5,
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span style={{ color: theme.text }}>
                    {renderLine(line, theme)}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    );
  }
);

function renderLine(line: string, theme: CodeTheme): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  const patterns: Array<{ regex: RegExp; color: string }> = [
    { regex: /^(\/\/.*)/, color: theme.comment },
    { regex: /^(["'`](?:[^"'`\\]|\\.)*["'`])/, color: theme.string },
    { regex: /^(\b\d+\.?\d*\b)/, color: theme.number },
    {
      regex:
        /^(\b(?:function|const|let|var|return|if|else|for|while|class|import|export|from|default|async|await|new|typeof|instanceof|interface|type|enum|extends|implements|public|private|protected|static|readonly|abstract|yield|throw|try|catch|finally)\b)/,
      color: theme.keyword,
    },
    {
      regex: /^(\b(?:true|false|null|undefined|NaN|Infinity|void|this|super|console)\b)/,
      color: theme.builtin,
    },
    { regex: /^(\w+)(?=\s*\()/, color: theme.function },
    { regex: /^([{}()[\];:.,<>=!&|?+\-*/%^~@#])/, color: theme.punctuation },
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const { regex, color } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        tokens.push(
          <span key={key++} style={{ color }}>
            {match[1]}
          </span>
        );
        remaining = remaining.slice(match[1].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      const nextSpecial = remaining.slice(1).search(/[/"'`\d\b{}()[\];:.,<>=!&|?+\-*/%^~@#]/);
      const end = nextSpecial === -1 ? remaining.length : nextSpecial + 1;
      tokens.push(
        <span key={key++} style={{ color: theme.text }}>
          {remaining.slice(0, end)}
        </span>
      );
      remaining = remaining.slice(end);
    }
  }

  return tokens.length > 0 ? tokens : " ";
}
