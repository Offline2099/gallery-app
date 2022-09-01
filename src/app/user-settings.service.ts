import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private userSettings = {
    panelOpen: false,
    selectOnMouseover: false,
    showImageData: true,
    simpleGallery: false,
    imagesInRow: 3
  };

  getUserSettings() {
    return this.userSettings;
  }

  setPanelStatus(val: boolean) {
    this.userSettings.panelOpen = val;
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

  setImagesInRow(val: number) {
    this.userSettings.imagesInRow = val;
  }

  constructor() { }
}
