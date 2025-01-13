import { inject, Injectable } from "@angular/core";
import { SUPABASE_RESPONSE_STATUS } from "@core/enums/supabase-response-status.enum";
import { LogStatus, PopupLogService } from "@core/services/loggers/pop-up-log.service";
import { CardFacade } from "@feature-modules/account/facades/card.facade";
import { GoalFacade } from "@feature-modules/account/facades/goal.facade";

@Injectable({
    providedIn: 'root'
})
export class TemplateDeletionService{

    private cardFacade = inject(CardFacade);
    private goalFacade = inject(GoalFacade);
    private loggerService = inject(PopupLogService);

    deleteCard(card_id: string): void{
        this.cardFacade.delete(card_id).subscribe({
            next: (response) => {
                if(response.error){
                    this.loggerService.add(response.error.message, LogStatus.ERROR);
                    console.error(response.error.message)
                    return;
                }

                if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_EMPTY){
                    this.loggerService.add("Cartão eliminado", LogStatus.SUCCESS);
                }
            },
            error: (error) => {
                this.loggerService.add(error.message, LogStatus.ERROR);
                console.error(error)
            }
        });
    }

    deleteGoal(goal_id: string, card_id: string): void{
        this.goalFacade.delete(goal_id, card_id).subscribe({
            next: (response) => {
                if(response.error){
                    this.loggerService.add(response.error.message, LogStatus.ERROR);
                    console.error(response.error.message)
                    return;
                }

                if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_EMPTY){
                    this.loggerService.add("Meta eliminada", LogStatus.SUCCESS);
                }
            },
            error: error => {
                this.loggerService.add(error.message, LogStatus.ERROR);
                console.error(error)
            }
        });
    }

}