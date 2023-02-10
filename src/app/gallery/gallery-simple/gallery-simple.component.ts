import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Gallery } from '../../data/data-types';
import { UserSettingsService } from '../../user-settings.service';

@Component({
  selector: 'app-gallery-simple',
  host: {'class': 'gallery-simple'},
  templateUrl: './gallery-simple.component.html',
  styleUrls: ['./gallery-simple.component.css']
})
export class GallerySimpleComponent implements OnInit {

  @Input() desktop: boolean = true;
  @Input() g!: Gallery;

  @Output() changeImage = new EventEmitter<number>();

  constructor(public userSettings: UserSettingsService) { }

  ngOnInit(): void {
  }

  toggleImageCaptions(): void {
    this.userSettings.showImageCaptions = !this.userSettings.showImageCaptions;
  }

  toggleImageData(): void {
    this.userSettings.showImageData = !this.userSettings.showImageData;
  }

  toggleImageTags(): void {
    this.userSettings.showImageTags = !this.userSettings.showImageTags;
  }

  toggleOverlay(image: number): void {
    this.changeImage.emit(image);
    this.userSettings.showOverlay = !this.userSettings.showOverlay;
  }

}
