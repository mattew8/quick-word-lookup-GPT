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

  return (
    <div>
      <h1>단어를 검색해보세요</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="search words!" name="search-input" />
        <button>검색</button>
      </form>
      {answer && <p>{answer}</p>}
    </div>
  );
};

export default SearchWord;
