import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: '[profile]',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userName: string;
  public isAuthenticated: boolean;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    let user = this.authSvc.getUser();
    if (user) {
      this.userName = user.name;
      this.isAuthenticated = true;
    }
  }

  public login(): void {
    this.authSvc.login();
  }

  public logout(): void {
    this.authSvc.logout();
  }
}
