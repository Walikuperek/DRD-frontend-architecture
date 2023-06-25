import { Injectable } from '@angular/core';
import { Action, ActionWith, Store } from '@quak.lib/qstore';
import { Observable, debounceTime, switchMap } from 'rxjs';
import { FindUsersFilter, UserRepository } from '../repo';
import { User } from '.';

/**
 * This is a store that is used to manage the state of the UserSearchComponent.
 *
 * It is better to put it in features/ folder because we can allow to listen to actions
 * in another places in Use Case layer without need to know what is view.
 */
@Injectable({ providedIn: 'root' })
export class UserSearchStore extends Store<{
  users: User[];
  lastActiveFilter: FindUsersFilter;
}> {
  users$ = this.select((state) => state.users);
  lastActiveFilter$ = this.select((state) => state.lastActiveFilter);

  actions = {
    find: ActionWith<FindUsersFilter>(),
    resetUsers: Action(),
  };

  constructor(private userRepo: UserRepository) {
    super({ users: [], lastActiveFilter: new FindUsersFilter() });
    this._find();
    this._reset();
  }

  updateLastActiveFilter(filter: FindUsersFilter) {
    this.set({ lastActiveFilter: filter });
  }

  private _find() {
    (this.actions.find.listen() as unknown as Observable<FindUsersFilter>) // compiler complains without that cast even if the type is proper...
      .pipe(
        debounceTime(300),
        switchMap((where) => {
          this.updateLastActiveFilter(where);
          return this.userRepo.find(where);
        })
      )
      .subscribe((dto) =>
        this.set({ users: dto.users.map((user) => user.toUser()) })
      );
  }

  private _reset() {
    (this.actions.resetUsers.listen() as unknown as Observable<void>).subscribe(
      () => this.set({ users: [], lastActiveFilter: new FindUsersFilter() })
    );
  }
}
