import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.supabaseClient.from('users').select('id, plan_id:plans(name)').then(console.log);
  }

  ngOnDestroy(): void {
    
  }
  
}
