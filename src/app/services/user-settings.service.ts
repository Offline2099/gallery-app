import { Injectable } from '@angular/core';

import { ImageDataTabs } from '../interfaces/ui';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  showOverlay: boolean = false;
  settingsPanelOpen: boolean = false;
  simpleGalleryByTime: boolean = false;
  simpleGalleryByData: boolean = true;
  selectOnMouseover: boolean = false;
  imagesInRow: number = 3;
  showImageInfo: boolean = true;
  showImageCaptions: boolean = true;
  showImageData: boolean = false;
  showImageTags: boolean = false;
  imageDataTabActive: `${ImageDataTabs}` = ImageDataTabs.location;

  toggleOverlay(): void {
    this.showOverlay = !this.showOverlay;
  }

  toggleSettingsPanel(): void {
    this.settingsPanelOpen = !this.settingsPanelOpen;
  }

  toggleImageInfo(): void {
    this.showImageInfo = !this.showImageInfo;
  }

  toggleImageCaptions(): void {
    this.showImageCaptions = !this.showImageCaptions;
  }

  toggleImageData(): void {
    this.showImageData = !this.showImageData;
  }

  toggleImageTags(): void {
    this.showImageTags = !this.showImageTags;
  }

  toggleSelectOnMouseover(): void {
    this.selectOnMouseover = !this.selectOnMouseover;
  }
}
