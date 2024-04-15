import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Gallery } from '../../../interfaces/data';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-gallery-simple',
  host: {'class': 'gallery-simple'},
  templateUrl: './gallery-simple.component.html',
  styleUrls: ['./gallery-simple.component.css']
})
export class GallerySimpleComponent {

  constructor(public userSettings: UserSettingsService) { }

  @Input() desktop: boolean = true;
  @Input() g!: Gallery;

  @Output() changeImage = new EventEmitter<number>();

  toggleOverlay(image: number): void {
    this.changeImage.emit(image);
    this.userSettings.showOverlay = !this.userSettings.showOverlay;
  }

}
