import { Component, OnInit, AfterViewInit, HostListener  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  userSettings: {
    panelOpen: boolean,
    showImageInfo: boolean,
    showImageCaptions: boolean,
    showImageData: boolean,
    imageDataTabActive: string,
    selectOnMouseover: boolean,
    simpleGalleryByTime: boolean,
    simpleGalleryByData: boolean,
    imagesInRow: number
  };

  verticalOffset = 0;

  currentImage = 1;
  currentImageLoading = true;
  currentLocationText: string[] = ['', '', ''];
  
  aciveMouseover: boolean[] = [];

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private userSettingsService: UserSettingsService,
    public u: UtilitiesService
  ) {
    // The data for current gallery is passed through the router
    this.g = activatedRoute.snapshot.data['gallery'];
    // Applying global settings 
    this.userSettings = userSettingsService.getUserSettings();
    if (this.g.type == 'month' && this.userSettings.imageDataTabActive == 'time')
      this.switchImageDataTab('location');
  }

  ngOnInit(): void {
    this.setLocationText();
    for (let i = 0; i < this.g.numberOfImages; i++) {
      this.aciveMouseover[i] = false;
    }
  }

  ngAfterViewInit(): void {
    this.preloadImages(0);
  }

  // Scrolling functionality

  @HostListener("window:scroll", []) onWindowScroll() {
    this.verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  scrollToTop(): void {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  // Preventing right-click on some elements

  onRightClick(e: Event) {
    e.preventDefault();
  }

  // Pre-loading full-size versions of all images recursively after the gallery is loaded

  preloadImages(i: number): void {
    if (!this.g.numberOfImages) return;
    let img = new Image();
    if (this.g.imageData) img.src = './assets/img/' + this.g.imageData[i].path;
    img.onload = () => {
        if (this.g.imageData && i + 1 < this.g.imageData.length) this.preloadImages(i + 1);
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

  // Settings panel

  toggleSettingsPanel(): void {
    this.userSettings.panelOpen = !this.userSettings.panelOpen;
    this.userSettingsService.setPanelStatus(this.userSettings.panelOpen);
  }

  // No-click mode

  toggleSelectOnMouseover(): void {
    this.userSettings.selectOnMouseover = !this.userSettings.selectOnMouseover;
    this.userSettingsService.setSelectOnMouseover(this.userSettings.selectOnMouseover);
  }

  mouseoverImageSelect(i: number): void {
    this.aciveMouseover[i] = true;
    setTimeout(()=>{
      if (this.aciveMouseover[i] && this.userSettings.selectOnMouseover) this.setCurrentImage(i);
    }, 300);
  }

  cancelMouseoverSelect(i: number): void {
    this.aciveMouseover[i] = false;
  }

  // Toggling image data

  toggleImageInfo(): void {
    this.userSettings.showImageInfo = !this.userSettings.showImageInfo;
    this.userSettingsService.setShowImageInfo(this.userSettings.showImageInfo);
  }

  toggleImageData(): void {
    this.userSettings.showImageData = !this.userSettings.showImageData;
    this.userSettingsService.setShowImageData(this.userSettings.showImageData);
  }

  toggleImageCaptions(): void {
    this.userSettings.showImageCaptions = !this.userSettings.showImageCaptions;
    this.userSettingsService.setShowImageCaptions(this.userSettings.showImageCaptions);
  }

  // Image data tabs

  switchImageDataTab(tab: string): void {
    if (this.userSettings.imageDataTabActive != tab) {
      this.userSettings.imageDataTabActive = tab;
      this.userSettingsService.setImageDataTabActive(tab);
    }
  }

  // Simple gallery mode

  gridModeOn(): boolean {
    if (this.g.type == 'month' || this.g.type == 'year')
      return this.userSettings.simpleGalleryByTime;
    else return this.userSettings.simpleGalleryByData;
  }

  toggleSimpleGallery(mode: boolean): void {
    if (mode == this.gridModeOn()) return;
    if (this.g.type == 'month' || this.g.type == 'year') {
      this.userSettings.simpleGalleryByTime = !this.userSettings.simpleGalleryByTime;
      this.userSettingsService.setSimpleGalleryByTime(this.userSettings.simpleGalleryByTime);
    }
    else {
      this.userSettings.simpleGalleryByData = !this.userSettings.simpleGalleryByData;
      this.userSettingsService.setSimpleGalleryByData(this.userSettings.simpleGalleryByData);
    }
  }

  setImagesInRow(val: number): void {
    this.userSettings.imagesInRow = val;
    this.userSettingsService.setImagesInRow(this.userSettings.imagesInRow);
  }
}
