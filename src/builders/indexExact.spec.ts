import { INDEXER_CHARS_IGNORE } from '../constants';
import { indexExact } from './indexExact';

describe('indexExact', () => {

    [
        null,
        undefined
    ].forEach(input => {
        it(`return an empty array when input is ${input}`, () => {
            expect(indexExact(input)).toEqual([]);
        });
    });

    it('should remove ignored chars', () => {
        expect(indexExact(INDEXER_CHARS_IGNORE)).toEqual(['']);
    });
});