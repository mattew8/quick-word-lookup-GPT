import { FormEventHandler, useState } from 'react';
import { search } from '../service/search';
import { SearchResult } from '../model';
import {
  Button,
  Flex,
  Spinner,
  TextField,
  MagnifyingGlassIcon,
} from '@/shared/ui';

interface Props {
  onSubmit: (results: SearchResult[]) => void;
}
const SearchWordForm = ({ onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const searchWord: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fieldValue = Object.fromEntries(formData.entries())['search-input'];
    if (fieldValue === undefined) return;

    try {
      const result = await search(fieldValue.toString());
      if (result === null) throw new Error('empty');
      onSubmit(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex asChild>
      <form onSubmit={searchWord}>
        <TextField.Root
          size={'1'}
          placeholder={'Search words!'}
          name={'search-input'}
        />
        <Button size={'1'} variant={'soft'}>
          {isLoading ? <Spinner loading /> : <MagnifyingGlassIcon />}
        </Button>
      </form>
    </Flex>
  );
};

export default SearchWordForm;
