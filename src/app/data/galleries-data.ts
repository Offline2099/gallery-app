import { Gallery } from './data-types';
import * as I from './images-data';

// 2022

export const Jan2022: Gallery = {
  type: "month",
  year: "2022",
  month: "01",
  numberOfImages: 47,
  imageData: I.Jan2022Data
};

export const Feb2022: Gallery = {
  type: "month",
  year: "2022",
  month: "02",
  numberOfImages: 20,
  imageData: I.Feb2022Data
};

export const Jul2022: Gallery = {
  type: "month",
  year: "2022",
  month: "07",
  numberOfImages: 31,
  imageData: I.Jul2022Data
};

export const All2022 = { 
  name: "Year 2022", 
  nameShort: "2022", 
  path: "2022", 
  galleries: [Jan2022, Feb2022, Jul2022] 
};

// 2021

export const Aug2021: Gallery = {
  type: "month",
  year: "2021",
  month: "08",
  numberOfImages: 21,
  imageData: I.Aug2021Data
};

export const Sep2021: Gallery = {
  type: "month",
  year: "2021",
  month: "09",
  numberOfImages: 31,
  imageData: I.Sep2021Data
};

export const Oct2021: Gallery = {
  type: "month",
  year: "2021",
  month: "10",
  numberOfImages: 12,
  imageData: I.Oct2021Data
};

export const Nov2021: Gallery = {
  type: "month",
  year: "2021",
  month: "11",
  numberOfImages: 30,
  imageData: I.Nov2021Data
};

export const Dec2021: Gallery = {
  type: "month",
  year: "2021",
  month: "12",
  numberOfImages: 6,
  imageData: I.Dec2021Data
};

export const All2021 = { 
  name: "Year 2021", 
  nameShort: "2021", 
  path: "2021",  
  galleries: [Aug2021, Sep2021, Oct2021, Nov2021, Dec2021] 
};

// 2019

export const Jan2019: Gallery = {
  type: "month",
  year: "2019",
  month: "01",
  numberOfImages: 10,
  imageData: I.Jan2019Data
};

export const Mar2019: Gallery = {
  type: "month",
  year: "2019",
  month: "03",
  numberOfImages: 18,
  imageData: I.Mar2019Data
};

export const Apr2019: Gallery = {
  type: "month",
  year: "2019",
  month: "04",
  numberOfImages: 24,
  imageData: I.Apr2019Data
};

export const All2019 = { 
  name: "Year 2019", 
  nameShort: "2019", 
  path: "2019",  
  galleries: [Jan2019, Mar2019, Apr2019] 
};

// 2018

export const Jan2018: Gallery = {
  type: "month",
  year: "2018",
  month: "01",
  numberOfImages: 20,
  imageData: I.Jan2018Data
};

export const Sep2018: Gallery = {
  type: "month",
  year: "2018",
  month: "09",
  numberOfImages: 13,
  imageData: I.Sep2018Data
};

export const All2018 = { 
  name: "Year 2018", 
  nameShort: "2018", 
  path: "2018",  
  galleries: [Jan2018, Sep2018] 
};

// 2017

export const Jan2017: Gallery = {
  type: "month",
  year: "2017",
  month: "01",
  numberOfImages: 31,
  imageData: I.Jan2017Data
};

export const Feb2017: Gallery = {
  type: "month",
  year: "2017",
  month: "02",
  numberOfImages: 27,
  imageData: I.Feb2017Data
};

export const Mar2017: Gallery = {
  type: "month",
  year: "2017",
  month: "03",
  numberOfImages: 68,
  imageData: I.Mar2017Data
};

export const May2017: Gallery = {
  type: "month",
  year: "2017",
  month: "05",
  numberOfImages: 9,
  imageData: I.May2017Data
};

export const Jun2017: Gallery = {
  type: "month",
  year: "2017",
  month: "06",
  numberOfImages: 23,
  imageData: I.Jun2017Data
};

export const Aug2017: Gallery = {
  type: "month",
  year: "2017",
  month: "08",
  numberOfImages: 18,
  imageData: I.Aug2017Data
};

export const Oct2017: Gallery = {
  type: "month",
  year: "2017",
  month: "10",
  numberOfImages: 9,
  imageData: I.Oct2017Data
};

export const Nov2017: Gallery = {
  type: "month",
  year: "2017",
  month: "11",
  numberOfImages: 29,
  imageData: I.Nov2017Data
};

export const Dec2017: Gallery = {
  type: "month",
  year: "2017",
  month: "12",
  numberOfImages: 30,
  imageData: I.Dec2017Data
};

export const All2017 = { 
  name: "Year 2017", 
  nameShort: "2017", 
  path: "2017", 
  galleries: [Jan2017, Feb2017, Mar2017, May2017, Jun2017, Aug2017, Oct2017, Nov2017, Dec2017] 
};

// Everything monthly

export const GalleriesChronologically = [ All2022, All2021, All2019, All2018, All2017 ];

// Gallery constructor

function monthName(monthNumber: string | undefined, short?: boolean): string {

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  let monthInt: number;

  if (!monthNumber) return 'Unknown';
  monthInt = parseInt(monthNumber);
  if (monthInt < 1 || monthInt > 12) return 'Unknown';

  if (short) return months[monthInt - 1].substring(0, 3);
  return months[monthInt - 1];
}

export function constructGallery(t: string, v: string[]): Gallery {

  let g: Gallery = {type: '', numberOfImages: 0};
  let imageData;

  if (t == 'month') {

    if (!v[0] || !v[1]) return g;

    for (let i = 0; i < GalleriesChronologically.length; i++) {
      if (GalleriesChronologically[i].nameShort == v[0]) {
        for (let j = 0; j < GalleriesChronologically[i].galleries.length; j++) {
          if (GalleriesChronologically[i].galleries[j].month == v[1]) {
            g = GalleriesChronologically[i].galleries[j];
            g.path = g.year + '/' + g.month + '/';
            g.name = monthName(g.month);
            g.nameShort = monthName(g.month, true);
          }
        }
      }
    }

    if (!g.imageData) g.imageData = [];
    for(let i = 0; i < g.numberOfImages; i++) {
      if (g.imageData[i]) g.imageData[i].path = g.path + '/' + (i + 1);
      else g.imageData[i] = { path: g.path + '/' + (i + 1) };
    }
  }

  if (t == 'year') {

    if (!v[0]) return g;

    for (let i = 0; i < GalleriesChronologically.length; i++) {
      if (GalleriesChronologically[i].nameShort == v[0]) {
        
        g.type = t;
        g.path = v[0] + '/';
        g.name = 'Year ' + v[0];
        g.nameShort = v[0];
        g.imageData = [];

        for (let j = 0; j < GalleriesChronologically[i].galleries.length; j++) {
          g.numberOfImages += GalleriesChronologically[i].galleries[j].numberOfImages;
          imageData = GalleriesChronologically[i].galleries[j].imageData;
          if (!imageData) {
            imageData = [];
            for (let k = 0; k < GalleriesChronologically[i].galleries[j].numberOfImages; k++) {
              imageData[k] = { 
                path: GalleriesChronologically[i].galleries[j].year + '/' + 
                  GalleriesChronologically[i].galleries[j].month + '/' + (k + 1) 
              }
            }
          }
          else {
            for (let k = 0; k < GalleriesChronologically[i].galleries[j].numberOfImages; k++) {
              if (imageData[k]) {
                imageData[k].path = GalleriesChronologically[i].galleries[j].year + '/' + 
                  GalleriesChronologically[i].galleries[j].month + '/' + (k + 1);
                g.imageData.push(imageData[k]);
              }
              else {
                imageData[k] = { 
                  path: GalleriesChronologically[i].galleries[j].year + '/' + 
                    GalleriesChronologically[i].galleries[j].month + '/' + (k + 1) 
                }
              }
            }
          }
        }
      }
    }
  }

  return g;
}