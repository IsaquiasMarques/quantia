import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/containers/auth.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { RecoveryComponent } from './components/views/recovery/recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/views/sign-in/sign-in.component';
import { SharedModule } from '@shared/shared.module';
import { ResetPasswordComponent } from './components/views/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    RecoveryComponent,
    ResetPasswordComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
