import { GalleryTypes } from '../data/const';
import { ImageData } from './data';

export const enum GalleryGroupLabelTypes {
  countAll,
  countGalleries  
}

export interface SelectedImage {
  index: number;
  prevIndex: string;
  nextIndex: string;
  galleryName: string;
  galleryType: `${GalleryTypes}`;
  data: ImageData;
}

export const enum ImageDataTabs {
  location = 'location',
  time = 'time',
  tags = 'tags'
}

export interface ImageDataTab {
  name: `${ImageDataTabs}`;
  enabled: boolean;
  icon: string;
}
