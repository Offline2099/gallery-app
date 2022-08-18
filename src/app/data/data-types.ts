
// Data for a single image
export interface ImageData {
  path?: string;
  caption?: string;
  complexCaption?: HTMLElement;
  location?: {
    name?: string,
    name2?: string,
    lat?: number,
    lon?: number
  };
  tags?: string[]
}

// Data for an image gallery
export interface Gallery {
  type: string;
  numberOfImages: number;
  path?: string;
  name?: string;
  nameShort?: string;
  year?: string;
  month?: string;
  imageData?: ImageData[];
}
