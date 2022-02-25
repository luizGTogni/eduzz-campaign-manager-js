import storageService from './storage';

export interface ICache<T = any> {
  data: T;
  createdAt: Date;
  expirationDate?: Date;
}

/*interface ICacheWatcher<T> {
  (value: T): void;
}*/

export class CacheService {
  // private memory: { [key: string]: ICache };
  // private watchers: { [key: string]: ICacheWatcher<any>[] };

  /*constructor() {
    this.memory = {};
    this.watchers = {};
  }*/

  public async clear(): Promise<void> {
    // this.memory = {};
    storageService.clear(key => key.startsWith('app-cache'));
  }
}

const cacheService = new CacheService();
export default cacheService;
