import { Component } from '@angular/core';
import { AuthService } from './profile/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  WelcomeMessage = '';

  constructor(private authSvc: AuthService) {
    let user = authSvc.getUser();
    if (user) {
      this.WelcomeMessage = JSON.stringify(user);
    }
  }
}
