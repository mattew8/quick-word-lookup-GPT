import { SearchResult } from '../model';

export function convertTextToSearchResults(
  text: string,
): SearchResult[] | null {
  // seperate text and example
  const parts = text.trim().split('\n\n');
  if (parts.length === 0) return null;

  // convert to array
  const result = parts.reduce<SearchResult[]>((acc, part) => {
    const [word, example] = part.split('\n');
    if (word && example) {
      acc.push({ word, example: removeGptExamplePrefix(example) });
    }
    return acc;
  }, []);
  if (result.length === 0) return null;

  return result;
}

function removeGptExamplePrefix(text: string) {
  return text.replace(/^Example: /, '');
}
