import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTheInitials'
})
export class GetTheInitialsPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(!value) return '';
    return value.charAt(0).toLocaleUpperCase();
  }

}
