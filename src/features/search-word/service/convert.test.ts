import { SearchResult } from '../model';
import { convertTextToSearchResults } from './convert';

describe('convertTextToSearchResults', () => {
  it('should convert valid text to search results', () => {
    const inputText = `Apple\nExample: 'I ate an apple for breakfast.'\n\nBanana\nExample: 'Monkeys love eating bananas.'`;
    const expectedOutput: SearchResult[] = [
      { word: 'Apple', example: "'I ate an apple for breakfast.'" },
      { word: 'Banana', example: "'Monkeys love eating bananas.'" },
    ];

    const result = convertTextToSearchResults(inputText);
    expect(result).toEqual(expectedOutput);
  });

  it('should return null for empty input', () => {
    const inputText = '';
    const result = convertTextToSearchResults(inputText);
    expect(result).toBeNull();
  });

  it('should return null for input without valid word-example pairs', () => {
    const inputText = `Invalid text without example`;
    const result = convertTextToSearchResults(inputText);
    expect(result).toBeNull();
  });

  it('should ignore parts without valid example', () => {
    const inputText = `Apple\nExample: 'I ate an apple for breakfast.'\n\nInvalid text`;
    const expectedOutput: SearchResult[] = [
      { word: 'Apple', example: "'I ate an apple for breakfast.'" },
    ];

    const result = convertTextToSearchResults(inputText);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle text with multiple new lines correctly', () => {
    const inputText = `Apple\nExample: 'I ate an apple for breakfast.'\n\n\n\nBanana\nExample: 'Monkeys love eating bananas.'`;
    const expectedOutput: SearchResult[] = [
      { word: 'Apple', example: "'I ate an apple for breakfast.'" },
      { word: 'Banana', example: "'Monkeys love eating bananas.'" },
    ];

    const result = convertTextToSearchResults(inputText);
    expect(result).toEqual(expectedOutput);
  });
});
