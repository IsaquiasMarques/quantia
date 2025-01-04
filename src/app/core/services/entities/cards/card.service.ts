import { inject, Injectable } from "@angular/core";
import { User } from "@core/classes/entities/User/user.class";
import { ICardObjective } from "@core/models/entities/card-objective.model";
import { ICardSettings } from "@core/models/entities/card-settings.model";
import { ICard } from "@core/models/entities/cards.model";
import { SupabaseService } from "@core/services/supabase/supabase.service";
import { from, map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CardService{

    private supabase: SupabaseService = inject(SupabaseService);

    getCardsFromUser(user: User | null): Observable<ICard[]>{
        return from(
            this.supabase.supabase
            .from('cards')
            .select(`
                id,
                name,
                created_at,
                objective_id:cardObjectives(
                    id,
                    description,
                    icon_id:icons(id,reference,display,embedded_svg)
                ),
                cardSettings(
                    id,
                    highlightColor,
                    currency_id:currencies(
                        id,
                        name,
                        description
                    )
                ),
                cardGoals (
                    goalAmount:goalAmount(
                        id,
                        amount
                    )
                )
            `)
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false })
        ).pipe(
            map((incoming: any) => {
                if(incoming.error){
                    throw new Error(incoming.error.message);
                }

                const cardWithAmounts = incoming.data.map((card: any) => {

                    let cardObjective: ICardObjective;
                    cardObjective = {
                        id: card.objective_id.id,
                        description: card.objective_id.description,
                        icon: {
                            id: card.objective_id.icon_id.id,
                            reference: card.objective_id.icon_id.reference,
                            display: card.objective_id.icon_id.display,
                            embedded_svg: card.objective_id.icon_id.embedded_svg
                        }
                    }

                    let cardSettings: ICardSettings;
                    cardSettings = {
                        id: card.cardSettings[0].id,
                        highlightColor: card.cardSettings[0].highlightColor,
                        currency: {
                            id: card.cardSettings[0].currency_id.id,
                            name: card.cardSettings[0].currency_id.name,
                            description: card.cardSettings[0].currency_id.description
                        }
                    }

                    const cardAmount = card.cardGoals.reduce((total: number, goal: any) => {
                        const goalAmount = goal.goalAmount ? goal.goalAmount.amount : 0;
                        return goalAmount + total;
                    }, 0)

                    return {
                        id: card.id,
                        name: card.name,
                        objective: cardObjective,
                        settings: cardSettings,
                        amount: cardAmount
                    }
                })
                return cardWithAmounts;
            })
        );
    }

    createCardWithSettings(user: User | null, card: any): Observable<any>{
        return this.createCard(user, card).pipe(
            switchMap((cardResponse: any) => {
                const cardId: string | null = cardResponse.data.id;
                if(!cardId) throw new Error('Failed to create card: ID not returned.');
                return this.createSettings(cardId, card);
            })
        )
    }

    private createCard(user: User | null, card: { name: string, objective_id: string }): Observable<any>{
        return from(
            this.supabase.supabase.from('cards')
                .insert(
                    {
                        user_id: user?.id,
                        name: card.name,
                        objective_id: card.objective_id
                    }
                )
                .select('id').single()
        );
    }

    private createSettings(card_id: string | null, settings: { highlightColor: string, currency_id: string }): Observable<any>{
        return from(
            this.supabase.supabase.from('cardSettings')
                .insert(
                    {
                        card_id: card_id,
                        highlightColor: settings.highlightColor,
                        currency_id: settings.currency_id
                    }
                )
        );
    }

    editCardWithSettings(card_id: string, card: any): Observable<any>{
        return this.editCard(card_id, card).pipe(
            switchMap((cardResponse: any) => {
                return this.editCardSettings(card_id, card);
            })
        )
    }

    private editCard(card_id: string, card: { name: string, objective_id: string }): Observable<any>{
        return from(
            this.supabase.supabase.from('cards').update({ name: card.name, objective_id: card.objective_id }).eq('id', card_id).select().single()
        )
    }

    private editCardSettings(card_id: string, settings: { highlightColor: string, currency_id: string }): Observable<any>{
        return from(
            this.supabase.supabase.from('cardSettings')
            .update(
                {
                    highlightColor: settings.highlightColor,
                    currency_id: settings.currency_id
                }
            ).eq('card_id', card_id)
        )
    }

    delete(card_id: string): Observable<any>{
        return from(
            this.supabase.supabase.from('cards').delete().eq('id', card_id)
        )
    }

}