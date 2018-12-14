export interface CodeTheme {
  name: string;
  background: string;
  titleBar: string;
  text: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  builtin: string;
  punctuation: string;
  lineNumber: string;
}

export const themes: Record<string, CodeTheme> = {
  dracula: {
    name: "Dracula",
    background: "#282a36",
    titleBar: "#21222c",
    text: "#f8f8f2",
    comment: "#6272a4",
    keyword: "#ff79c6",
    string: "#f1fa8c",
    number: "#bd93f9",
    function: "#50fa7b",
    builtin: "#8be9fd",
    punctuation: "#f8f8f2",
    lineNumber: "#6272a4",
  },

  monokai: {
    name: "Monokai",
    background: "#272822",
    titleBar: "#1e1f1c",
    text: "#f8f8f2",
    comment: "#75715e",
    keyword: "#f92672",
    string: "#e6db74",
    number: "#ae81ff",
    function: "#a6e22e",
    builtin: "#66d9ef",
    punctuation: "#f8f8f2",
    lineNumber: "#75715e",
  },

  github: {
    name: "GitHub Dark",
    background: "#0d1117",
    titleBar: "#010409",
    text: "#e6edf3",
    comment: "#8b949e",
    keyword: "#ff7b72",
    string: "#a5d6ff",
    number: "#79c0ff",
    function: "#d2a8ff",
    builtin: "#ffa657",
    punctuation: "#e6edf3",
    lineNumber: "#484f58",
  },

  oneDark: {
    name: "One Dark",
    background: "#282c34",
    titleBar: "#21252b",
    text: "#abb2bf",
    comment: "#5c6370",
    keyword: "#c678dd",
    string: "#98c379",
    number: "#d19a66",
    function: "#61afef",
    builtin: "#e5c07b",
    punctuation: "#abb2bf",
    lineNumber: "#4b5263",
  },
};
