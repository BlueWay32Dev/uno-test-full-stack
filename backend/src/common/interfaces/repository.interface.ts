export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface IReadRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
}

export interface IWriteRepository<T> {
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
