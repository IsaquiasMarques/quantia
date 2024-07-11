import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export class Unsubscriber implements OnDestroy{

    unsubscribe$ = new Subject<void>();

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}