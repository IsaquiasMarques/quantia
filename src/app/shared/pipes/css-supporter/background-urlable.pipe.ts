import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundUrlable'
})
export class BackgroundUrlablePipe implements PipeTransform {

  DEFAULT_TIP_BACKGROUND: string = 'assets/images/account/tips/cover-png';

  transform(value: string | undefined): string {
    return `url(${ (value || value?.length !== 0) ? value : this.DEFAULT_TIP_BACKGROUND })`;
  }

}
