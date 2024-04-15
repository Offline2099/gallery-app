import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  monthName(monthNumber: string, short?: boolean): string {

    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    let m: number = parseInt(monthNumber) - 1;
    if (m < 0 || m >= 12) return 'Error';
    return short ? months[m].substring(0, 3) : months[m];
  }

  strToKebabCase(str: string) {
    return str
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s|\s\s+/g, '-')
      .toLowerCase();
  }

  capFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}

