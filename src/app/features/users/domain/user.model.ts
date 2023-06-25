import { Observable } from 'rxjs';
import {
  UserID,
  UserDTO,
  UserRole,
  UpdateUserBodyFactory,
  UpdateUserDto,
} from '../dto';
import { UserRepositoryInterface } from '../repo';
import { UserProfile } from './user-profile.model';

export type FieldsToUpdate = {
  profile: UserProfile;
  role: UserRole;
};

export class User {
  id: UserID;
  profile: UserProfile;
  role: UserRole;

  constructor(user: UserDTO) {
    this.id = user.id;
    this.profile = new UserProfile(user.profile);
    this.role = user.role;
  }

  update(
    fields: Partial<FieldsToUpdate>,
    repo: UserRepositoryInterface
  ): Observable<UpdateUserDto> {
    this.profile = fields.profile ? fields.profile : this.profile;
    this.role = fields.role ? fields.role : this.role;
    return repo.update(UpdateUserBodyFactory().fromUser(this));
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isModerator(): boolean {
    return this.role === 'moderator';
  }

  isGuest(): boolean {
    return this.role === 'guest';
  }
}
