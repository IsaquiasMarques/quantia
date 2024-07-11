import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { Unsubscriber } from '@core/classes/unsubscriber.class';
import { Actions } from '@core/data/actions/actions.data';
import { Store } from '@core/data/store/store.data';
import { IPlan } from '@core/models/entities/plan.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent
implements OnInit {

  private actions = inject(Actions);

  ngOnInit(): void {
    this.actions.getPlan();
    this.actions.getSettings();
    this.actions.getCards();
  }
  
}
