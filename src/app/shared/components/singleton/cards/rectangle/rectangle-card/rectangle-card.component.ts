import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICurrency } from '@core/models/entities/currencies.model';
import { Icon } from '@core/models/icon.model';
import { IconComponent } from '@shared/components/singleton/icon/icon.component';
import { FormatPipe } from '@shared/pipes/number/format.pipe';
import { PercentagePipe } from '@shared/pipes/number/percentage.pipe';
import { TemplateExtender } from '../../template.extender';

@Component({
  selector: 'app-rectangle-card',
  standalone: true,
  imports: [CommonModule, IconComponent, FormatPipe, PercentagePipe],
  templateUrl: './rectangle-card.component.html',
  styleUrl: './rectangle-card.component.css'
})
export class RectangleCardComponent extends TemplateExtender {
  @Input() icon!: Icon;
  @Input() highlightColor: string = '';
  @Input() tinyRightText: string = '';
  @Input({ required: true }) id: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() achievement: number = 0;
  @Input() amount: number = 0;
  @Input() currency!: ICurrency;
  @Input() showValue = false;
  @Input() cardDropdownButton: { visible: boolean, items: ('edit' | 'hideValues' | 'delete')[] } = { visible: true, items: [ "edit", "hideValues" ] }

}
