export type IStorage = {
  blackList: string;
};

const defaultStorage: IStorage = {
  blackList: "",
};

async function get() {
  if (typeof browser !== "undefined") {
    return browser.storage.sync.get(defaultStorage as any) as Promise<IStorage>;
  }
  return chrome.storage.sync.get(defaultStorage) as Promise<IStorage>;
}

async function set(value: IStorage) {
  if (typeof browser !== "undefined") {
    return browser.storage.sync.set(value);
  }
  return chrome.storage.sync.set(value);
}

export default { get, set };
