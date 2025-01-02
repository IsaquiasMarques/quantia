import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDigitGroups]'
})
export class DigitGroupsDirective {

  @Input('appDigitGroups') locale: string = 'en-US';
  @Input() separator: string = ' ';

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = this.el.nativeElement;
    const cursorPosition = input.selectionStart; // Posição do cursor antes de formatar
    let rawValue = input.value;

    // Se o valor já tem uma vírgula, separamos a parte inteira da parte decimal
    const [integerPart, decimalPart] = rawValue.split(',');

    // Remove todos os caracteres não numéricos da parte inteira, mas preserva os números
    const cleanedIntegerPart = integerPart.replace(/[^\d]/g, '');
    const cleanedDecimalPart = decimalPart ? decimalPart.replace(/[^\d]/g, '') : '';

    // Formata a parte inteira com separadores de milhares (ponto)
    const formattedInteger = this.formatWithThousandsSeparator(cleanedIntegerPart);

    // Se houver parte decimal, junta com a parte inteira
    let formattedValue = formattedInteger;
    if (cleanedDecimalPart) {
      formattedValue = `${formattedValue},${cleanedDecimalPart}`;
    }

    // Atualiza o valor do input com a formatação
    input.value = formattedValue;

    // Restaura a posição do cursor após formatação
    const newCursorPosition = this.calculateNewCursorPosition(cursorPosition, rawValue, formattedValue);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
  }

  private formatWithThousandsSeparator(value: string): string {
    // Adiciona separadores de milhares usando ponto
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  private calculateNewCursorPosition(cursorPosition: number, rawValue: string, formattedValue: string): number {
    // Calcula a diferença no tamanho do valor formatado e retorna a nova posição do cursor
    const diff = formattedValue.length - rawValue.length;
    return cursorPosition + diff;
  }

}
