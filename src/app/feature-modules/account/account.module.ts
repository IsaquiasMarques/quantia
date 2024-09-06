import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/containers/account.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { HeaderComponent } from './partials/header/header.component';
import { SharedModule } from '@shared/shared.module';
import { TipsComponent } from '@shared/components/singleton/tips/tips.component';
import { TransactionsComponent } from '@shared/components/views/transactions/transactions.component';

@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    TipsComponent,
    AccountRoutingModule,
    TransactionsComponent
  ]
})
export class AccountModule { }
