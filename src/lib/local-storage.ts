// 简单的本地存储工具类
export class LocalStorageService {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key ${key}:`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key ${key}:`, error);
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    localStorage.removeItem(key);
  }

  static clear(): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    localStorage.clear();
  }
}
