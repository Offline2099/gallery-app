import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Gallery } from '../../data/data-types';
import { UserSettingsService } from '../../user-settings.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {

  g: Gallery;

  desktop: boolean = true;
  verticalOffset: number = 0;

  currentImage: number = 1;

  aciveMouseover: boolean[] = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    public userSettings: UserSettingsService) {

    this.g = activatedRoute.snapshot.data['gallery'];
  }

  ngOnInit(): void {
    this.desktop = (window.innerWidth > 991);
    this.aciveMouseover = Array.from(Array(this.g.numberOfImages)).map(e => false);
  }

  ngAfterViewInit(): void {
    if (this.desktop && this.g.numberOfImages) this.preloadImages(0);
  }

  @HostListener('window:resize') onResize() {
    this.desktop = (window.innerWidth > 991);
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.verticalOffset = 
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  
  // Utility
  
  scrollToTop(): void {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
  }

  onRightClick(e: Event) {
    e.preventDefault();
  }


  // Pre-loading full-size versions of all images recursively after the gallery is loaded

  preloadImages(i: number): void {
    let img = new Image();
    if (this.g.imageData)
      img.src = './assets/img/' + this.g.imageData[i].path;
    img.onload = () => {
        if (this.g.imageData && i + 1 < this.g.imageData.length) 
          this.preloadImages(i + 1);
    }
  }

 
  // Switching images

  setCurrentImage(val: number): void {
    if (val != this.currentImage)
      this.currentImage = val;
  }

  handleImageChange(incr: number): void {
    if (incr == 1) this.nextImage();
    if (incr == -1) this.prevImage();
  }

  prevImageNumber(): number {
    if (this.currentImage > 1) return this.currentImage - 1;
    else return this.g.numberOfImages;
  }

  prevImage(): void {
    this.setCurrentImage(this.prevImageNumber());
  }
  
  nextImageNumber(): number {
    if(this.currentImage < this.g.numberOfImages) return this.currentImage + 1;
    else return 1;
  }

  nextImage(): void {
    this.setCurrentImage(this.nextImageNumber());
  }


  // Changing settings

  toggleSettingsPanel(): void {
    this.userSettings.panelOpen = !this.userSettings.panelOpen;
  }

  toggleImageInfo(): void {
    this.userSettings.showImageInfo = !this.userSettings.showImageInfo;
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

  setImagesInRow(n: number): void {
    this.userSettings.imagesInRow = n;
  }


  // Grid mode

  gridModeOn(): boolean {
    if (this.g.type == 'month' || this.g.type == 'year')
      return this.userSettings.simpleGalleryByTime;
    else return this.userSettings.simpleGalleryByData;
  }

  toggleSimpleGallery(mode: boolean): void {
    if (mode == this.gridModeOn()) return;
    if (this.g.type == 'month' || this.g.type == 'year') {
      this.userSettings.simpleGalleryByTime = !this.userSettings.simpleGalleryByTime;
    }
    else {
      this.userSettings.simpleGalleryByData = !this.userSettings.simpleGalleryByData;
    }
  }


  // No-click mode

  toggleSelectOnMouseover(): void {
    this.userSettings.selectOnMouseover = !this.userSettings.selectOnMouseover;
  }

  mouseoverImageSelect(i: number): void {
    this.aciveMouseover[i] = true;
    setTimeout(()=>{
      if (this.aciveMouseover[i] && this.userSettings.selectOnMouseover) 
        this.setCurrentImage(i);
    }, 300);
  }

  cancelMouseoverSelect(i: number): void {
    this.aciveMouseover[i] = false;
  }


  // Overlay

  toggleOverlay(): void {
    this.userSettings.showOverlay = !this.userSettings.showOverlay;
  }

}
