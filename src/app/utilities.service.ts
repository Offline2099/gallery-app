import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  monthName(monthNumber: string, returnShort?: boolean): string {

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    let m: number = parseInt(monthNumber);
    if (m < 1 || m > 12) return 'Error';
    return returnShort ? months[m - 1].substring(0, 3) : months[m - 1];
  }

  strToKebabCase(str: string) {
    return str.toLowerCase().replace(/\'/g,'').replace(/:/g,'').replace(/ /g,'-');
  }

  capFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  constructor() { }
}

