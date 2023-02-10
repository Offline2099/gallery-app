import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  // Variables

  private _showOverlay: boolean = false;
  private _panelOpen: boolean = false;
  private _showImageInfo: boolean = true;
  private _showImageCaptions: boolean = true;
  private _showImageData: boolean = false;
  private _showImageTags: boolean = false;
  private _imageDataTabActive: string = 'location';
  private _selectOnMouseover: boolean = false;
  private _simpleGalleryByTime: boolean = false;
  private _simpleGalleryByData: boolean = true;
  private _imagesInRow: number = 3;

  // Getters

  get showOverlay() {
    return this._showOverlay;
  }

  get panelOpen() {
    return this._panelOpen;
  }

  get showImageInfo() {
    return this._showImageInfo;
  }

  get showImageCaptions() {
    return this._showImageCaptions;
  }

  get showImageData() {
    return this._showImageData;
  }

   get showImageTags() {
    return this._showImageTags;
  }

  get imageDataTabActive() {
    return this._imageDataTabActive;
  }

  get selectOnMouseover() {
    return this._selectOnMouseover;
  }

  get simpleGalleryByTime() {
    return this._simpleGalleryByTime;
  }

  get simpleGalleryByData() {
    return this._simpleGalleryByData;
  }

  get imagesInRow() {
    return this._imagesInRow;
  }

  // Setters

  set showOverlay(val: boolean) {
    this._showOverlay = val;
  }

  set panelOpen(val: boolean) {
    this._panelOpen = val;
  }

  set showImageInfo(val: boolean) {
    this._showImageInfo = val;
  }

  set showImageCaptions(val: boolean) {
    this._showImageCaptions = val;
  }

  set showImageData(val: boolean) {
    this._showImageData = val;
  }

  set showImageTags(val: boolean) {
    this._showImageTags = val;
  }

  set imageDataTabActive(val: string) {
    this._imageDataTabActive = val;
  }

  set selectOnMouseover(val: boolean) {
    this._selectOnMouseover = val;
  }

  set simpleGalleryByTime(val: boolean) {
    this._simpleGalleryByTime = val;
  }

  set simpleGalleryByData(val: boolean) {
    this._simpleGalleryByData = val;
  }

  set imagesInRow(val: number) {
    this._imagesInRow = val;
  }
}
