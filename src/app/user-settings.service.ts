import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private userSettings = {
    selectOnMouseover: false,
    showImageData: true,
    simpleGallery: false
  };

  getUserSettings() {
    return this.userSettings;
  }

  setSelectOnMouseover(val: boolean) {
    this.userSettings.selectOnMouseover = val;
  }

  setShowImageData(val: boolean) {
    this.userSettings.showImageData = val;
  }

  setSimpleGallery(val: boolean) {
    this.userSettings.simpleGallery = val;
  }

  constructor() { }
}
