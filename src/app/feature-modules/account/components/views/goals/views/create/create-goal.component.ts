import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { SUPABASE_RESPONSE_STATUS } from '@core/enums/supabase-response-status.enum';
import { ICard } from '@core/models/entities/cards.model';
import { Icon } from '@core/models/icon.model';
import { UserService } from '@core/services/entities/user/user.service';
import { Loader } from '@core/services/loader/loader.service';
import { LogStatus, PopupLogService } from '@core/services/loggers/pop-up-log.service';
import { CardFacade } from '@feature-modules/account/facades/card.facade';
import { GoalFacade } from '@feature-modules/account/facades/goal.facade';
import { IconFacade } from '@feature-modules/account/facades/icon.facade';
import { EntitiesIntermediator } from '@feature-modules/account/services/entities-intermediator.service';
import { NumberFormatation } from '@shared/helpers/number-format.func';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrl: './create-goal.component.css'
})
export class CreateGoalComponent implements OnInit {

  public loaderService = inject(Loader);
  private cardFacade = inject(CardFacade);
  private goalFacade = inject(GoalFacade);
  private iconFacade = inject(IconFacade);
  public entitiesIntermediator = inject(EntitiesIntermediator);
  private log = inject(PopupLogService);
  public userService = inject(UserService);

  createGoalFormGroup!: FormGroup;

  createGoalloaderActionEnum = LoaderActionEnum.CREATE_GOAL;
  getCardsLoaderActionEnum = LoaderActionEnum.CARDS;
  getIconsLoaderActionEnum = LoaderActionEnum.ICONS;

  selectedCardGoalsLength: number = 0;

  cards: ICard[] = [];
  selectedCard: ICard[] = [];

  icons: Icon[] = [];
  selectedIcon: Icon[] = [];

  resetCardSelection: boolean = false;
  resetIconsSelection: boolean = false;

  SAVINGS_ACCOUNT = 'Conta Poupança'

  ngOnInit(): void {
    
    this.getCards();
    this.getIcons();

    this.createGoalFormGroup = new FormGroup({
      'name': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'achievement': new FormControl('', [ Validators.required ]),
      'actual_amount': new FormControl('0', [ Validators.required, Validators.minLength(0) ])
    });
  }

  private getCards(): void{
    this.loaderService.changeState(this.getCardsLoaderActionEnum, true);
    this.cardFacade.getCards.subscribe({
      next: cards => {
        this.cards = cards;
        if(this.cards.length > 0){
          this.loaderService.changeState(this.getCardsLoaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.getCardsLoaderActionEnum, false);
        }
      },
      error: error => {
        console.error(error);
        this.log.add(error, LogStatus.ERROR);
        this.loaderService.changeState(this.getCardsLoaderActionEnum, false);
      }
    });
  }

  private getIcons(): void{
    this.loaderService.changeState(this.getIconsLoaderActionEnum, true);
    this.iconFacade.all.subscribe({
      next: icons => {
        this.icons = icons;
        if(this.icons.length > 0){
          this.loaderService.changeState(this.getIconsLoaderActionEnum, false);
        } else {
          this.loaderService.changeStateAfterFirstResponseIsEmpty(this.getIconsLoaderActionEnum, false);
        }
      },
      error: error => {
        this.log.add(error, LogStatus.ERROR);
        console.error(error);
        this.loaderService.changeState(this.getIconsLoaderActionEnum, false);
      }
    });
  }

  compareCardObjective(card: ICard, objective: string = this.SAVINGS_ACCOUNT): boolean{
    return card.objective.description === objective;
  }

  changeAchievementValidatorSettings(): void{
    const isSavingsAccount = this.selectedCard.length > 0 && this.compareCardObjective(this.selectedCard[0]);
    const achievementControl = this.createGoalFormGroup.get('achievement');

    if(achievementControl){
      achievementControl.setValidators(isSavingsAccount ? [ Validators.required ] : []);
      achievementControl.updateValueAndValidity();
    }
  }

  captureSelectedCard($event: ICard[]): void{
    this.selectedCard = $event;
    this.changeAchievementValidatorSettings();
  }

  captureSelectedIcon($event: any[]): void{
    this.selectedIcon = $event;
  }

  submit(): void{
    if(
      this.createGoalFormGroup.invalid ||
      !(this.selectedCard.length > 0) ||
      !(this.selectedIcon.length > 0)
    ) return;

    const achievement_amount = (this.selectedCard.length > 0 && this.compareCardObjective(this.selectedCard[0])) ? 
                                NumberFormatation.unformatNumber(this.createGoalFormGroup.get('achievement')?.value) :
                                null;

    const goal = {
      name: this.createGoalFormGroup.get('name')?.value,
      description: this.createGoalFormGroup.get('description')?.value,
      achievement_amount: achievement_amount,
      card_id: this.selectedCard[0].id,
      icon_id: this.selectedIcon[0].id,
      actual_amount: NumberFormatation.unformatNumber(this.createGoalFormGroup.get('actual_amount')?.value)
    }

    this.loaderService.changeState(this.createGoalloaderActionEnum, true);
    this.goalFacade.create(goal).subscribe({
      next: response => {
        if(response.error){
          console.error(response.error);
          this.log.add(response.error.message, LogStatus.ERROR);
          this.loaderService.changeState(this.createGoalloaderActionEnum, false);
        }

        if(response.status === SUPABASE_RESPONSE_STATUS.SUCCESS_WITH_DATA){
          this.loaderService.changeState(this.createGoalloaderActionEnum, false);
          this.log.add("Meta adicionada", LogStatus.SUCCESS);
          this.createGoalFormGroup.reset();
          this.resetCardSelection = true;
          this.resetIconsSelection = true;
        }
      },
      error: error => {
        console.error(error);
        this.log.add(error, LogStatus.ERROR);
        this.loaderService.changeState(this.createGoalloaderActionEnum, false);
      }
    })

  }

}
