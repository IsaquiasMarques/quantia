import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LogStatus, PopupLogService } from '@core/services/loggers/pop-up-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  logger = inject(PopupLogService);
  location = inject(Location);
  logStatus = LogStatus;

  ngOnInit(): void {
    
  }

}
