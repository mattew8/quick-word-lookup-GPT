import { generateText } from '@/shared/translate/translator';
import { FormEventHandler, useState } from 'react';

const SearchWord = () => {
  const [answer, setAnswer] = useState<string>('');

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValue = Object.fromEntries(formData.entries())['search-input'];

    try {
      const message = await generateText(fieldValue.toString());
      if (message === null) return;
      setAnswer(message);
    } catch (e) {
      console.error(e);
    }
  };

  const dict = parseTextToObjects(answer);

  const copyWord = (text: string) =>
    chrome.runtime.sendMessage({
      action: 'paste-text',
      payload: text,
    });

  return (
    <div>
      <h1>단어를 검색해보세요</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="search words!" name="search-input" />
        <button>검색</button>
      </form>
      {dict.length > 0 &&
        dict.map(({ word, example }) => (
          <>
            <p onClick={() => copyWord(word)}>{word}</p>
            <p>{example}</p>
          </>
        ))}
    </div>
  );
};

export default SearchWord;

// `Imagine
// Example: 'She likes to imagine different worlds.'

// Fantasize
// Example: 'He likes to fantasize about winning the lottery.'
// `;
function parseTextToObjects(text: string) {
  // seperate text and example
  const parts = text.trim().split('\n\n');

  // convert to array
  const result = parts.map((part) => {
    const [word, example] = part.split('\n');
    return { word: word, example: example };
  });

  return result;
}
