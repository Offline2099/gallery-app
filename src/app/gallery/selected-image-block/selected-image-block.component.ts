import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { ImageData } from '../../data/data-types';
import { UserSettingsService } from '../../user-settings.service';
import { UtilitiesService } from '../../utilities.service';

@Component({
  selector: 'app-selected-image-block',
  templateUrl: './selected-image-block.component.html',
  styleUrls: ['./selected-image-block.component.css']
})
export class SelectedImageBlockComponent implements OnInit, OnChanges {

  @Input() imageNumber!: number;
  @Input() prevImageNumber!: number;
  @Input() nextImageNumber!: number;
  @Input() galleryName!: string;
  @Input() galleryType!: string;
  @Input() data!: ImageData;

  @Output() changeImage = new EventEmitter<number>();

  currentImageLoading: boolean = true;
  
  constructor(
    public userSettings: UserSettingsService,
    public u: UtilitiesService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageNumber']) {
      this.currentImageLoading = true;
    }
  }
  
  onRightClick(e: Event) {
    e.preventDefault();
  }

  onImageLoad(): void {
    this.currentImageLoading = false;
  }

  prevImage(): void {
    this.changeImage.emit(-1);
  }

  nextImage(): void {
    this.changeImage.emit(1);
  }

  toggleOverlay(): void {
    this.userSettings.showOverlay = !this.userSettings.showOverlay;
  }
  
}
