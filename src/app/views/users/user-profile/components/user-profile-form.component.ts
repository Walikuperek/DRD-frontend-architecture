import { Component, Input } from '@angular/core';
import { User } from 'src/app/features/users/domain';

@Component({
  selector: 'app-user-profile-form',
  template: `
    <form autocomplete="off" class="form-group" *ngIf="user">
      <label for="username">Username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        value="{{ user.profile.username }}"
      />
      <hr />
      <label for="role">Role</label>
      <input
        [disabled]="disabledUpdateRole"
        type="text"
        class="form-control"
        id="role"
        value="{{ user.role }}"
      />
    </form>
  `,
})
export class UserProfileFormComponent {
  @Input() user: User | null = null;
  @Input() disabledUpdateRole: boolean = true;

  getUsername(): string {
    return (document.getElementById('username') as HTMLInputElement).value;
  }

  getRole(): string {
    return (document.getElementById('role') as HTMLInputElement).value;
  }
}
