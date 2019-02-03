import { describe, it, expect } from 'vitest';
import { languages, getLanguageById, getLanguageByExtension } from '../src/lib/languages';
import { themes } from '../src/lib/themes';

describe('languages', () => {
  it('contains a list of languages', () => {
    expect(languages.length).toBeGreaterThan(0);
  });

  it('each language has required fields', () => {
    for (const lang of languages) {
      expect(lang.id).toBeTruthy();
      expect(lang.name).toBeTruthy();
      expect(typeof lang.extension).toBe('string');
    }
  });

  it('includes TypeScript', () => {
    const ts = languages.find(l => l.id === 'typescript');
    expect(ts).toBeDefined();
    expect(ts!.name).toBe('TypeScript');
    expect(ts!.extension).toBe('.ts');
  });

  it('includes JavaScript', () => {
    const js = languages.find(l => l.id === 'javascript');
    expect(js).toBeDefined();
    expect(js!.extension).toBe('.js');
  });

  it('includes Python', () => {
    const py = languages.find(l => l.id === 'python');
    expect(py).toBeDefined();
    expect(py!.extension).toBe('.py');
  });
});

describe('getLanguageById', () => {
  it('returns the language for a valid id', () => {
    const lang = getLanguageById('typescript');
    expect(lang).toBeDefined();
    expect(lang!.name).toBe('TypeScript');
  });

  it('returns undefined for an invalid id', () => {
    expect(getLanguageById('nonexistent')).toBeUndefined();
  });
});

describe('getLanguageByExtension', () => {
  it('returns the language for a valid extension', () => {
    const lang = getLanguageByExtension('.ts');
    expect(lang).toBeDefined();
    expect(lang!.id).toBe('typescript');
  });

  it('returns the language for .py extension', () => {
    const lang = getLanguageByExtension('.py');
    expect(lang).toBeDefined();
    expect(lang!.id).toBe('python');
  });

  it('returns undefined for unknown extension', () => {
    expect(getLanguageByExtension('.xyz')).toBeUndefined();
  });
});

describe('themes', () => {
  it('contains theme definitions', () => {
    expect(Object.keys(themes).length).toBeGreaterThan(0);
  });

  it('each theme has required color properties', () => {
    for (const [key, theme] of Object.entries(themes)) {
      expect(theme.name).toBeTruthy();
      expect(theme.background).toBeTruthy();
      expect(theme.text).toBeTruthy();
      expect(theme.keyword).toBeTruthy();
      expect(theme.string).toBeTruthy();
      expect(theme.comment).toBeTruthy();
      expect(theme.function).toBeTruthy();
    }
  });

  it('includes dracula theme', () => {
    expect(themes.dracula).toBeDefined();
    expect(themes.dracula.name).toBe('Dracula');
    expect(themes.dracula.background).toBe('#282a36');
  });

  it('includes monokai theme', () => {
    expect(themes.monokai).toBeDefined();
    expect(themes.monokai.name).toBe('Monokai');
  });

  it('includes github theme', () => {
    expect(themes.github).toBeDefined();
    expect(themes.github.name).toBe('GitHub Dark');
  });

  it('includes oneDark theme', () => {
    expect(themes.oneDark).toBeDefined();
    expect(themes.oneDark.name).toBe('One Dark');
  });
});
