import { CommonModule, DecimalPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICurrency } from '@core/models/entities/currencies.model';
import { Icon } from '@core/models/icon.model';
import { IconComponent } from '@shared/components/singleton/icon/icon.component';
import { FormatPipe } from '@shared/pipes/number/format.pipe';
import { PercentagePipe } from '@shared/pipes/number/percentage.pipe';
import { TemplateExtender } from '../../template.extender';
import { RouterLink } from '@angular/router';
import { ICard } from '@core/models/entities/cards.model';

@Component({
  selector: 'app-rectangle-card',
  standalone: true,
  imports: [DecimalPipe, NgClass, RouterLink, IconComponent, FormatPipe, PercentagePipe],
  templateUrl: './rectangle-card.component.html',
  styleUrl: './rectangle-card.component.css'
})
export class RectangleCardComponent extends TemplateExtender {
  @Input({ required: true }) icon!: Icon;
  @Input() highlightColor: string = '';
  @Input() tinyRightText: string = '';
  @Input({ required: true }) id: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() achievement: number = 0;
  @Input() amount: number = 0;
  @Input() card!: ICard;
  @Input() showValue = false;

  @Input() cardDropdownButton: { visible: boolean, items: ('edit' | 'hideValues' | 'delete')[] } = { visible: false, items: [ "edit", "hideValues" ] }
  showCardDropdown: boolean = false;

  toggleCardDropdown(): void{
    if(this.showCardDropdown){
      this.closeCardDropdown();
    } else {
      this.openCardDropdown();
    }
  }

  deleteItem(): void{
   if(window.confirm("Deseja realmente eliminar este item?")){
     this.deletionService.deleteGoal(this.id, this.card.id);
   }
  }

  openCardDropdown(): void{
    this.showCardDropdown = true;
  }

  closeCardDropdown(): void{
    this.showCardDropdown = false;
  }
}
