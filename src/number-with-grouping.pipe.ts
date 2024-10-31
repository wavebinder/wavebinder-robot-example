import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'numberWithGrouping'
})
export class NumberWithGroupingPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private _locale: string) {
  }

  transform(value: number | string, digitsInfo?: number | string, locale?: string, grouping?: boolean): string | null;
  transform(value: null | undefined, digitsInfo?: number | string, locale?: string, grouping?: boolean): null;
  transform(value: number | string | null | undefined, digitsInfo?: number | string, locale?: string, grouping?: boolean): string | null;

  transform(value: number | string | null | undefined, digitsInfo?: number | string, locale?: string, grouping?: boolean): string
    | null {
    if (!this.isValue(value)) {
      return null;
    }
    if (digitsInfo == '-') {
      return String(value);
    }

    locale = locale || this._locale;
    grouping = grouping || false;
    digitsInfo = Number(digitsInfo || 0);
    try {
      const num = this.strToNumber(value);
      return num.toLocaleString(locale, {
        useGrouping: grouping,
        minimumFractionDigits: digitsInfo,
        maximumFractionDigits: digitsInfo
      });
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  isValue(value: number | string | null | undefined): value is number | string {
    return !(value == null || value === '' || value !== value);
  }


  strToNumber(value: number | string): number {
    // Convert strings to numbers
    if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
      return Number(value);
    }
    if (typeof value !== 'number') {
      throw new Error(`${value} is not a number`);
    }
    return value;
  }

}
