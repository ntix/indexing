import { indexGetWords } from './indexGetWords';

describe('indexGetWords', () => {
  [
    { words: 'a b', expected: ['a', 'b'] },
    { words: 'á b', expected: ['a', 'b'] },
    { words: 'A B', expected: ['a', 'b'] },
    { words: 'ab', expected: ['ab'] },
    { words: '"ab"', expected: ['ab'] },
    { words: '"AB"', expected: ['ab'] },
    { words: 'a"b', expected: ['ab'] },
    { words: 'AB', expected: ['ab', 'a', 'b'] },
    { words: 'a BC', expected: ['a', 'bc', 'b', 'c'] },
    { words: 'Ab', expected: ['ab'] },
    { words: 'aB', expected: ['a', 'b'] },
    { words: 'a "bc d EF"', expected: ['a', 'bc d ef'] },
    { words: 'ab"', expected: ['ab'] },
    { words: 'a-b`c\'d', expected: ['abcd'] }
  ].forEach(({ words, expected }) => {
    it(`indexGetWords(${words}) => ${expected}`, () => {
      expect(indexGetWords(words)).toEqual(expected);
    });
  });
});
