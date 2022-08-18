import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  monthName(monthNumber: string | undefined, short?: boolean): string {

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    let monthInt: number;

    if (!monthNumber) return 'Unknown';
    monthInt = parseInt(monthNumber);
    if (monthInt < 1 || monthInt > 12) return 'Unknown';

    if (short) return months[monthInt - 1].substring(0, 3);
    return months[monthInt - 1];
  }

  // times(max: Number) {
  //   return {
  //     [Symbol.iterator]: function* () {
  //       for (let i = 0; i < max; i++, yield) {}
  //     }
  //   };
  // }

  strToKebabCase(str: string | undefined) {
    if (!str) return '';
    return str.toLowerCase().replace('\'', '').replace(' ', '-');
  }

  constructor() { }
}
