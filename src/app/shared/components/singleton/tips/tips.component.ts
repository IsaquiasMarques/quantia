import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ToggleComponent } from '../toggle/toggle.component';
import { ITips } from '@core/models/entities/tips.model';
import { SharedModule } from '@shared/shared.module';
import { ControlledScrollWithLoader } from '@core/classes/abstracts/controlled-scroll-with-loader.class';
import { ScrollerPointControllersComponent } from "../scroller-point-controllers/scroller-point-controllers.component";
import { BackgroundUrlablePipe } from '@shared/pipes/css-supporter/background-urlable.pipe';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [
    ToggleComponent,
    BackgroundUrlablePipe,
    ScrollerPointControllersComponent
  ],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent
extends ControlledScrollWithLoader
implements OnInit {

  override itemsArray: ITips[] = [
    {
      id: '0',
      title: 'Domine Suas Finanças em 5 Passos Simples',
      imagePath: 'assets/images/account/tips/cover.png',
      category: 'Dica',
    },
    {
      id: '1',
      title: 'Domine Suas Finanças em 5 Passos Simples',
      imagePath: 'assets/images/account/tips/cover-2.png',
      category: 'Dica',
    },
    {
      id: '2',
      title: 'Domine Suas Finanças em 5 Passos Simples',
      imagePath: 'assets/images/account/tips/cover.png',
      category: 'Dica',
    },
    {
      id: '3',
      title: 'Domine Suas Finanças em 5 Passos Simples',
      imagePath: 'assets/images/account/tips/cover-2.png',
      category: 'Dica',
    },
  ];

  showTips: boolean = true;
  
  @ViewChild('tipsContentScroller') tipsContentScroller!: ElementRef<HTMLElement>;
  @ViewChild('sectionHeaderLimitedContainer') sectionHeaderLimitedContainer!: ElementRef<HTMLElement>

  ngOnInit(): void {
    
  }

  override bootstrap(){
    this.scrollerElementRef = this.tipsContentScroller;
    this.limitedContainerElementRef = this.sectionHeaderLimitedContainer;
  }

  tipsSectionToggleEventHandler($event: boolean){
    this.showTips = $event;
  }

}
