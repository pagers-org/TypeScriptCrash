import { RANDOM_NUMBER_RANGE } from '../utils/constants';

export const getRandom = () =>
  Math.floor(Math.random() * RANDOM_NUMBER_RANGE) + 1;
