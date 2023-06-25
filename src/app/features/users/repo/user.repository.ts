import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import {
  FindUserResponse,
  FindUsersDTO,
  UpdateUserBody,
  UpdateUserDto,
  UpdateUserResponse,
  UserDTO,
  UserID,
} from '../dto';
import { FindUsersFilter, UserRepositoryInterface } from './types';

@Injectable({ providedIn: 'root' })
export class UserRepository implements UserRepositoryInterface {
  constructor(private http: HttpClient) {}

  findOne(urlSafeID: UserID): Observable<UserDTO> {
    return FakeBackend.where(new FindUsersFilter({ id: urlSafeID })).pipe(
      map((dto) => {
        if (dto.users.length === 1) {
          return dto.users[0];
        }
        throw new Error(`User with id ${urlSafeID} not found`);
      })
    );

    // normal code equivalent to the above
    // return this.http
    //     .get<FindUserResponse>(`/api/users/${urlSafeID}`)
    //     .pipe(map(response => new UserDTO(response)));
  }

  find(where: FindUsersFilter): Observable<FindUsersDTO> {
    return FakeBackend.where(where);

    // normal code equivalent to the above
    // return this.http
    //     .get<FindUserResponse[]>('/api/users', { params: where as HttpParams })
    //     .pipe(map(FindUsersDTO.fromResponse));
  }

  update(user: UpdateUserBody): Observable<UpdateUserDto> {
    return FakeBackend.update(user);

    // normal code equivalent to the above
    // return this.http
    //     .put<UpdateUserResponse>(`/api/users/${user.id}`, user)
    //     .pipe(map(response => new UpdateUserDto(response)));
  }
}

// ------------------------------------------------------------
// Fake backend because it's only showcase app
const FakeBackend = {
  users: [
    { id: '#1', user_name: 'admin1_test1', role: 'admin' },
    { id: '#2', user_name: 'mod2_test2', role: 'moderator' },
    { id: '#3', user_name: 'user3_test3', role: 'user' },
    { id: '#4', user_name: 'user4_test4', role: 'user' },
  ] as FindUserResponse[],
  where: (filter: FindUsersFilter) => {
    const fakeResponse = FakeBackend.users.filter((user) => {
      if (filter.id && !user.id.includes(filter.id)) {
        return false;
      }
      if (filter.username && !user.user_name.includes(filter.username)) {
        return false;
      }
      return true;
    });
    return of(fakeResponse).pipe(map(FindUsersDTO.fromResponse));
  },
  update(user: UpdateUserBody) {
    const updatedUsers = FakeBackend.users.map((u) => {
      if (u.id === user.id) {
        u.user_name = user.user_name;
        u.role = user.role;
        return u;
      }
      return u;
    });
    FakeBackend.users = updatedUsers;
    const fakeResponse = FakeBackend.users.find((u) => u.id === user.id);
    return of(fakeResponse).pipe(
      map((user) => new UpdateUserDto(user as unknown as UpdateUserResponse))
    );
  },
};
