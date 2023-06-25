import { UserProfileDTO } from '../dto';

export class UserProfile {
  username: string = '';

  constructor(profile: UserProfileDTO) {
    Object.assign(this, profile);
  }
}
