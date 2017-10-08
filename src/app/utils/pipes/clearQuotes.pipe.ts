import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'clearQuotes'})

export class ClearQuotes implements PipeTransform {
  transform(input: string, symbol?: string): any {
    const symbolToReplace = symbol ? symbol : '"';
    return input.replace(symbol, '');
  }
}
