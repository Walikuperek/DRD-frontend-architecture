import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <h1>Home</h1>
      <p class="m-0">
        This is the DRD (<span class="text-muted">DTO* Repository Domain</span>)
        Architecture design example.
      </p>
      <p class="text-muted fs-24 m-0">* Data Transfer object</p>

      <hr />

      <button routerLink="/users" class="fs-24">
        User Search View + Edit User View
      </button>
    </div>
  `,
})
export class HomeComponent {}
