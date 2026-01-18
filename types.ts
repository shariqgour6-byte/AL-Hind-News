export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi',
  ARABIC = 'ar',
  URDU = 'ur'
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: string;
  timestamp: string;
  imageUrl?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export const SUPPORTED_SOURCES = [
  'Al Jazeera',
  'BBC',
  'India Today',
  'India Times',
  'New York Times'
];

export const CATEGORIES = [
  'World',
  'Politics',
  'Technology',
  'Business',
  'Sports',
  'Entertainment'
];
