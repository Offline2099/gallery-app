import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { SelectedImage } from '../../../interfaces/ui';
import { UserSettingsService } from '../../../services/user-settings.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-selected-image-block',
  host: {
    '[class.selected-image-container]': '!overlay',
    '[class.overlay-image-container]': 'overlay',
    '[class.overlay-image-container-no-data]': 'overlay && !settings.showImageInfo'
  },
  templateUrl: './selected-image-block.component.html',
  styleUrls: ['./selected-image-block.component.css']
})
export class SelectedImageBlockComponent {

  constructor(
    public settings: UserSettingsService,
    private u: UtilitiesService) { }

  @Input() image!: SelectedImage;
  @Input() overlay: boolean = false;

  imageLoading: boolean = true;
  altName: string = '';
  dlName: string = '';

  @Output() changeImage = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    this.imageLoading = true;
    this.altName = `${this.image.galleryName} - Image ${this.image.index}`;
    this.dlName = `${this.u.strToKebabCase(this.image.galleryName)}-image-${this.image.index}.jpg`;
  }
  
  onImageLoad(): void {
    this.imageLoading = false;
  }

  prevImage(): void {
    this.changeImage.emit(-1);
  }

  nextImage(): void {
    this.changeImage.emit(1);
  }
  
}
