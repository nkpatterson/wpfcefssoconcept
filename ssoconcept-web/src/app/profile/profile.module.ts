import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  providers: [AuthService],
  bootstrap: [ProfileComponent]
})
export class ProfileModule { }
