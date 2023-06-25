import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  User,
  UserProfile,
  UserRole,
  UserRepository,
  UserSearchStore,
  UserProfileStore,
} from 'src/app/features/users';
import { UserProfileFormComponent } from './components';

@Component({
  selector: 'app-user-profile',
  template: `
    <div class="container">
      <ng-container *ngIf="vm$ | async as vm">
        <fieldset>
          <legend class="flex-row">
            <button routerLink="/users/search">&larr;</button
            >&nbsp;Users/Profile/{{ pathUserID }}
          </legend>
          <app-user-profile-form
            [user]="vm.user"
            [disabledUpdateRole]="vm.disabledUpdateRole"
          ></app-user-profile-form>
        </fieldset>
        <fieldset class="border-muted-dotted">
          <legend class="flex-row">Changes</legend>
          <button
            class="fs-24"
            [disabled]="!vm.user"
            (click)="onSaveChanges(vm.user!)"
          >
            Save changes
          </button>
        </fieldset>
      </ng-container>
    </div>

    <dialog id="changes_saved_modal">
      <p>Changes saved!</p>
    </dialog>
  `,
})
export class UserProfileComponent implements OnInit {
  pathUserID = this.route.snapshot.paramMap.get('id') ?? '';
  vm$ = this.userProfileStore.select((state) => ({
    user: state.user,
    disabledUpdateRole: state.disabledUpdateRole,
  })) as unknown as Observable<{
    user: User | null;
    disabledUpdateRole: boolean;
  }>;

  @ViewChild(UserProfileFormComponent) form!: UserProfileFormComponent;

  constructor(
    private route: ActivatedRoute,
    private userRepo: UserRepository,
    private userSearchStore: UserSearchStore,
    private userProfileStore: UserProfileStore
  ) {}

  ngOnInit() {
    this.userProfileStore.actions.fetchDetailsForUserID.execute(
      this.pathUserID
    );
  }

  onSaveChanges(user: User) {
    const { username, role } = this.getFormData();
    const updatedUser = {
      ...user,
      role: role ? (role as UserRole) : user.role,
      profile: new UserProfile({ ...user.profile, username }),
    };

    // Use Domain layer to update user, remeber that everything can be model, like: FileItem, ChatListUserItem, etc.
    user.update(updatedUser, this.userRepo).subscribe({
      next: (dto) => {
        this.showChangesSavedModal();
        this.userSearchStore.actions.find.execute(
          this.userSearchStore.values.lastActiveFilter
        );
      },
      error: (err) => console.error(err),
    });
  }

  getFormData() {
    const username = this.form.getUsername();
    const role = this.form.getRole();
    return {
      username,
      role,
    };
  }

  showChangesSavedModal() {
    const modal = document.getElementById(
      'changes_saved_modal'
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      setTimeout(() => modal.close(), 1000);
    }
  }
}
