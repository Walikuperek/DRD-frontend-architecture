import { FindUserResponse, UpdateUserResponse } from './types';

export class UserProfileDTO {
  username: string;

  constructor(from: FindUserResponse) {
    this.username = from.user_name;
  }

  static fromUpdateUserResponse(from: UpdateUserResponse): UserProfileDTO {
    return new UserProfileDTO({
      id: from.id,
      user_name: from.user_name,
      role: from.role,
    });
  }
}
