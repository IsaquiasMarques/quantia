import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from '@templates/management/management.component';
import { authenticationGuard } from '@core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature-modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./feature-modules/account/account.module').then(m => m.AccountModule),
    canActivate: [ authenticationGuard ]
  },
  {
    path: 'admin',
    component: ManagementComponent,
    // canActivate: 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
