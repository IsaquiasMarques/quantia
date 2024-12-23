import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanFriendlyDate',
  standalone: true
})
export class HumanFriendlyDate implements PipeTransform {

  transform(value: string): string {
    const year = value.split('-')[0];
    const month = value.split('-')[1];
    const day = value.split('-')[2];

    return `${ day } de ${ this.month(parseInt(month)) }, ${ year }`;
  }

  private month(numeric_month: number): string{
    switch(numeric_month){
      case 1:
        return 'Janeiro';
      case 2:
        return 'Fevereiro';
      case 3:
        return 'Março';
      case 4:
        return 'Abril';
      case 5:
        return 'Maio';
      case 6:
        return 'Junho';
      case 7:
        return 'Julho';
      case 8:
        return 'Agosto';
      case 9:
        return 'Setembro';
      case 10:
        return 'Outubro';
      case 11:
        return 'Novembro';
      case 12:
        return 'Dezembro';
      default:
        return numeric_month + ': mês não identificado';
    }
  }

}
