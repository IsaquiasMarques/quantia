import { inject, Injectable } from "@angular/core";
import { ICurrency } from "@core/models/entities/currencies.model";
import { CurrencyService } from "@core/services/entities/currencies/currency.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CurrencyFacade{
    private currencyService = inject(CurrencyService);

    getCurrencies(): Observable<ICurrency[]>{
        return this.currencyService.all;
    }
}