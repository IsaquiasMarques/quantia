import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public auth = inject(AuthService);

  ngOnInit(): void {
    // console.log(this.auth.user?.getUser);
  }

}
