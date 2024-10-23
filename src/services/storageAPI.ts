class StorageAPI {
  get(key: string) {
    return sessionStorage.getItem(key);
  }
  set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
  remove(key: string) {
    sessionStorage.removeItem(key);
  }
}

const storageAPI = new StorageAPI();
export default storageAPI;
