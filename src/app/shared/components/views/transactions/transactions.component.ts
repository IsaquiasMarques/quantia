import { DecimalPipe, NgClass } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoaderSupporter } from '@core/classes/abstracts/loader-supporter.class';
import { TransactionOriginType } from '@core/enums/entities/transaction-origin-type.enum';
import { TransationType } from '@core/enums/entities/transation-type.enum';
import { ICard } from '@core/models/entities/cards.model';
import { IGoal } from '@core/models/entities/goals.model';
import { ITransaction } from '@core/models/entities/transaction.model';
import { EntitiesIntermediator } from '@feature-modules/account/services/entities-intermediator.service';
import { HumanFriendlyDate } from '@shared/pipes/date/human-friendly-date.pipe';
import { FormatPipe } from '@shared/pipes/number/format.pipe';
import { LoadSpinnerComponent } from 'src/app/components/load-spinner/load-spinner.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    LoadSpinnerComponent,
    NgClass,
    DecimalPipe,
    FormatPipe,
    HumanFriendlyDate,
    RouterLink
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent extends LoaderSupporter implements OnInit, OnChanges {
  @Input() transactions: ITransaction[] = [];
  @Input() activeCard!: ICard | undefined;
  @Input() activeGoal!: IGoal | undefined;
  groupedTransactions: Record<string, ITransaction[]> = {}

  transactionType = TransationType;
  transactionFrom = TransactionOriginType;

  public entitiesIntermediator = inject(EntitiesIntermediator);

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!(this.transactions.length > 0)) return;
    this.groupedTransactions = this.groupingByDate(this.transactions);

    if(this.activeCard && this.activeGoal){
      this.entitiesIntermediator.card = this.activeCard;
      this.entitiesIntermediator.goal = this.activeGoal;
    }
  }

  groupingByDate(transactions: ITransaction[]){
    return transactions.reduce((group, transaction) => {
      const date = new Date(transaction.transaction_date).toISOString().split('T')[0];
      if(!group[date]){
        group[date] = [];
      }
      group[date].push(transaction);
      return group;
    }, {} as Record<string, ITransaction[]>);
  }

  getDateKeys(groupedTransactions: { [date: string]: ITransaction[] }): string[]{
    return Object.keys(groupedTransactions);
  }

}
