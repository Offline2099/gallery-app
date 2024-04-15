import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Gallery } from '../../../interfaces/data';
import { UserSettingsService } from '../../../services/user-settings.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  constructor(
    private activatedRoute: ActivatedRoute, 
    public userSettings: UserSettingsService) {
    this.g = activatedRoute.snapshot.data['gallery'];
  }

  g: Gallery;

  desktop: boolean = true;
  verticalOffset: number = 0;

  currentImage: number = 1;

  aciveMouseover: boolean[] = [];

  ngOnInit(): void {
    this.desktop = (window.innerWidth > 991);
    this.aciveMouseover = Array.from(Array(this.g.images.length)).map(e => false);
    this.userSettings.showOverlay = false;
  }

  ngAfterViewInit(): void {
    if (this.desktop && this.g.images.length) this.preloadImages(0);
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
    if (this.g.images)
      img.src = './assets/img/' + this.g.images[i].path;
    img.onload = () => {
        if (this.g.images && i + 1 < this.g.images.length) 
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
    else return this.g.images.length;
  }

  prevImage(): void {
    this.setCurrentImage(this.prevImageNumber());
  }
  
  nextImageNumber(): number {
    if(this.currentImage < this.g.images.length) return this.currentImage + 1;
    else return 1;
  }

  nextImage(): void {
    this.setCurrentImage(this.nextImageNumber());
  }


  // Changing settings

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
