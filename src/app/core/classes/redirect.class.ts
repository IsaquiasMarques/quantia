import { Injectable, inject } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { LogStatus, PopupLogService } from "@core/services/loggers/pop-up-log.service";

@Injectable({
    providedIn: 'root'
})
export class RedirectTo{

    private router = inject(Router);
    private popup = inject(PopupLogService);

    route(routes: string[], extras?: NavigationExtras): RedirectTo{
        this.router.navigate(routes, extras);
        return this;
    }

    with(logStatus: LogStatus, message: string): void{
        this.popup.add(message, logStatus);
    }

    withError(message: string){
        this.popup.add(message, LogStatus.ERROR);
    }

}