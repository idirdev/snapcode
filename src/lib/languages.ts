export interface Language {
  id: string;
  name: string;
  extension: string;
}

export const languages: Language[] = [
  { id: "typescript", name: "TypeScript", extension: ".ts" },
  { id: "javascript", name: "JavaScript", extension: ".js" },
  { id: "python", name: "Python", extension: ".py" },
  { id: "rust", name: "Rust", extension: ".rs" },
  { id: "go", name: "Go", extension: ".go" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "csharp", name: "C#", extension: ".cs" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "c", name: "C", extension: ".c" },
  { id: "ruby", name: "Ruby", extension: ".rb" },
  { id: "php", name: "PHP", extension: ".php" },
  { id: "swift", name: "Swift", extension: ".swift" },
  { id: "kotlin", name: "Kotlin", extension: ".kt" },
  { id: "scala", name: "Scala", extension: ".scala" },
  { id: "html", name: "HTML", extension: ".html" },
  { id: "css", name: "CSS", extension: ".css" },
  { id: "scss", name: "SCSS", extension: ".scss" },
  { id: "json", name: "JSON", extension: ".json" },
  { id: "yaml", name: "YAML", extension: ".yaml" },
  { id: "toml", name: "TOML", extension: ".toml" },
  { id: "sql", name: "SQL", extension: ".sql" },
  { id: "bash", name: "Bash", extension: ".sh" },
  { id: "powershell", name: "PowerShell", extension: ".ps1" },
  { id: "dockerfile", name: "Dockerfile", extension: "" },
  { id: "markdown", name: "Markdown", extension: ".md" },
  { id: "graphql", name: "GraphQL", extension: ".graphql" },
  { id: "elixir", name: "Elixir", extension: ".ex" },
  { id: "haskell", name: "Haskell", extension: ".hs" },
  { id: "lua", name: "Lua", extension: ".lua" },
  { id: "zig", name: "Zig", extension: ".zig" },
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find((lang) => lang.id === id);
}

export function getLanguageByExtension(ext: string): Language | undefined {
  return languages.find((lang) => lang.extension === ext);
}
