import { Component, Input, SimpleChanges, Inject } from '@angular/core';

import { GalleryTypes } from '../../../data/const';
import { ImageData } from '../../../interfaces/data';
import { ImageDataTabs, ImageDataTab } from '../../../interfaces/ui';
import { UserSettingsService } from '../../../services/user-settings.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-image-data-block',
  host: {'[class]': '"image-data-block-" + blockType'},
  templateUrl: './image-data-block.component.html',
  styleUrls: ['./image-data-block.component.css']
})
export class ImageDataBlockComponent {

  constructor(
    public settings: UserSettingsService,
    private u: UtilitiesService) { }

  @Input() blockType!: string;
  @Input() galleryType!: `${GalleryTypes}`;
  @Input() data!: ImageData;

  timeText: string = '';
  coordText: string = '';
  showTimeData: boolean = true;
  dataTabs: ImageDataTab[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.updateDataFeatures();
    }
  }

  updateDataFeatures(): void {

    if (this.data.month && this.data.year)
      this.timeText = `${this.u.monthName(this.data.month)} ${this.data.year}`;
    else this.timeText = '';

    if (this.data.location?.lat && this.data.location?.lon)
      this.coordText = `(${this.data.location.lat} N, ${this.data.location.lon} E)`;
    else this.coordText = '';

    this.showTimeData = this.galleryType != GalleryTypes.month;

    if (this.settings.imageDataTabActive == ImageDataTabs.time && !this.showTimeData)
      this.switchImageDataTab(ImageDataTabs.location);

    this.dataTabs = [
      {
        name: ImageDataTabs.location,
        enabled: this.data?.location !== undefined,
        icon: 'location-icon.png'
      },
      {
        name: ImageDataTabs.time,
        enabled: this.showTimeData,
        icon: 'calendar-icon.png'
      },
      {
        name: ImageDataTabs.tags,
        enabled: this.data?.tags !== undefined,
        icon: 'tag-icon.png'
      }
    ];
  }

  switchImageDataTab(tab: `${ImageDataTabs}`): void {
    if (this.settings.imageDataTabActive != tab) {
      this.settings.imageDataTabActive = tab;
    }
  }

}
