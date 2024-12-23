import { computed, Directive, inject } from "@angular/core";
import { LoaderActionEnum } from "@core/enums/loader/loader.enum";
import { ICard } from "@core/models/entities/cards.model";
import { Loader } from "@core/services/loader/loader.service";
import { Unsubscriber } from "../unsubscriber.class";
import { IconEnum } from "@core/enums/icon.enum";
import { ICurrency } from "@core/models/entities/currencies.model";
import { IGoal } from "@core/models/entities/goals.model";
import { ITransaction } from "@core/models/entities/transaction.model";

@Directive()
export class DashboardMicroTasks extends Unsubscriber{

    protected loader = inject(Loader);
    
    getCardsWithLoadingMicroTask(incoming: ICard[]){
        let cards: ICard[] = incoming;

        if(cards.length > 0){
          this.loader.changeState(LoaderActionEnum.CARDS, false);
          return cards;
        } else {
          this.loader.changeStateAfterFirstResponseIsEmpty(LoaderActionEnum.CARDS, false);
          return [];
        }
    }

    getCardGoalsWithLoadingMicroTask(incoming: IGoal[]){
      let goals: IGoal[] = incoming;

      if(goals.length > 0){
        this.loader.changeState(LoaderActionEnum.GOALS, false);
        return goals;
      } else {
        this.loader.changeStateAfterFirstResponseIsEmpty(LoaderActionEnum.GOALS, false, 1.5);
        return [];
      }
    }

    getTransactionsWithLoadingMicroTask(incoming: ITransaction[]){
      let transactions: ITransaction[] = incoming;

      if(transactions.length > 0){
        this.loader.changeState(LoaderActionEnum.TRANSACTIONS, false);
        return transactions;
      } else {
        this.loader.changeStateAfterFirstResponseIsEmpty(LoaderActionEnum.TRANSACTIONS, false);
        return [];
      }
    }

    getGeneralAmountCardsMicroTask(incoming: ICard[]): ICard[]{
      let currencies: ICurrency[] = [];
      let artificialCards: ICard[] = [];
      incoming.forEach(card => {
        currencies.push(card.settings.currency);
      })
          
      if(currencies.length > 0){
        currencies.forEach(currency => {

          let cardsWithTheCurrency = incoming.filter(card => card.settings.currency.id === currency.id);
          let artificialCardAmount = cardsWithTheCurrency.reduce((total: number, card: ICard) => total + card.amount, 0)

          let existentCard = artificialCards.findIndex(card => card.settings.currency.id === currency.id);
          if(existentCard !== -1) return;
          artificialCards.push({
            id: '',
            name: ('Total - ' + currency.name).toUpperCase(),
            objective: {
              id: '',
              description: 'Contabilidade Geral'
            },
            settings: {
              id: '',
              highlightColor: '#16171D',
              currency: currency
            },
            iconRef: IconEnum.MONEY,
            amount: artificialCardAmount
          });
        })
      }

      return artificialCards;
    }

}