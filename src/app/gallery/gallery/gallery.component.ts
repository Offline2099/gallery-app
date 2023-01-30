import { Component, OnInit, AfterViewInit, HostListener  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Gallery } from '../../data/data-types';
import { UserSettingsService } from '../../user-settings.service';
import { UtilitiesService } from '../../utilities.service';

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
  currentImageLoading: boolean = true;
  currentLocationText: string[] = ['', '', ''];
  
  aciveMouseover: boolean[] = [];

  constructor(
    private activatedRoute: ActivatedRoute, 
    public userSettings: UserSettingsService,
    public u: UtilitiesService) {

    this.g = activatedRoute.snapshot.data['gallery'];

    if (this.g.type == 'month' && this.userSettings.imageDataTabActive == 'time')
      this.switchImageDataTab('location');
  }

  ngOnInit(): void {
    this.desktop = (window.innerWidth > 991);
    this.setLocationText();
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


  // Setting and displaying current image and its data

  setCurrentImage(val: number): void {
    if (val == this.currentImage) return;
    this.currentImage = val;
    this.currentImageLoading = true;
    this.setLocationText();
  }

  onImageLoad(): void {
    this.currentImageLoading = false;
  }

  setLocationText(): void {

    if (!this.g.numberOfImages) return;

    if (!this.g.imageData || typeof this.g.imageData[this.currentImage - 1] == undefined) {
      this.currentLocationText = ['', '', ''];
      return;
    }

    let loc = this.g.imageData[this.currentImage - 1].location; 

    if (loc?.name)
      this.currentLocationText = [ 
        loc?.name, 
        loc?.name2 ? loc?.name2 : '', 
        loc?.lat && loc?.lon ? '(' + loc?.lat + ' N, ' + loc?.lon + ' E)' : '' 
      ];
    else this.currentLocationText = ['', '', ''];
  }


  // Switching to previous and next images

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


  // Toggling image data

  toggleImageInfo(): void {
    this.userSettings.showImageInfo = !this.userSettings.showImageInfo;
  }

  switchImageDataTab(tab: string): void {
    if (this.userSettings.imageDataTabActive != tab) {
      this.userSettings.imageDataTabActive = tab;
    }
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


  // Settings panel

  toggleSettingsPanel(): void {
    this.userSettings.panelOpen = !this.userSettings.panelOpen;
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

}
