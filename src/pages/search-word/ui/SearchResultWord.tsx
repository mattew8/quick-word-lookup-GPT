import { useState } from 'react';
import { Flex, IconButton, Text, CheckIcon, CopyIcon } from '@/shared/ui';

interface Props {
  word: string;
}
const SearchResultWord = ({ word }: Props) => {
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

export default SearchResultWord;
