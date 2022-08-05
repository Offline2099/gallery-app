import { Gallery } from './gallery';

// 2022

export const Jan2022: Gallery = {
  name: "January",
  year: "2022",
  month: "01",
  numberOfImages: 47
};

export const Feb2022: Gallery = {
  name: "February",
  year: "2022",
  month: "02",
  numberOfImages: 20
};

export const Jul2022: Gallery = {
  name: "July",
  year: "2022",
  month: "07",
  numberOfImages: 31
};

export const All2022 = { name: "2022", galleries: [Jan2022, Feb2022, Jul2022] };

// 2021

export const Aug2021: Gallery = {
  name: "August",
  year: "2021",
  month: "08",
  numberOfImages: 21
};

export const Sep2021: Gallery = {
  name: "September",
  year: "2021",
  month: "09",
  numberOfImages: 31
};

export const Oct2021: Gallery = {
  name: "October",
  year: "2021",
  month: "10",
  numberOfImages: 12
};

export const Nov2021: Gallery = {
  name: "November",
  year: "2021",
  month: "11",
  numberOfImages: 30
};

export const Dec2021: Gallery = {
  name: "December",
  year: "2021",
  month: "12",
  numberOfImages: 6
};

export const All2021 = { name: "2021", galleries: [Aug2021, Sep2021, Oct2021, Nov2021, Dec2021] };

// 2019

export const Jan2019: Gallery = {
  name: "January",
  year: "2019",
  month: "01",
  numberOfImages: 10
};

export const Mar2019: Gallery = {
  name: "March",
  year: "2019",
  month: "03",
  numberOfImages: 18
};

export const Apr2019: Gallery = {
  name: "April",
  year: "2019",
  month: "04",
  numberOfImages: 24
};

export const All2019 = { name: "2019", galleries: [Jan2019, Mar2019, Apr2019] };

// Everything chronologically

export const GalleriesChronologically = [ All2022, All2021, All2019 ];