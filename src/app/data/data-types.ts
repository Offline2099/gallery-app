// Single image data
export interface ImageData {
  path?: string;
  caption?: string;
  location?: {
    name?: string,
    name2?: string,
    lat?: number,
    lon?: number
  };
  tags?: string[]
  year?: string;
  month?: string;
};

// Gallery data
export interface Gallery {
  type: string;
  numberOfImages: number;
  imageData?: ImageData[];
  path?: string;
  name?: string;
  nameExtended?: string; 
};

// Gallery group data 
export interface GalleryGroup {
  name: string,
  galleries: Gallery[]
  path?: string,
  nameShort?: string,
  nameExtended?: string
};