export class NumberFormatation{

    /**
     * Formata o número, adicionando separadores de milhares e preservando o separador decimal.
     * @param value - O valor bruto a ser formatado.
     * @param digits - O número de dígitos a serem separados
     * @param separator - O separador dos números
     * @returns O valor formatado.
    */
    static separateByNumberOfDigits(value: string, digits: number = 3, separator: string = '.'): string {
        
        // Substitui o ponto por vírgula se form um número decimal e
        // Remove caracteres inválidos, exceto números e vírgula
        const sanitizedValue = value.replaceAll('.', ' ').replace(/[^0-9,]/g, '');
        
        // Divide em parte inteira e decimal
        const [integerPart, decimalPart] = sanitizedValue.split(',');

        // Cria o regex dinamicamente com base no número de dígitos
        const regex = new RegExp(`\\B(?=(\\d{${digits}})+(?!\\d))`, 'g');

        // Adiciona separadores na parte inteira
        const formattedInteger = integerPart.replace(regex, separator);
        
        // Retorna o número formatado
        return decimalPart !== undefined ? `${formattedInteger},${decimalPart}` : formattedInteger;
    }

    /**
     * Remove o formato do número, retornando-o ao estado bruto (sem separadores).
     * @param value - O valor formatado.
     * @returns O valor desformatado.
    */
    static unformatNumber(value: string, replaceCommaByDot: boolean = true): string {
        return value.replace(/\./g, '').replace(',', (replaceCommaByDot) ? '.' : ','); // Remove os pontos usados como separadores de milhares
    }
}