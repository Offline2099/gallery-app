
import { GalleryTypes } from '../data/const';

export interface TimelineYear {
  year: string;
  months: {
    m: string;
    n: number;
    d: ImageData[];
  }[];
}

export interface DefaultGalleries {
  byYear: GalleryGroup;
  byMonth: GalleryGroup[];
  byLocation: GalleryGroup[];
  byTag: GalleryGroup[];
}

export interface Gallery {
  type: `${GalleryTypes}`;
  name: {
    short: string;
    full: string;
  }
  path: string;
  images: ImageData[];
};

export interface GalleryGroup {
  name: string;
  path: string;
  galleries: Gallery[];
};

export interface ImageData {
  path?: string;
  caption?: string;
  location?: {
    name?: string;
    name2?: string;
    lat?: number;
    lon?: number;
  };
  tags?: string[];
  year?: string;
  month?: string;
};
