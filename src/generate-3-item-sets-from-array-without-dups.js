'use strict';

const {
  writeFileSync,
  mkdirSync
} = require('fs');
const {
  resolve
} = require('path');

const ROOT_DIR = resolve(__dirname, '..');
const DIST_DIR = resolve(ROOT_DIR, 'dist');
const TOTAL_LENGTH = 1000;
const SET_LENGTH = 3;
const OFFSET = 1;

const getRandomFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const population = [...Array(TOTAL_LENGTH)].map((_e, i) => i + OFFSET);
const numOfSets = TOTAL_LENGTH / SET_LENGTH;

const result = [...Array(Math.floor(numOfSets))].map(() => {
  return [...Array(SET_LENGTH)].map(() => {
    const index = getRandomFromRange(0, population.length);
    const [val] = population.splice(index, 1);
    return val;
  });
});

console.log('result: ', result);

const flattenResult = result.reduce((acm, cur) => [...acm, ...cur], []);

const errors = result.reduce((errors, set) => {
  return [
    ...errors,
    ...set
    .map(num => {
      const found = flattenResult.filter(e => e === num);
      if (found.length === 1) {
        return null;
      }
      return num;
    })
    .filter(e => e)
  ];
}, []);

console.log('errors: ', errors);

mkdirSync(DIST_DIR, {
  recursive: true
});
writeFileSync(resolve(DIST_DIR, './result.json'), JSON.stringify(result, null, 2));