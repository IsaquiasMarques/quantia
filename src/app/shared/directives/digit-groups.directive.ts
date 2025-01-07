import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NumberFormatation } from '@shared/helpers/number-format.func';

@Directive({
  selector: '[appDigitGroups]'
})
export class DigitGroupsDirective {

  @Input({ required: true }) separator: string = '.';
  @Input({ required: true }) digits: number = 3;

  constructor(private el: ElementRef) { }
  
  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = this.el.nativeElement;
    const cursorPosition = input.selectionStart; // Posição do cursor antes de formatar
    let rawValue = input.value;

    let formattedValue = NumberFormatation.separateByNumberOfDigits(rawValue, this.digits, this.separator);
    // Atualiza o valor do input
    input.value = formattedValue;

    // Restaura a posição do cursor
    const newCursorPosition = this.calculateNewCursorPosition(cursorPosition, rawValue, formattedValue);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  }

  private calculateNewCursorPosition(cursorPosition: number, rawValue: string, formattedValue: string): number {
    // Calcula a diferença no tamanho do valor formatado
    const diff = formattedValue.length - rawValue.length;
    return cursorPosition + diff;
  }

}
