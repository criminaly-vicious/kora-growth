/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface ServiceTier {
  name: string;
  price: string; // Used for descriptive text in this context
  description: string;
  features: string[];
  highlight: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  PROBLEM = 'problem',
  SOLUTION = 'solution',
  DIAGNOSIS = 'diagnosis',
  SERVICES = 'services',
}

export interface Artist {
  name: string;
  image: string;
  day: string;
  genre: string;
}