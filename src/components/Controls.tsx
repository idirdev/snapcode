"use client";

import { languages } from "@/lib/languages";

interface ControlsProps {
  language: string;
  onLanguageChange: (v: string) => void;
  theme: string;
  onThemeChange: (v: string) => void;
  background: string;
  onBackgroundChange: (v: string) => void;
  padding: number;
  onPaddingChange: (v: number) => void;
  fontSize: number;
  onFontSizeChange: (v: number) => void;
  borderRadius: number;
  onBorderRadiusChange: (v: number) => void;
  showLineNumbers: boolean;
  onShowLineNumbersChange: (v: boolean) => void;
  title: string;
  onTitleChange: (v: string) => void;
}

const THEMES = [
  { value: "dracula", label: "Dracula" },
  { value: "monokai", label: "Monokai" },
  { value: "github", label: "GitHub Dark" },
  { value: "oneDark", label: "One Dark" },
];

const BACKGROUNDS = [
  { value: "gradient-candy", label: "Candy" },
  { value: "gradient-sunset", label: "Sunset" },
  { value: "gradient-ocean", label: "Ocean" },
  { value: "gradient-forest", label: "Forest" },
  { value: "gradient-fire", label: "Fire" },
  { value: "gradient-night", label: "Night" },
  { value: "gradient-slate", label: "Slate" },
  { value: "solid-black", label: "Black" },
  { value: "solid-white", label: "White" },
  { value: "transparent", label: "Transparent" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
        {title}
      </label>
      {children}
    </div>
  );
}

function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-violet-500"
      />
      <span className="text-sm text-zinc-400 font-mono w-12 text-right">
        {value}{suffix}
      </span>
    </div>
  );
}

export function Controls({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  background,
  onBackgroundChange,
  padding,
  onPaddingChange,
  fontSize,
  onFontSizeChange,
  borderRadius,
  onBorderRadiusChange,
  showLineNumbers,
  onShowLineNumbersChange,
  title,
  onTitleChange,
}: ControlsProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-semibold text-zinc-300 mb-4">Settings</h2>

      <Section title="File Title">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="untitled.ts"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono"
        />
      </Section>

      <Section title="Language">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id} className="bg-zinc-900">
              {lang.name}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Theme">
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
        >
          {THEMES.map((t) => (
            <option key={t.value} value={t.value} className="bg-zinc-900">
              {t.label}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Background">
        <div className="grid grid-cols-5 gap-2">
          {BACKGROUNDS.map((bg) => (
            <button
              key={bg.value}
              onClick={() => onBackgroundChange(bg.value)}
              title={bg.label}
              className={`h-8 rounded-md border-2 transition-all ${
                background === bg.value
                  ? "border-violet-500 scale-110"
                  : "border-transparent hover:border-white/20"
              }`}
              style={{
                background: bg.value.startsWith("gradient")
                  ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                  : bg.value === "transparent"
                  ? "repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 0 0 / 12px 12px"
                  : bg.value === "solid-black"
                  ? "#000"
                  : "#fff",
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="Padding">
        <Slider value={padding} onChange={onPaddingChange} min={16} max={96} step={4} suffix="px" />
      </Section>

      <Section title="Font Size">
        <Slider value={fontSize} onChange={onFontSizeChange} min={10} max={24} suffix="px" />
      </Section>

      <Section title="Border Radius">
        <Slider value={borderRadius} onChange={onBorderRadiusChange} min={0} max={32} suffix="px" />
      </Section>

      <Section title="Line Numbers">
        <button
          onClick={() => onShowLineNumbersChange(!showLineNumbers)}
          className={`w-12 h-6 rounded-full transition-colors ${
            showLineNumbers ? "bg-violet-500" : "bg-zinc-700"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
              showLineNumbers ? "translate-x-6" : "translate-x-0.5"
            }`}
          />
        </button>
      </Section>
    </div>
  );
}
