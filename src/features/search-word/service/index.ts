import { TranslationModel } from '@/shared/translation-model';
import { SearchResult } from '../model';
import { OpenAIClientImpl } from '@/shared/open-ai';

const apiKey = import.meta.env.VITE_API_KEY;
const translator = new TranslationModel(new OpenAIClientImpl(apiKey));

export async function searchWord(text: string): Promise<SearchResult[] | null> {
  const response = await translator.translate(text);
  if (response === null || response.length === 0) return null;
  return convertTextToSearchResults(response);
}

function convertTextToSearchResults(text: string): SearchResult[] | null {
  // seperate text and example
  const parts = text.trim().split('\n\n');
  if (parts.length === 0) return null;

  // convert to array
  const result = parts.map((part) => {
    const [word, example] = part.split('\n');
    return { word: word, example: removeGptExamplePrefix(example) };
  });

  return result;
}

function removeGptExamplePrefix(text: string) {
  return text.replace(/^Example: /, '');
}
