import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscriber } from '@core/classes/unsubscriber.class';
import { LoaderActionEnum } from '@core/enums/loader/loader.enum';
import { ICard } from '@core/models/entities/cards.model';
import { IGoal } from '@core/models/entities/goals.model';
import { Icon } from '@core/models/icon.model';
import { UserService } from '@core/services/entities/user/user.service';
import { Loader } from '@core/services/loader/loader.service';
import { PopupLogService, LogStatus } from '@core/services/loggers/pop-up-log.service';
import { CardFacade } from '@feature-modules/account/facades/card.facade';
import { GoalFacade } from '@feature-modules/account/facades/goal.facade';
import { IconFacade } from '@feature-modules/account/facades/icon.facade';
import { EntitiesIntermediator } from '@feature-modules/account/services/entities-intermediator.service';
import { NumberFormatation } from '@shared/helpers/number-format.func';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrl: './edit-goal.component.css'
})
export class EditGoalComponent extends Unsubscriber implements OnInit {

  public loaderService = inject(Loader);
  private cardFacade = inject(CardFacade);
  private goalFacade = inject(GoalFacade);
  private iconFacade = inject(IconFacade);
  public entitiesIntermediator = inject(EntitiesIntermediator);
  private log = inject(PopupLogService);
  public userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  editGoalFormGroup!: FormGroup;

  editGoalloaderActionEnum = LoaderActionEnum.EDIT_GOAL;
  getCardsLoaderActionEnum = LoaderActionEnum.CARDS;
  getIconsLoaderActionEnum = LoaderActionEnum.ICONS;

  theGoal: WritableSignal<IGoal[]> = signal([]);

  cards: ICard[] = [];
  selectedCard: ICard[] = [];

  icons: Icon[] = [];
  selectedIcon: Icon[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const id = params.get('id');
      if(!id){
        // 
        return;
      }

      this.getGoalById(id);
      
      this.editGoalFormGroup = new FormGroup({
        'name': new FormControl((this.theGoal().length > 0) ? this.theGoal()[0].name : '', [ Validators.required, Validators.maxLength(30) ]),
        'description': new FormControl((this.theGoal().length > 0) ? this.theGoal()[0].description : '', [ Validators.required, Validators.maxLength(30) ]),
        'achievement': new FormControl((this.theGoal().length > 0) ? NumberFormatation.separateByNumberOfDigits((this.theGoal()[0].achievement_amount).toString()) : 0, [ Validators.required ]),
        'actual_amount': new FormControl((this.theGoal().length > 0) ? NumberFormatation.separateByNumberOfDigits((this.theGoal()[0].goal_amount.amount).toString()) : 0, [ Validators.required, Validators.minLength(0) ])
      });
    });
    
    this.getCards();
    this.getIcons();

  }

  private getGoalById(goal_id: string): void{
    this.goalFacade.getGoals.pipe(take(1)).subscribe({
      next: object => {
        this.theGoal = signal(object[this.entitiesIntermediator.card[0].id].filter((item: IGoal) => item.id === goal_id))
      },
      error: error => {}
    })
  }

  private getCards(): void{
    this.loaderService.changeState(this.getCardsLoaderActionEnum, false);
    this.cardFacade.getCards.subscribe({
      next: cards => {
        this.cards = cards;
        if(this.icons.length > 0){
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

  captureSelectedCard($event: ICard[]): void{
    this.selectedCard = $event;
  }

  captureSelectedIcon($event: any[]): void{
    this.selectedIcon = $event;
  }

  submit(): void{
    if(
      this.editGoalFormGroup.invalid ||
      !(this.selectedCard.length > 0) ||
      !(this.selectedIcon.length > 0)
    ) return;

    const goal = {
      name: this.editGoalFormGroup.get('name')?.value,
      description: this.editGoalFormGroup.get('description')?.value,
      achievement_amount: NumberFormatation.unformatNumber(this.editGoalFormGroup.get('achievement')?.value),
      card_id: this.selectedCard[0].id,
      icon_id: this.selectedIcon[0].id,
      actual_amount: NumberFormatation.unformatNumber(this.editGoalFormGroup.get('actual_amount')?.value)
    }

    this.loaderService.changeState(this.editGoalloaderActionEnum, true);
    this.goalFacade.update(this.theGoal()[0].id, goal).subscribe({
      next: response => {
        if(response.error){
          this.log.add(response.error.message, LogStatus.ERROR);
          console.error(response.error.message)
          this.loaderService.changeState(this.editGoalloaderActionEnum, false);
          return;
        }

        if(response.status === 204){
          this.log.add("Meta editada", LogStatus.SUCCESS);
          this.editGoalFormGroup.reset();
          this.loaderService.changeState(this.editGoalloaderActionEnum, false);
          this.router.navigate(['/account']);
        }
      },
      error: error => {
        console.error(error);
        this.log.add(error, LogStatus.ERROR);
        this.loaderService.changeState(this.editGoalloaderActionEnum, false);
      }
    })

  }

}
