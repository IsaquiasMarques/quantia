import { computed, Injectable, signal, Signal, WritableSignal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SeeMoneyService{

    private seeMoney: WritableSignal<boolean> = signal(false);
    public seeMoney$: Signal<boolean> = computed(() => this.seeMoney());

    changeSeeMoneyStatus(status: boolean): void{
        this.seeMoney.update(value => value = status);
    }

}