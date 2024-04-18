import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';

import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-gallery-settings',
  host: {'[class.panel-visible]': 'settings.settingsPanelOpen'},
  templateUrl: './gallery-settings.component.html',
  styleUrls: ['./gallery-settings.component.css']
})
export class GallerySettingsComponent {

  constructor(public settings: UserSettingsService) { }

  @HostBinding('class.full-width') @Input() simpleMode!: boolean;

  @Output() changeMode = new EventEmitter<boolean>();

  toggleGalleryMode(mode: boolean): void {
    this.changeMode.emit(mode);
  }

  setImagesInRow(n: number): void {
    this.settings.imagesInRow = n;
  }
}
