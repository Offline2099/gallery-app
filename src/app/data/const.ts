import { TimelineYear } from '../interfaces/data';
import * as I  from './images-data';


/******************************************************************************

  Images are stored in folders by year and month. This is the default gallery
  structure from which all other galleries are constructed.

******************************************************************************/

export const Timeline: TimelineYear[] = [
  {
    year: '2017',
    months: [
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
    year: '2018',
    months: [
      { m: '01', n: 20, d: I.Jan2018Data },
      { m: '09', n: 13, d: I.Sep2018Data }
    ]
  },
  {
    year: '2019',
    months: [
      { m: '01', n: 10, d: I.Jan2019Data },
      { m: '03', n: 18, d: I.Mar2019Data },
      { m: '04', n: 24, d: I.Apr2019Data }
    ]
  },
  {
    year: '2021',
    months: [
      { m: '08', n: 20, d: I.Aug2021Data },
      { m: '09', n: 31, d: I.Sep2021Data },
      { m: '10', n: 12, d: I.Oct2021Data },
      { m: '11', n: 30, d: I.Nov2021Data },
      { m: '12', n: 6, d: I.Dec2021Data }
    ]
  },
  {
    year: '2022',
    months: [
      { m: '01', n: 47, d: I.Jan2022Data },
      { m: '02', n: 20, d: I.Feb2022Data },
      { m: '07', n: 76, d: I.Jul2022Data },
      { m: '08', n: 34, d: I.Aug2022Data },
      { m: '09', n: 13, d: I.Sep2022Data }
    ]
  }
];

export const enum GalleryTypes {
  month = 'month',
  year = 'year',
  location = 'location',
  tag = 'tag'
}

export const Locations = [
  {
    groupName: 'Cities\xa0and Regions',
    names: [
      'Bangkok', 'Pattaya', // major cities
      'North of Pattaya', 'Northeast of Pattaya', 'East of Pattaya', 'Southeast of Pattaya', 'South of Pattaya', // directions
      'Sattahip' // administrative regions
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

export const Tags = [
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