type KeyType = 'voca-book';

export interface Storage {
  get(key: KeyType): Promise<unknown>;
  create(key: KeyType, value: unknown): Promise<void>;
}

export const chromeStorage: Storage = {
  async get(key: KeyType): Promise<unknown> {
    const data = await chrome.storage.local.get(key);
    return data[key] || null;
  },

  create(key: KeyType, value: unknown) {
    return chrome.storage.local.set({
      [key]: value,
    });
  },
};
