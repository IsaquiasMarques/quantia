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
              description: 'Contabilidade Geral',
              icon: {
                id: '',
                reference: 'money',
                display: 'Money',
                embedded_svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 12H6.01M18 12H18.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`
              }
            },
            settings: {
              id: '',
              highlightColor: '#16171D',
              currency: currency
            },
            amount: artificialCardAmount
          });
        })
      }

      return artificialCards;
    }

}