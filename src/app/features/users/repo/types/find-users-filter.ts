import { UserRole } from '../../dto';

type Filter = {
  readonly id: string;
  readonly username: string;
  readonly role: UserRole;
  readonly page: number;
  readonly limit: number;
};

export class FindUsersFilter {
  readonly id: string;
  readonly username: string;
  readonly role: UserRole;
  readonly page: number;
  readonly limit: number;

  constructor(filters?: Partial<Filter>) {
    this.id = filters?.id || '';
    this.username = filters?.username || '';
    this.role = filters?.role || 'guest';
    this.page = filters?.page || 1;
    this.limit = filters?.limit || 10;
  }
}
