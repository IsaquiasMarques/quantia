import { Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { ICard } from "@core/models/entities/cards.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CardFacade extends FacadeExtender{
    get getCards(): Observable<ICard[]>{
        return this.dataByKey('cards');
    }
}