import { normalIndexOf } from './normalIndexOf';

describe('base index of', () => {
  [
    { a: 'abcd', b: 'bc', expected: 1 },
    { a: 'abcd', b: 'd', expected: 3 },
    { a: 'abcd', b: 'ä', expected: 0 },
    { a: 'äbcd', b: 'a', expected: 0 },
    { a: 'äbcd', b: 'A', expected: 0 },
    { a: 'äb d', b: ' D', expected: 2 },
    { a: 'äbcd', b: 'E', expected: -1 },
    { a: 'äbcd', b: 'de', expected: -1 },
    { a: ' äbcde ab', b: ' e', expected: -1 }
  ].forEach(({ a, b, expected }) => {
    it(`indexOf ${b} in ${a} is ${expected}`, () => {
      expect(normalIndexOf(a, b)).toBe(expected);
    });
  });
});
