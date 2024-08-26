import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}
