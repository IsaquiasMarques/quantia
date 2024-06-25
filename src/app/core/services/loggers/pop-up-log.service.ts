import { Injectable, OnDestroy, signal } from "@angular/core";
import { APP_CONFIG } from "@core/config/app.config";

export enum LogStatus{
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    DEFAULT = 'default'
}

interface Logger{
    message: string,
    status: LogStatus,
    identifier: number
}

@Injectable({
    providedIn: 'root'
})
export class PopupLogService{

    private logs: Logger[] = [];
    logs$ = signal<Logger[]>([]);
    private removeTimeOut: any;

    add(message: string, status: LogStatus = LogStatus.DEFAULT): void{
        let randomId;
        do {
            randomId = this.randomize(1, 100);
        } while (this.existentId(randomId));
        let theLog = { message: message, status: status, identifier: randomId };
        this.logs.push( theLog );
        this.refreshLogs$();
        this.removeMessageAfterTimeInSeconds(theLog, APP_CONFIG.POP_UP_TIMEOUT);
    }

    private refreshLogs$(){
        this.logs$.update(logs => logs = this.logs);
    }

    private removeMessageAfterTimeInSeconds(log: Logger, timer: number){
        this.removeTimeOut = setTimeout(() => {
            let logIndex = this.logs.findIndex(item => item.identifier === log.identifier);
            if(logIndex === -1) return;
            this.logs.splice(logIndex, 1);
            this.refreshLogs$();
        }, timer * 1000)
    }

    private randomize(min: number, max: number): number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private existentId(id: number): boolean{
       return (this.logs.filter(item => item.identifier === id).length > 0) ? true : false;
    }

}