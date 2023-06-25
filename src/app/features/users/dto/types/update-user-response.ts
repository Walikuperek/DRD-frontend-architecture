import { UserID } from './user-id';
import { UserRole } from './user-role';

export type UpdateUserResponse = {
  id: UserID;
  user_name: string;
  role: UserRole;
};
