import { Observable } from 'rxjs';
import {
  FindUsersDTO,
  UpdateUserBody,
  UpdateUserDto,
  UserDTO,
  UserID,
} from '../../dto';
import { FindUsersFilter } from './find-users-filter';

export interface UserRepositoryInterface {
  findOne(urlSafeID: UserID): Observable<UserDTO>;
  find(where: FindUsersFilter): Observable<FindUsersDTO>;
  update(user: UpdateUserBody): Observable<UpdateUserDto>;
}
