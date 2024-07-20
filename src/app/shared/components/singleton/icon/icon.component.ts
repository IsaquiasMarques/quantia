import { Component, Input } from '@angular/core';
import { IconEnum } from '@core/enums/icon.enum';
import { Icon } from '@core/models/icon.model';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input() icon!: Icon;
  iconEnum = IconEnum;
}
