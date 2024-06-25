import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    
  }

  signOut(){
    this.authService.SignOut();
  }
}
