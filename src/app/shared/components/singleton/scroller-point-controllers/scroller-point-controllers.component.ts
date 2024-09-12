import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scroller-point-controllers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroller-point-controllers.component.html',
  styleUrl: './scroller-point-controllers.component.css'
})
export class ScrollerPointControllersComponent {
  @Input() itemsArray!: any[];
  @Input() activeIndex!: number;
  @Input() clickableDotControllers: boolean = true;
  @Output() gotoIndex: EventEmitter<number> = new EventEmitter<number>();

  goto($index: number){
    if(!this.clickableDotControllers) return;
    this.gotoIndex.emit($index);
  }
}
