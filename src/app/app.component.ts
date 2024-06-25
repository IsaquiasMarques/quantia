import { Component, inject } from '@angular/core';
import { LogStatus, PopupLogService } from '@core/services/loggers/pop-up-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  logger = inject(PopupLogService);
  logStatus = LogStatus;
}
