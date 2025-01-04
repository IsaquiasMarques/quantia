import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconEnum } from '@core/enums/icon.enum';
import { Icon } from '@core/models/icon.model';
import { HtmlSanitizerPipe } from '@shared/pipes/html/html-sanitizer.pipe';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [ HtmlSanitizerPipe ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent implements OnChanges {
  @Input({ required: true }) icon!: Icon;
  @Input({ required: true }) color!: string;
  @Input() width: string = '24px';
  @Input() heigth: string = '24px';

  renderedIcon: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(this.icon){
      this.renderedIcon = this.applyColor(this.icon.embedded_svg, this.color);
    }
  }

  private applyColor(svg: string, color: string): string {
    return svg.replace(/stroke=".*?"/g, `stroke="${color}"`)
              .replace('width="24px"', `width="${this.width}"`)
              .replace('heigth="24px"', `heigth="${this.heigth}"`);
  }
}
