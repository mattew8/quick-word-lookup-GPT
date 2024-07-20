import { generateText } from '@/shared/translate/translator';
import {
  CheckIcon,
  CopyIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import {
  Blockquote,
  Button,
  Flex,
  IconButton,
  Spinner,
  TextField,
  Text,
} from '@radix-ui/themes';
import { FormEventHandler, useState } from 'react';

const SearchWord = () => {
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fieldValue = Object.fromEntries(formData.entries())['search-input'];

    try {
      const message = await generateText(fieldValue.toString());
      if (message === null) return;
      setAnswer(message);
    } catch (e) {
      if (e instanceof Error) setAnswer(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const dict = parseTextToObjects(answer);

  return (
    <>
      <Flex asChild>
        <form onSubmit={onSubmit}>
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

      {dict !== null && dict.length > 0 && (
        <Flex direction={'column'} gap={'8px'} mt={'16px'}>
          {dict.map(({ word, example }) => (
            <div>
              <CopyAndCheck word={word} />
              <Blockquote mt={'4px'} color={'gray'} size={'2'}>
                {example}
              </Blockquote>
            </div>
          ))}
        </Flex>
      )}
    </>
  );
};

export default SearchWord;

const CopyAndCheck = ({ word }: { word: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const copyWord = () => {
    setIsClicked(true);
    chrome.runtime.sendMessage({
      action: 'paste-text',
      payload: word,
    });
  };
  return (
    <Flex align={'center'} gap={'12px'}>
      <Text size={'2'} weight={'bold'}>
        {word}
      </Text>
      {isClicked ? (
        <CheckIcon />
      ) : (
        <IconButton onClick={copyWord} size={'1'}>
          <CopyIcon />
        </IconButton>
      )}
    </Flex>
  );
};

function parseTextToObjects(text: string) {
  if (text.length === 0) return null;

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

const removeGptExamplePrefix = (text: string) => text.replace(/^Example: /, '');
