import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
}
