import { inject, Injectable } from "@angular/core";
import { FacadeExtender } from "@core/classes/facades.extender";
import { SUPABASE_RESPONSE_STATUS } from "@core/enums/supabase-response-status.enum";
import { ICard } from "@core/models/entities/cards.model";
import { IPlan } from "@core/models/entities/plan.model";
import { CardService } from "@core/services/entities/cards/card.service";
import { catchError, filter, map, Observable, switchMap, take, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CardFacade extends FacadeExtender{

    private cardService = inject(CardService);

    get getCards(): Observable<ICard[]>{
        return this.dataByKey('cards');
    }

    getCardById(id: string): Observable<ICard[]>{
        return this.dataByKey('cards').pipe(
            map((items: ICard[]) => items.filter(item => item.id === id))
        )
    }

    createCardWithSettings(card: any): Observable<any>{
        return this.cardService.getCardsFromUser(this.userService.getUser())
                .pipe(
                    map((existingCards: ICard[]) => {
                        if(existingCards.length >= this.userService.getUser()!.plan!.limits.cards){
                            throw new Error("O limite de cartões para o seu plano foi atingido");
                        }
                        return this.userService.getUser()!.plan;
                    }),
                    switchMap(() => {
                        return this.cardService.createCardWithSettings(this.userService.getUser(), card);
                    }),
                    tap(response => {
                        if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_WITH_DATA){
                            this.actions.getCards();
                        }
                        return response;
                    }),
                    catchError(error => throwError(() => error))
                )
    }

    update(card_id: string, card: any): Observable<any>{
        return this.cardService.updateCardWithSettings(card_id, card).pipe(
            tap(response => {
                if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_EMPTY){
                    this.actions.getCards();
                }
                return response;
            }),
        );
    }

    delete(card_id: string): Observable<any>{
        return this.cardService.delete(card_id).pipe(
            tap(response => {
                if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_EMPTY){
                    this.actions.getCards();
                }
                return response;
            }),
        );
    }

}