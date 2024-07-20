import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon } from '@core/models/icon.model';
import { IconComponent } from '../../icon/icon.component';
import { FormatPipe } from '@shared/pipes/number/format.pipe';

@Component({
  selector: 'app-square-card',
  standalone: true,
  imports: [CommonModule, IconComponent, FormatPipe],
  templateUrl: './square-card.component.html',
  styleUrl: './square-card.component.css'
})
export class SquareCardComponent {
  @Input() icon!: Icon;
  @Input() highlightColor: string = '';
  @Input() tinyRightText: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() amount: number = 0;
}
