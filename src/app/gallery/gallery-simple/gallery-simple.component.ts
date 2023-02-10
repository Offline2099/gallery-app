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

  toggleOverlay(image: number): void {
    this.changeImage.emit(image);
    this.userSettings.showOverlay = !this.userSettings.showOverlay;
  }

}
