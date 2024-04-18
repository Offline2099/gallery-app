import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

import { Gallery } from '../../../interfaces/data';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-gallery-simple',
  templateUrl: './gallery-simple.component.html',
  styleUrls: ['./gallery-simple.component.css']
})
export class GallerySimpleComponent {

  constructor(public settings: UserSettingsService) { }

  @HostBinding('class.gallery-simple-desktop') @Input() desktop: boolean = false;
  @Input() g!: Gallery;

  @Output() changeImage = new EventEmitter<number>();

  toggleOverlay(image: number): void {
    this.changeImage.emit(image);
    this.settings.showOverlay = !this.settings.showOverlay;
  }

}
