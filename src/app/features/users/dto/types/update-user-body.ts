import { User } from '../../domain';
import { UserRole } from './user-role';

export type UpdateUserBody = {
  id: string;
  user_name: string;
  role: UserRole;
};

export function UpdateUserBodyFactory() {
  return {
    fromUser(user: User): UpdateUserBody {
      return {
        id: user.id,
        user_name: user.profile.username,
        role: user.role,
      };
    },
  };
}
