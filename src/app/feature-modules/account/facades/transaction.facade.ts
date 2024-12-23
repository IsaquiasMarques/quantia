import { Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TransactionFacade extends FacadeExtender{
    get getTransactions(): Observable<any>{
        return this.dataByKey('transactions');
    }
}