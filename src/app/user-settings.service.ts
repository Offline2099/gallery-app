import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private userSettings = {
    panelOpen: false,
    showImageInfo: true,
    showImageCaptions: true,
    showImageData: false,
    imageDataTabActive: 'location',
    selectOnMouseover: false,
    simpleGalleryByTime: false,
    simpleGalleryByData: true,
    imagesInRow: 3
  };

  getUserSettings() {
    return this.userSettings;
  }

  setPanelStatus(val: boolean) {
    this.userSettings.panelOpen = val;
  }

  setShowImageInfo(val: boolean) {
    this.userSettings.showImageInfo = val;
  }

  setShowImageCaptions(val: boolean) {
    this.userSettings.showImageCaptions = val;
  }

  setShowImageData(val: boolean) {
    this.userSettings.showImageData = val;
  }

  setImageDataTabActive(val: string) {
    this.userSettings.imageDataTabActive = val;
  }

  setSelectOnMouseover(val: boolean) {
    this.userSettings.selectOnMouseover = val;
  }

  setSimpleGalleryByTime(val: boolean) {
    this.userSettings.simpleGalleryByTime = val;
  }

  setSimpleGalleryByData(val: boolean) {
    this.userSettings.simpleGalleryByData = val;
  }

  setImagesInRow(val: number) {
    this.userSettings.imagesInRow = val;
  }

  constructor() { }
}
