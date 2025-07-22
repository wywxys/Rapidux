import fs from 'fs';
import path from 'path';

// 数据存储目录
const DATA_DIR = path.join(process.cwd(), 'data');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 通用JSON文件操作类
export class JSONStore<T> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(DATA_DIR, `${fileName}.json`);
  }

  // 读取所有数据
  async readAll(): Promise<T[]> {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data) || [];
    } catch (error) {
      console.error(`Error reading ${this.filePath}:`, error);
      return [];
    }
  }

  // 写入所有数据
  async writeAll(data: T[]): Promise<void> {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${this.filePath}:`, error);
      throw error;
    }
  }

  // 根据ID查找
  async findById(id: string, idField: keyof T = 'id' as keyof T): Promise<T | null> {
    const data = await this.readAll();
    return data.find(item => item[idField] === id) || null;
  }

  // 根据条件查找
  async findBy(predicate: (item: T) => boolean): Promise<T[]> {
    const data = await this.readAll();
    return data.filter(predicate);
  }

  // 添加新项
  async create(item: T): Promise<T> {
    const data = await this.readAll();
    data.push(item);
    await this.writeAll(data);
    return item;
  }

  // 更新项
  async update(id: string, updates: Partial<T>, idField: keyof T = 'id' as keyof T): Promise<T | null> {
    const data = await this.readAll();
    const index = data.findIndex(item => item[idField] === id);
    
    if (index === -1) {
      return null;
    }
    
    data[index] = { ...data[index], ...updates };
    await this.writeAll(data);
    return data[index];
  }

  // 删除项
  async delete(id: string, idField: keyof T = 'id' as keyof T): Promise<boolean> {
    const data = await this.readAll();
    const filteredData = data.filter(item => item[idField] !== id);
    
    if (filteredData.length === data.length) {
      return false; // 没有找到要删除的项
    }
    
    await this.writeAll(filteredData);
    return true;
  }
}
