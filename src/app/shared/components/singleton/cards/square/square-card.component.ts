import { Component, Input } from '@angular/core';
import { Icon } from '@core/models/icon.model';
import { FormatPipe } from '@shared/pipes/number/format.pipe';
import { RouterLink } from '@angular/router';
import { TemplateExtender } from '../template.extender';
import { IconComponent } from '../../icon/icon.component';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-square-card',
  standalone: true,
  imports: [DecimalPipe, NgClass, IconComponent, FormatPipe, RouterLink],
  templateUrl: './square-card.component.html',
  styleUrl: './square-card.component.css'
})
export class SquareCardComponent extends TemplateExtender {
  @Input() icon!: Icon;
  @Input() highlightColor: string = '';
  @Input() tinyRightText: string = '';
  @Input() title: string = '';
  @Input({ required: true }) id: string = '';
  @Input() description: string = '';
  @Input() amount: number = 0;
  @Input() showValue = false;
  @Input() showBottomInformations = true;
  @Input() cardDropdownButton: { visible: boolean, items: ('edit' | 'hideValues' | 'delete')[] } = { visible: false, items: [ "edit", "hideValues" ] }
  showCardDropdown: boolean = false;

  @Input() isActive: boolean = false;

  toggleCardDropdown(): void{
    if(this.showCardDropdown){
      this.closeCardDropdown();
    } else {
      this.openCardDropdown();
    }
  }

  deleteItem(): void{
   if(window.confirm("Deseja realmente eliminar este item?")){
     this.deletionService.deleteCard(this.id);
   }
  }

  openCardDropdown(): void{
    this.showCardDropdown = true;
  }

  closeCardDropdown(): void{
    this.showCardDropdown = false;
  }

}
