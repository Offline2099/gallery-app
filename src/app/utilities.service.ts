import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  monthName(monthNumber: string, returnShort?: boolean): string {

    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    let m: number = parseInt(monthNumber) - 1;
    if (m < 0 || m >= 12) return 'Error';
    return returnShort ? months[m].substring(0, 3) : months[m];
  }

  strToKebabCase(str: string) {
    return str.toLowerCase().replace(/ /g,'-').replace(/[^a-zA-Z0-9-_]/g, '');
  }

  capFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  constructor() { }
}

