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
      { m: '07', n: 76, d: I.Jul2022Data },
      { m: '09', n: 13, d: I.Sep2022Data }
    ]
  }
];

const Locations = [
  {
    groupName: 'Cities\xa0and Regions',
    names: [
      'Bangkok', 'Pattaya', // major cities
      'North of Pattaya', 'Northeast of Pattaya', 'East of Pattaya', 'Southeast of Pattaya', 'South of Pattaya', // directions
      'Sattahip', 'Test' // administrative regions
    ]
  },
  {
    groupName: 'Parks',
    names: ['Khao Kheow Open Zoo', 'Lumphini Park', 'Wat Yansangwararam', 'Pong Public Park', 'Lan Pho Park', 'Siam Country Club']
  },
  {
    groupName: 'Beaches',
    names: ['Jomtien Beach', 'Dongtan Beach', 'Yinyom Beach', 'Pattaya Beach', 'Na Klua Beach', 'Bang Saray Beach']
  },
  {
    groupName: 'Reservoirs',
    names: ['Mabprachan Reservoir', 'Ban Amphoe Reservoir', 'Chak Nok Reservoir', 'Khun Chit Reservoir', 'Bang Phai Reservoir', 'Nong Klang Dong Reservoir']
  },
  {
    groupName: 'Hills',
    names: ['Khao Phra Tamnak', 'Khao Din', 'Khao Phai', 'Khao Mai Kaeo']
  }
];

const Tags = [
  {
    groupName: 'Features',
    names: ['animals', 'people', 'trees', 'flowers', 'temple', 'shrine', 'statue', 'landmark', 'boats', 
      'road', 'waterbody', 'hills', 'islands', 'panorama'],
  },
  {
    groupName: 'Area Type',
    names: ['city', 'beach', 'park', 'forest', 'countryside', 'zoo']
  },
  {
    groupName: 'Weather',
    names: ['sunny', 'cloudy', 'rain', 'fog']
  },
  {
    groupName: 'Time of Day',
    names: ['sunrise', 'morning', 'day', 'evening', 'sunset']
  }
];

function sortTags(tagArray: string[]): string[] {

  let sortedTags: string[] = [];

  Tags.map(group => group.names).flat().forEach(tag => {
    if (tagArray.includes(tag)) sortedTags.push(tag);
  });

  return sortedTags;
}

const AllImageData: ImageData[] = getAllImageData();

function getAllImageData(): ImageData[] {

  let allImageData: ImageData[] = [];
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
        if (imgData.tags) imgData.tags = sortTags(imgData.tags);
        // Push image data into the data array for all images
        allImageData.push(imgData);
      });
    });
  });

  return allImageData;
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
    galleries: D.map(year => ({
      type: 'year',
      numberOfImages: 0,
      path: year.y,
      name: year.y,
      nameExtended: 'Year ' + year.y,
      imageData: AllImageData.
        filter(data => data.year == year.y).
        sort((a, b) => {return parseInt(b.month!) - parseInt(a.month!)}).
        reverse()
    }))
  };

  gByYears.galleries.forEach(gallery => 
    gallery.numberOfImages =  gallery.imageData!.length
  );

  return gByYears;
}

function constructGalleriesByMonths(): GalleryGroup[] {

  let gByMonths: GalleryGroup[] = [];
  let u: UtilitiesService = new UtilitiesService();

  gByMonths = D.map(year => ({
    name: year.y,
    nameShort: year.y,
    path: year.y,
    galleries: year.m.map(month => ({
      type: 'month',
      numberOfImages: 0,
      path: year.y + '/' + month.m,
      name: u.monthName(month.m),
      nameExtended: u.monthName(month.m) + ' ' + year.y,
      imageData: AllImageData.
        filter(data => data.year == year.y && data.month == month.m).
        reverse()
    }))
  }));

  gByMonths.forEach(group => 
    group.galleries.forEach(gallery => 
      gallery.numberOfImages = gallery.imageData!.length
    )
  );

  return gByMonths;
}

function constructGalleriesByLocations(): GalleryGroup[] {

  let gByLocations: GalleryGroup[] = [];
  let u: UtilitiesService = new UtilitiesService();

  gByLocations = Locations.map(locationGroup => ({
    name: locationGroup.groupName,
    nameShort: locationGroup.groupName,
    path: '',
    galleries: locationGroup.names.map(location => ({
      type: 'location',
      numberOfImages: 0,
      path: 'places/' + u.strToKebabCase(location),
      name: location,
      nameExtended: 'Location: ' + location,
      imageData: AllImageData.filter(data => {
        if (!data.location) return false;
        return (data.location.name == location || data.location.name2 == location);
      }).reverse()
    }))
  }));

  gByLocations.forEach(group => 
    group.galleries.forEach(gallery => 
      gallery.numberOfImages = gallery.imageData!.length
    )
  );

  return gByLocations;
}

function constructGalleriesByTags(): GalleryGroup[] {

  let gByTags: GalleryGroup[] = [];
  let u: UtilitiesService = new UtilitiesService();

  gByTags = Tags.map(tagGroup => ({
    name: tagGroup.groupName,
    nameShort: tagGroup.groupName,
    path: '',
    galleries: tagGroup.names.map(tag => ({
      type: 'tag',
      numberOfImages: 0,
      path: 'tags/' + u.strToKebabCase(tag),
      name: u.capFirstLetter(tag),
      nameExtended: 'Tag: ' + u.capFirstLetter(tag),
      imageData: AllImageData.filter(data => {
        if (!data.tags) return false;
        return data.tags.includes(tag);
      }).reverse()
    }))
  }));

  gByTags.forEach(group => 
    group.galleries.forEach(gallery => 
      gallery.numberOfImages = gallery.imageData!.length
    )
  );

  return gByTags;
}

export const DefaultGalleries = constructDefaultGalleries();
