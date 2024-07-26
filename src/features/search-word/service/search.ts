import { TranslationModel, OpenAIClientImpl } from '@/shared/translate';
import { SearchResult } from '../model';
import { convertTextToSearchResults } from './convert';

const apiKey = import.meta.env.VITE_API_KEY;
const translator = new TranslationModel(new OpenAIClientImpl(apiKey));

export async function search(text: string): Promise<SearchResult[] | null> {
  const response = await translator.translate(text);
  if (response === null || response.length === 0) return null;
  return convertTextToSearchResults(response);
}
