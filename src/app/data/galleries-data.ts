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

  let sortedTags: string[] = [];

  Tags.forEach(T => {
    T.names.forEach(name => {
      if (tagArray.includes(name)) sortedTags.push(name);
    });
  });

  return sortedTags;
}

const AllImages: ImageData[] = getAllImageData();

function getAllImageData(): ImageData[] {

  let allImages: ImageData[] = [];
  let imgPath: string;
  let imgData: ImageData;

  // For each year in the data
  D.forEach(D => {
    // For each month
    D.m.forEach(m => {
      // For each image (in reverse)
      Array.from(Array(m.n)).forEach((image, i) => {
        // Construct image path string
        imgPath = D.y + '/' + m.m + '/' + (m.n - i) + '.jpg';
        // If image data object exists: add path, year, month;
        // otherwise: create image data object and add path, year, month
        imgData = m.d[m.n - i - 1];
        if (imgData) {
          imgData.path = imgPath;
          imgData.year = D.y;
          imgData.month = m.m
        }
        else imgData = {path: imgPath, year: D.y, month: m.m};
        // Comb tags if present
        if (imgData.tags) imgData.tags = combTags(imgData.tags);
        // Push image data into the data array for all images
        allImages.push(imgData);
      });
    });
  });

  return allImages;
}

function constructDefaultGalleries() {
  return { 
    byYears: constructGalleriesByYears(), 
    byMonths: constructGalleriesByMonths(),
    byLocations: constructGalleriesByLocations(),
    byTags: constructGalleriesByTags()
  };
}

function constructGalleriesByYears(): GalleryGroup {

  let gByYears: GalleryGroup = {
    name: "Years",
    nameShort: "Years",
    path: '',
    galleries: []
  };

  let gByMonths: GalleryGroup[] = constructGalleriesByMonths();

  D.forEach((y, i) => {
    gByYears.galleries[i] = {
      type: 'year',
      numberOfImages: 0,
      path: y.y,
      name: y.y,
      nameExtended: 'Year ' + y.y,
      imageData: []
    };
    gByMonths[i].galleries.forEach(g => {
      gByYears.galleries[i].numberOfImages += (g.imageData || []).length;
      gByYears.galleries[i].imageData?.push(...(g.imageData || []));
    });
  });

  return gByYears;
}

function constructGalleriesByMonths(): GalleryGroup[] {

  let gByMonths: GalleryGroup[] = [];
  let u: UtilitiesService = new UtilitiesService();

  D.forEach((y, i) => {
    gByMonths[i] = {
      name: y.y,
      nameShort: y.y,
      path: y.y,
      galleries: []
    };
    y.m.forEach((m, j) => {
      gByMonths[i].galleries[j] = {
        type: 'month',
        numberOfImages: 0,
        path: y.y + '/' + m.m,
        name: u.monthName(m.m),
        nameExtended: u.monthName(m.m) + ' ' + y.y,
        imageData: []
      };
      AllImages.forEach(img => {
        if (img.year == y.y && img.month == m.m) {
          gByMonths[i].galleries[j].numberOfImages++;
          gByMonths[i].galleries[j].imageData?.push(img);
        }
      });
      gByMonths[i].galleries[j].imageData = 
        gByMonths[i].galleries[j].imageData?.reverse();
    });
  });

  return gByMonths;
}

function constructGalleriesByLocations(): GalleryGroup[] {

  let gByLocations: GalleryGroup[] = [];
  let u: UtilitiesService = new UtilitiesService();

  Locations.forEach((L, i) => {
    gByLocations[i] = {
      name: L.groupName,
      nameShort: L.groupName,
      path: '',
      galleries: []
    };
    L.names.forEach((name, j) => {
      gByLocations[i].galleries[j] = {
        type: 'location',
        numberOfImages: 0,
        path: u.strToKebabCase(name),
        name: name,
        nameExtended: 'Location: ' + name,
        imageData: []
      };
      AllImages.forEach(img => {
        if (!img.location) return;
        if (img.location.name == name || img.location.name2 == name) {
          gByLocations[i].galleries[j].numberOfImages++;
          gByLocations[i].galleries[j].imageData?.push(img);
        }
      });
      gByLocations[i].galleries[j].imageData = 
        gByLocations[i].galleries[j].imageData?.reverse();
    });
  });

  return gByLocations;
}

function constructGalleriesByTags(): GalleryGroup[] {

  let gByTags: GalleryGroup[] = [];
  let u: UtilitiesService = new UtilitiesService();

  Tags.forEach((T, i) => {
    gByTags[i] = {
      name: T.groupName,
      nameShort: T.groupName,
      path: '',
      galleries: []
    };
    T.names.forEach((name, j) => {
      gByTags[i].galleries[j] = {
        type: 'tag',
        numberOfImages: 0,
        path: u.strToKebabCase(name),
        name: u.capFirstLetter(name),
        nameExtended: 'Tag: ' + u.capFirstLetter(name),
        imageData: []
      };
      AllImages.forEach(img => {
        if (!img.tags) return;
        img.tags.forEach(t => {
          if (t == name) {
            gByTags[i].galleries[j].numberOfImages++;
            gByTags[i].galleries[j].imageData?.push(img);
            return;
          }
        });
      });
      gByTags[i].galleries[j].imageData = 
        gByTags[i].galleries[j].imageData?.reverse();
    });
  });

  return gByTags;
}

export const DefaultGalleries = constructDefaultGalleries();
