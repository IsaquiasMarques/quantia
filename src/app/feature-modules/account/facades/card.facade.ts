import { inject, Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { ICard } from "@core/models/entities/cards.model";
import { IPlan } from "@core/models/entities/plan.model";
import { CardService } from "@core/services/entities/cards/card.service";
import { catchError, map, Observable, switchMap, take, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CardFacade extends FacadeExtender{

    private cardService = inject(CardService);

    get getCards(): Observable<ICard[]>{
        return this.dataByKey('cards');
    }

    createCardWithSettings(card: any): Observable<any>{
        return this.cardService.getCardsFromUser(this.userService.getUser())
                .pipe(
                    map((existingCards: ICard[]) => {
                        if(existingCards.length >= this.userService.getUser()!.plan!.limits.cards){
                            throw new Error("Limite de cartões atingido para o plano seu actual");
                        }
                        return this.userService.getUser()!.plan;
                    }),
                    switchMap(() => {
                        return this.cardService.createCardWithSettings(this.userService.getUser(), card);
                    }),
                    tap(response => {
                        if(response.status === 201){
                            this.actions.getCards();
                        }
                        return response;
                    }),
                    catchError(error => {
                        return throwError(() => error)
                    })
                )
        
    }
}