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
    selectOnMouseover: boolean,
    showImageData: boolean,
    simpleGallery: boolean
  };

  verticalOffset = 0;

  currentImage = 1;
  currentImageLoading = true;
  currentLocationText: string[] = ['', '', ''];
  
  settingsOpen: boolean = false;
  aciveMouseover: boolean[] = [];

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private userSettingsService: UserSettingsService,
    public u: UtilitiesService
  ) {

    // The data for current gallery is passed through the router
    this.g = activatedRoute.snapshot.data['gallery'];

    // For chronological galleries getting path and name from year and month
    if (this.g.type == 'chronological') {
      this.g.path = this.g.year + '/' + this.g.month + '/';
      this.g.name = this.u.monthName(this.g.month);
      this.g.nameShort = this.u.monthName(this.g.month, true);
    }

    // If image data is not passed, generating paths from the gallery path
    if (!this.g.imageData) this.g.imageData = [];
    for(let i = 0; i < this.g.numberOfImages; i++) {
      if (this.g.imageData[i]) this.g.imageData[i].path = this.g.path + '/' + (i + 1);
      else this.g.imageData[i] = { path: this.g.path + '/' + (i + 1) };
    }

    this.userSettings = userSettingsService.getUserSettings();
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
    let img = new Image();
    if (this.g.imageData) img.src = './assets/img/' + this.g.imageData[i].path + '.jpg';
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
    this.settingsOpen = !this.settingsOpen;
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

  toggleImageData(): void {
    this.userSettings.showImageData = !this.userSettings.showImageData;
    this.userSettingsService.setShowImageData(this.userSettings.showImageData);
  }

  // Simple gallery mode

  // toggleSimpleGallery(): void {
  //   this.userSettings.simpleGallery = !this.userSettings.simpleGallery;
  //   this.userSettingsService.setSimpleGallery(this.userSettings.simpleGallery);
  // }
  
}
