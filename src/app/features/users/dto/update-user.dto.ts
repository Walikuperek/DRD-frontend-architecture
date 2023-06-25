import { UpdateUserResponse, UserID, UserRole } from './types';
import { User } from '../domain';
import { UserProfileDTO } from './user-profile.dto';

export class UpdateUserDto {
  id: UserID;
  profile: UserProfileDTO;
  role: UserRole;

  constructor(response: UpdateUserResponse) {
    this.id = response.id;
    this.profile = UserProfileDTO.fromUpdateUserResponse(response); // static method that returns UserProfileDTO from UpdateUserResponse
    this.role = response.role;
  }

  toUser(): User {
    return new User(this);
  }
}
