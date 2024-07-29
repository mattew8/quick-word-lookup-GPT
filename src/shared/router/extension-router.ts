import { useEffect, useState } from 'react';
import { RouterPath } from './interface';

export const useExtensionRouter = () => {
  const [path, setPath] = useState<RouterPath>('search');

  useEffect(() => {
    chrome.storage.local.get('url').then((data) => {
      data['url'] && setPath(data['url']);
    });

    const listener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      namespace: chrome.storage.AreaName,
    ) => {
      if (namespace === 'local' && changes['url']) {
        const updatedPhase = changes['url'].newValue;
        setPath(updatedPhase);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  const push = (path: RouterPath) => {
    chrome.storage.local.set({ url: path });
  };

  return {
    path,
    push,
  };
};
