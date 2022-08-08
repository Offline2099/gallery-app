import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Gallery } from '../data/gallery';
import {UserSettingsService} from '../user-settings.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {

  @Input() g: Gallery;
  @Input() userSettings: {
    selectOnMouseover: boolean
  };

  constructor(
      private router: Router, 
      private activatedRoute: ActivatedRoute, 
      private userSettingsService: UserSettingsService
    ) {
    this.g = activatedRoute.snapshot.data['gallery'];
    this.userSettings = userSettingsService.getUserSettings();
    for (let i = 0; i < this.g.numberOfImages; i++) {
      this.aciveMouseover[i] = false;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.preloadImages(1);
  }

  preloadImages(i: number): void {
    let img = new Image();
    img.src = './assets/img/' + this.g.year + '/' + this.g.month + '/' + i + '.jpg';
    img.onload = () => {
        if (i < this.g.numberOfImages) this.preloadImages(i + 1);
    }
  }

  times(max: Number) {
    return {
      [Symbol.iterator]: function* () {
        for (let i = 0; i < max; i++, yield) {}
      }
    };
  }

  scrolled = 0;
  currentImage = 1;
  currentImageLoading = true;
  imageOverlayDisplayed = false;
  aciveMouseover: boolean[] = [];

  onWindowScroll(e: Event): void {
    this.scrolled = ((e.target as Element).firstElementChild as Element).scrollTop;
  }

  scrollToTop(): void {
    window.scroll({ 
           top: 0, 
           left: 0, 
           behavior: 'smooth' 
    });
  }

  onRightClick(e: Event) {
    e.preventDefault();
  }

  setCurrentImage(val: number): void {
    if (val == this.currentImage) return;
    this.currentImage = val;
    this.onImageChange();
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

  manageSelectOnMouseover(): void {
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

  onImageOverlayMouseenter(side: number): void {
    this.imageOverlayDisplayed = true;
    if (side == 1) this.mouseoverImageSelect(this.prevImageNumber());
    if (side == 2) this.mouseoverImageSelect(this.nextImageNumber());
  }

  onImageOverlayMouseleave(side: number): void {
    this.imageOverlayDisplayed = false;
    if (side == 1) this.cancelMouseoverSelect(this.prevImageNumber());
    if (side == 2) this.cancelMouseoverSelect(this.nextImageNumber());
  }

  onImageChange(): void {
    this.currentImageLoading = true;
  }

  onImageLoad(): void {
    this.currentImageLoading = false;
  }
}
