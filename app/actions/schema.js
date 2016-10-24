import { Schema, arrayOf } from 'normalizr';

export const company = new Schema('company');
export const arrayOfCompanies = arrayOf(company);

export const ads = new Schema('ads');
export const arrayOfAds = arrayOf(ads);