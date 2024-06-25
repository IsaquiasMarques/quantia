import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/containers/auth.component';
import { SignInComponent } from './components/views/sign-in/sign-in.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';
import { RecoveryComponent } from './components/views/recovery/recovery.component';
import { ResetPasswordComponent } from './components/views/reset-password/reset-password.component';
import { resetPasswordGuard } from '@core/guards/reset-password.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        title: 'Entrar na minha conta',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        title: 'Criar a minha conta',
        component: SignUpComponent,
      },
      {
        path: 'recovery',
        title: 'Recuperar a minha conta',
        component: RecoveryComponent
      },
      {
        path: 'reset-password',
        title: 'Reposição de senha',
        component: ResetPasswordComponent,
        canActivate: [ resetPasswordGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
