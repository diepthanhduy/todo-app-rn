import {HEIGHT, WIDTH} from '../constants/constants';

// Base on iphone 12
const BASE_WIDTH = 390;

const BASE_HEIGHT = 844;

export const widthScale = (size = 1) => WIDTH * (size / BASE_WIDTH);

export const heightScale = (size = 1) => HEIGHT * (size / BASE_HEIGHT);

export const fontSize = (size: number) =>
  size * Math.min(widthScale(), heightScale());

export const scale = (size = 1) => widthScale(size);
