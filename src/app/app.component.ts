import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { Loader } from '@core/services/loader/loader.service';
import { LogStatus, PopupLogService } from '@core/services/loggers/pop-up-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  logger = inject(PopupLogService);
  logStatus = LogStatus;
  loaderService = inject(Loader);
  loaderActionEnum = LoaderActionEnum;

  ngOnInit(): void {
    
  }

}
