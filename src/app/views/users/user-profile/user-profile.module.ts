import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileFormComponent } from './components/user-profile-form.component';

@NgModule({
  declarations: [UserProfileComponent, UserProfileFormComponent],
  imports: [CommonModule, UserProfileRoutingModule],
})
export class UserProfileModule {}
