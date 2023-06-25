import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserSearchStore, FindUsersFilter } from 'src/app/features/users';

@Component({
  selector: 'app-user-search',
  template: `
    <div class="container">
      <ng-container *ngIf="vm$ | async as vm">
        <fieldset>
          <legend class="flex-row">
            <button routerLink="/">&larr;</button>&nbsp;User Search ({{
              vm.users.length
            }})
          </legend>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="search"
              value="{{ vm.username }}"
              placeholder="Search..."
              (keyup)="onSearchChange($event)"
            />
          </div>
        </fieldset>
        <p *ngIf="vm.users.length === 0">
          Type username to search, e.g. 'test1'
        </p>
        <ul>
          <li class="font-mono fs-16" *ngFor="let user of vm.users">
            <button routerLink="/users/profile/{{ user.id }}">EDIT</button
            >&nbsp;{{ user | json }}
          </li>
        </ul>
      </ng-container>
    </div>
  `,
})
export class UserSearchComponent {
  // DRD Rule: if view contains list of something (e.g. users) then it probably should be reactive
  // There will be plenty of situations to count total -> show in other component, refresh list, etc.

  users$ = this.store.users$ as unknown as Observable<User[]>; // compiler complains without that cast even if the type is proper...
  username$ = (
    this.store
      .lastActiveFilter$ as unknown as Observable<FindUsersFilter | null>
  ).pipe(map((filter) => filter?.username));
  vm$ = combineLatest([this.users$, this.username$]).pipe(
    map(([users, username]) => ({ users, username }))
  );

  constructor(private store: UserSearchStore) {}

  onSearchChange(event: any) {
    const phrase = String(event.target.value);
    const filter = new FindUsersFilter({ username: phrase });
    this.store.actions.find.execute(filter);
  }
}
