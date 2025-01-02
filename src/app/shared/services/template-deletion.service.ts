import { inject, Injectable } from "@angular/core";
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
        this.cardFacade.deleteCard(card_id).subscribe({
            next: (response) => {
                if(response.error){
                    this.loggerService.add(response.error.message, LogStatus.ERROR);
                    console.error(response.error.message)
                    return;
                }

                if(response.status === 204){
                    this.loggerService.add("Cartão eliminado", LogStatus.SUCCESS);
                }
            },
            error: (error) => {
                console.log()
            }
        });
    }

}