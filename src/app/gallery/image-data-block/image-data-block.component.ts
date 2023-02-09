import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ImageData } from '../../data/data-types';
import { UserSettingsService } from '../../user-settings.service';
import { UtilitiesService } from '../../utilities.service';

@Component({
  selector: 'app-image-data-block',
  host: {
    '[class]': 'containerClass', 
  },
  templateUrl: './image-data-block.component.html',
  styleUrls: ['./image-data-block.component.css']
})
export class ImageDataBlockComponent implements OnInit, OnChanges {

  @Input() blockType!: string;
  @Input() galleryType!: string;
  @Input() data!: ImageData;
  
  containerClass: string = '';

  timeText: string = '';
  coordText: string = '';

  constructor(
    public userSettings: UserSettingsService,
    public u: UtilitiesService) { }

  ngOnInit(): void {
    this.setContainerClass();
    this.setDataTexts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['blockType']) {
      this.setContainerClass();
    }
    if (changes['data']) {
      this.setDataTexts();
    }
  }

  setContainerClass(): void {
    this.containerClass = 'image-data-block-' + this.blockType;
  }

  setDataTexts(): void {
    if (this.data.month && this.data.year)
      this.timeText = this.u.monthName(this.data.month) + ' ' + this.data.year;
    else this.timeText = '';
    if (this.data.location?.lat && this.data.location?.lon)
      this.coordText = '(' + this.data.location.lat + ' N, ' + this.data.location.lon + ' E)';
    else this.coordText = '';
  }

  switchImageDataTab(tab: string): void {
    if (this.userSettings.imageDataTabActive != tab) {
      this.userSettings.imageDataTabActive = tab;
    }
  }

}
