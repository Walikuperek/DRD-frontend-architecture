import { Injectable } from '@angular/core';
import { Action, ActionWith, Store } from '@quak.lib/qstore';
import { Observable, debounceTime, switchMap } from 'rxjs';
import { FindUsersFilter, UserRepository } from '../repo';
import { User } from '.';
import { UserID } from '../dto';

/**
 * This is a store that is used to manage the state of the UserProfileComponent.
 *
 * It is better to put it in features/ folder because we can allow to listen to actions
 * in another places in Use Case layer without need to know what is view.
 */
@Injectable({ providedIn: 'root' })
export class UserProfileStore extends Store<{
  userID: UserID | null;
  user: User | null;
  disabledUpdateRole: boolean;
  isLoading: boolean;
}> {
  userID$ = this.select((state) => state.userID);
  user$ = this.select((state) => state.user);
  disabledUpdateRole$ = this.select((state) => state.disabledUpdateRole);
  isLoading$ = this.select((state) => state.isLoading);

  actions = {
    fetchDetailsForUserID: ActionWith<UserID>(),
  };

  constructor(private userRepo: UserRepository) {
    super({
      userID: null,
      user: null,
      disabledUpdateRole: true,
      isLoading: false,
    });
    this._fetchDetailsForUserID();
  }

  private _fetchDetailsForUserID() {
    this.set({ isLoading: true });
    (
      this.actions.fetchDetailsForUserID.listen() as unknown as Observable<UserID>
    ).subscribe((userID) => {
      this.userRepo.findOne(userID).subscribe({
        next: (user) => this.set({ user: user.toUser() }),
        error: (err) => console.error(err),
        complete: () => this.set({ isLoading: false }),
      });
    });
  }
}
