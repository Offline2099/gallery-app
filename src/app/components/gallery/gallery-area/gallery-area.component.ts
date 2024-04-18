import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryTypes } from '../../../data/const';
import { Gallery } from '../../../interfaces/data';
import { SelectedImage } from '../../../interfaces/ui';
import { UserSettingsService } from '../../../services/user-settings.service';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-gallery-area',
  templateUrl: './gallery-area.component.html',
  styleUrls: ['./gallery-area.component.css']
})
export class GalleryAreaComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private u: UtilitiesService,
    public settings: UserSettingsService) {

    this.g = activatedRoute.snapshot.data['gallery'];
    this.desktop = this.u.checkIfDesktop();
    this.setDisplayedGalleryName();
    this.setGalleryMode();
    this.setCurrentImage(1);
    this.settings.showOverlay = false;
  }

  g: Gallery;
  desktop: boolean;
  displayedName!: string;
  simpleMode!: boolean;
  currentImage!: SelectedImage;
  mouseoverIndex: number = -1;

  @HostListener('window:resize') onResize() {
    this.desktop = this.u.checkIfDesktop();
  }

  ngAfterViewInit(): void {
    if (this.desktop) this.preloadImages(this.g);
  }

  preloadImages(g: Gallery): void {

    if (!g.images.length) return;

    let preload = (i: number) => {
      let img = new Image();
      img.src = `./assets/img/${g.images[i].path}`;
      if (i + 1 < g.images.length) img.onload = () => {preload(i + 1)}
    }

    preload(0);
  }

  chronological(type: `${GalleryTypes}`): boolean {
    return type == GalleryTypes.month || type == GalleryTypes.year;
  }

  setDisplayedGalleryName(): void {
    this.displayedName = 
      this.chronological(this.g.type) ? this.g.name.full : this.g.name.short;
  }

  setGalleryMode(): void {
    if (this.chronological(this.g.type)) 
      this.simpleMode =  this.settings.simpleGalleryByTime;
    else 
      this.simpleMode = this.settings.simpleGalleryByData;
  }

  toggleGalleryMode(mode: boolean): void {

    if (mode == this.simpleMode) return;

    if (this.chronological(this.g.type)) {
      this.settings.simpleGalleryByTime = !this.settings.simpleGalleryByTime;
      this.simpleMode =  this.settings.simpleGalleryByTime;
    }
    else {
      this.settings.simpleGalleryByData = !this.settings.simpleGalleryByData;
      this.simpleMode = this.settings.simpleGalleryByData;
    }
  }

  setCurrentImage(index: number): void {
    this.currentImage = {
      index: 0, prevIndex: '', nextIndex: '',
      galleryName: this.g.name.full,
      galleryType: this.g.type,
      data: {}
    }
    this.updateCurrentImage(index);
  }

  updateCurrentImage(index: number): void {
    if (this.currentImage.index == index) return;
    let img: SelectedImage = this.currentImage;
    img.index = index;
    img.prevIndex = this.prevImageNumber(index).toString();
    img.nextIndex = this.nextImageNumber(index).toString();
    img.data = this.g.images[index - 1];
  }

  prevImageNumber(current: number): number {
    if (current > 1) return current - 1;
    else return this.g.images.length;
  }

  nextImageNumber(current: number): number {
    if (current < this.g.images.length) return current + 1;
    else return 1;
  }

  handleImageIncrement(incr: number): void {
    if (incr == 1) 
      this.updateCurrentImage(this.nextImageNumber(this.currentImage.index));
    else if (incr == -1) 
      this.updateCurrentImage(this.prevImageNumber(this.currentImage.index));
  }

  mouseoverImageSelect(index: number): void {
    this.mouseoverIndex = index;
    setTimeout(() => {
      if (this.mouseoverIndex == index && this.settings.selectOnMouseover) 
        this.updateCurrentImage(index);
    }, 300);
  }

  cancelMouseoverSelect(i: number): void {
    this.mouseoverIndex = -1;
  }

}
