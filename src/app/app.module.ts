import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './templates/authentication/authentication.component';
import { AccountComponent } from './templates/account/account.component';
import { ManagementComponent } from './templates/management/management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    AccountComponent,
    ManagementComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
