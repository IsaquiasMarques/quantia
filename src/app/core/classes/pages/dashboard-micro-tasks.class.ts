import { Directive, inject } from "@angular/core";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";
import { ICard } from "@core/models/entities/cards.model";
import { Loader } from "@core/services/loader/loader.service";

@Directive()
export class DashboardMicroTasks{

    protected loader = inject(Loader);            
    
    getCardsMicroTask(incoming: ICard[]){
        let cards: ICard[] = incoming;
        if(cards.length > 0){
          this.loader.changeState(LoaderActionEnum.CARDS, false);
          return cards;
        } else {
          this.loader.changeStateAfterFirstResponseIsEmpty(LoaderActionEnum.CARDS, false);
          return [];
        }
    }

}