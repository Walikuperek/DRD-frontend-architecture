import { User } from '../domain';
import { FindUserResponse, UserID, UserRole } from './types';
import { UserProfileDTO } from './user-profile.dto';

export class UserDTO {
  id: UserID;
  profile: UserProfileDTO;
  role: UserRole;

  constructor(response: FindUserResponse) {
    this.id = response.id;
    this.profile = new UserProfileDTO(response);
    this.role = response.role;
  }

  toUser(): User {
    return new User(this);
  }
}
