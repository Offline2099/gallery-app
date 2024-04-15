
export interface TimelineYear {
  year: string;
  months: {
    m: string;
    n: number;
    d: ImageData[];
  }[];
}

export interface DefaultGalleries {
  byYears: GalleryGroup;
  byMonths: GalleryGroup[];
  byLocations: GalleryGroup[];
  byTags: GalleryGroup[];
}

export interface Gallery {
  type: string;
  name: string;
  nameExtended?: string;
  numberOfImages: number;
  path?: string;
  imageData?: ImageData[];
};

export interface GalleryGroup {
  name: string;
  nameShort?: string;
  nameExtended?: string;
  path?: string;
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
