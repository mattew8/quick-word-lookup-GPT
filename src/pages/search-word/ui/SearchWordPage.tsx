import { useState } from 'react';
import { SearchWordForm, SearchResult } from '@/features/search-word';
import { Blockquote } from '@/shared/ui';
import SearchResultWord from './SearchResultWord';

const SearchWordPage = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  );

  return (
    <>
      <SearchWordForm onSubmit={setSearchResults} />
      {searchResults !== null &&
        searchResults.length > 0 &&
        searchResults.map(({ word, example }) => (
          <div>
            <SearchResultWord word={word} />
            <Blockquote mt={'4px'} color={'gray'} size={'2'}>
              {example}
            </Blockquote>
          </div>
        ))}
    </>
  );
};

export default SearchWordPage;
