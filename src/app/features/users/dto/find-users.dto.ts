import { FindUserResponse } from './types';
import { UserDTO } from './user.dto';

export class FindUsersDTO {
  users: UserDTO[];

  constructor(response: FindUserResponse[]) {
    this.users = response.map((user) => new UserDTO(user));
  }

  // For Repository usage
  static fromResponse(response: FindUserResponse[]): FindUsersDTO {
    return new FindUsersDTO(response);
  }
}
