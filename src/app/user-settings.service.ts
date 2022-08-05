import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private userSettings = {
    selectOnMouseover: false
  };

  getUserSettings() {
    return this.userSettings;
  }

  setSelectOnMouseover(val: boolean) {
    this.userSettings.selectOnMouseover = val;
  }

  constructor() { }
}
