import { GalleryGroup, ImageData } from './data-types';
import { UtilitiesService } from '../utilities.service';
import * as I from './images-data';

const D = [
  {
    y: '2017',
    m: [
      { m: '01', n: 31, d: I.Jan2017Data },
      { m: '02', n: 27, d: I.Feb2017Data },
      { m: '03', n: 68, d: I.Mar2017Data },
      { m: '05', n: 9, d: I.May2017Data },
      { m: '06', n: 23, d: I.Jun2017Data },
      { m: '08', n: 18, d: I.Aug2017Data },
      { m: '10', n: 9, d: I.Oct2017Data },
      { m: '11', n: 29, d: I.Nov2017Data },
      { m: '12', n: 30, d: I.Dec2017Data }
    ]
  },
  {
    y: '2018',
    m: [
      { m: '01', n: 20, d: I.Jan2018Data },
      { m: '09', n: 13, d: I.Sep2018Data }
    ]
  },
  {
    y: '2019',
    m: [
      { m: '01', n: 10, d: I.Jan2019Data },
      { m: '03', n: 18, d: I.Mar2019Data },
      { m: '04', n: 24, d: I.Apr2019Data }
    ]
  },
  {
    y: '2021',
    m: [
      { m: '08', n: 20, d: I.Aug2021Data },
      { m: '09', n: 31, d: I.Sep2021Data },
      { m: '10', n: 12, d: I.Oct2021Data },
      { m: '11', n: 30, d: I.Nov2021Data },
      { m: '12', n: 6, d: I.Dec2021Data }
    ]
  },
  {
    y: '2022',
    m: [
      { m: '01', n: 47, d: I.Jan2022Data },
      { m: '02', n: 20, d: I.Feb2022Data },
      { m: '07', n: 31, d: I.Jul2022Data }
    ]
  }
];

const Locations = [
  {
    groupName: "Cities\xa0and Regions",
    names: [
      "Bangkok", "Pattaya", // major cities
      "North of Pattaya", "Northeast of Pattaya", "East of Pattaya", "Southeast of Pattaya", "South of Pattaya", // directions
      "Sattahip" // administrative regions
    ]
  },
  {
    groupName: "Parks",
    names: ["Khao Kheow Open Zoo", "Lumphini Park", "Wat Yansangwararam", "Pong Public Park", "Lan Pho Park", "Siam Country Club"]
  },
  {
    groupName: "Beaches",
    names: ["Jomtien Beach", "Dongtan Beach", "Yinyom Beach", "Pattaya Beach", "Na Klua Beach", "Bang Saray Beach"]
  },
  {
    groupName: "Reservoirs",
    names: ["Mabprachan Reservoir", "Ban Amphoe Reservoir", "Chak Nok Reservoir", "Khun Chit Reservoir", "Bang Phai Reservoir", "Nong Klang Dong Reservoir"]
  },
  {
    groupName: "Hills",
    names: ["Khao Phra Tamnak", "Khao Din", "Khao Phai", "Khao Mai Kaeo"]
  }
];

const Tags = [
  {
    groupName: "Features",
    names: ['animals', 'people', 'trees', 'flowers', 'temple', 'shrine', 'statue', 'landmark', 'boats', 
      'road', 'waterbody', 'hills', 'islands', 'panorama'],
  },
  {
    groupName: "Area Type",
    names: ['city', 'beach', 'park', 'forest', 'countryside', 'zoo']
  },
  {
    groupName: "Weather",
    names: ['sunny', 'cloudy', 'rain', 'fog']
  },
  {
    groupName: "Time of Day",
    names: ['sunrise', 'morning', 'day', 'evening', 'sunset']
  }
];

function combTags(tagArray: string[]): string[] {

  let result: string[] = [];

  for (let i = 0; i < Tags.length; i++) {
    for (let j = 0; j < Tags[i].names.length; j++) {
      if (tagArray.includes(Tags[i].names[j])) 
        result.push(Tags[i].names[j]);
    }
  }

  return result;
}

const AllImages: ImageData[] = getAllImageData();

function getAllImageData(): ImageData[] {

  let allImages: ImageData[] = [];
  let imgPath: string;
  let imgData: ImageData;

  // for each year
  for (let i = 0; i < D.length; i++) {
    // for each month
    for (let j = 0; j < D[i].m.length; j++) {
      // for each image
      for (let k = D[i].m[j].n - 1; k >= 0; k--) {
        // Create image data object or add path, year, month to existing one
        imgPath = D[i].y + '/' + D[i].m[j].m + '/' + (k + 1) + '.jpg';
        imgData = D[i].m[j].d[k];
        if (!imgData) imgData = {path: imgPath, year: D[i].y, month: D[i].m[j].m};
        else {
          imgData.path = imgPath;
          imgData.year = D[i].y;
          imgData.month = D[i].m[j].m
        }
        // Comb tags if present
        if (imgData.tags) imgData.tags = combTags(imgData.tags);
        // Push into the data array for all images
        allImages.push(imgData);
      }
    }
  }

  return allImages;
}

function constructDefaultGalleries() {

  let u: UtilitiesService = new UtilitiesService();

  let gByYears: GalleryGroup = {
    name: "Years",
    nameShort: "Years",
    path: '',
    galleries: []
  };

  let gByMonths: GalleryGroup[] = [];
  let gByLocations: GalleryGroup[] = [];
  let gByTags: GalleryGroup[] = [];

  let uniqueYears: string[] = [];
  let uniqueMonths: string[][] = [];

  // Get arrays of unique years and months
  for (let i = 0; i < D.length; i++) {
    uniqueYears[i] = D[i].y;
    uniqueMonths[i] = [];
    for (let j = 0; j < D[i].m.length; j++) {
      uniqueMonths[i][j] = D[i].m[j].m;
    }
  }

  // Galleries by years and months 
  for (let i = 0; i < uniqueYears.length; i++) {
    gByMonths[i] = {
      name: uniqueYears[i],
      nameShort: uniqueYears[i],
      path: uniqueYears[i],
      galleries: []
    };
    for (let j = 0; j < uniqueMonths[i].length; j++) {
      gByMonths[i].galleries[j] = {
        type: 'month',
        numberOfImages: 0,
        path: uniqueYears[i] + '/' + uniqueMonths[i][j],
        name: u.monthName(uniqueMonths[i][j]),
        nameExtended: u.monthName(uniqueMonths[i][j]) + ' ' + uniqueYears[i],
        imageData: []
      }
      for (let k = 0; k < AllImages.length; k++) {
        if (AllImages[k].year == uniqueYears[i] && AllImages[k].month == uniqueMonths[i][j]) {
          gByMonths[i].galleries[j].numberOfImages++;
          gByMonths[i].galleries[j].imageData?.push(AllImages[k]);
        }
      }
      gByMonths[i].galleries[j].imageData = 
        gByMonths[i].galleries[j].imageData?.reverse();
    }
    gByYears.galleries[i] = {
      type: 'year',
      numberOfImages: 0,
      path: uniqueYears[i],
      name: uniqueYears[i],
      nameExtended: 'Year ' + uniqueYears[i],
      imageData: []
    }
    for (let j = 0; j < gByMonths[i].galleries.length; j++) {
      for (let k = 0; k < (gByMonths[i].galleries[j].imageData || []).length; k++) {
        gByYears.galleries[i].numberOfImages++;
        gByYears.galleries[i].imageData?.push(gByMonths[i].galleries[j].imageData![k]);
      }
    }
  }

  // Galleries by locations
  for (let i = 0; i < Locations.length; i++) {
    gByLocations[i] = {
      name: Locations[i].groupName,
      nameShort: Locations[i].groupName,
      path: '',
      galleries: []
    };
    for (let j = 0; j < Locations[i].names.length; j++) {
      gByLocations[i].galleries[j] = {
        type: 'location',
        numberOfImages: 0,
        path: u.strToKebabCase(Locations[i].names[j]),
        name: Locations[i].names[j],
        nameExtended: 'Location: ' + Locations[i].names[j],
        imageData: []
      }
      for (let k = 0; k < AllImages.length; k++) {
        if (!AllImages[k].location) continue;
        if (AllImages[k].location?.name == Locations[i].names[j] || 
          AllImages[k].location?.name2 == Locations[i].names[j]) {
          gByLocations[i].galleries[j].numberOfImages++;
          gByLocations[i].galleries[j].imageData?.push(AllImages[k]);
        }
      }
      gByLocations[i].galleries[j].imageData = 
        gByLocations[i].galleries[j].imageData?.reverse();
    }
  }

  // Galleries by tags
  for (let i = 0; i < Tags.length; i++) {
    gByTags[i] = {
      name: Tags[i].groupName,
      nameShort: Tags[i].groupName,
      path: '',
      galleries: []
    };
    for (let j = 0; j < Tags[i].names.length; j++) {
      gByTags[i].galleries[j] = {
        type: 'tag',
        numberOfImages: 0,
        path: u.strToKebabCase(Tags[i].names[j]),
        name: u.capFirstLetter(Tags[i].names[j]),
        nameExtended: 'Tag: ' + u.capFirstLetter(Tags[i].names[j]),
        imageData: []
      }
      for (let k = 0; k < AllImages.length; k++) {
        if (!AllImages[k].tags) continue;
        let tags = AllImages[k].tags || [];
        for (let t = 0; t < tags.length; t++) {
          if (tags[t] == Tags[i].names[j]) {
            gByTags[i].galleries[j].numberOfImages++;
            gByTags[i].galleries[j].imageData?.push(AllImages[k]);
            break;
          }
        }
      }
      gByTags[i].galleries[j].imageData = 
        gByTags[i].galleries[j].imageData?.reverse();
    }
  }
  
  return { 
    byYears: gByYears, 
    byMonths: gByMonths,
    byLocations: gByLocations,
    byTags: gByTags
  };
}

export const DefaultGalleries = constructDefaultGalleries();
