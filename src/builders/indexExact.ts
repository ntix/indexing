import { toNormal } from '../text/index';
import { INDEXER_CHARS_IGNORE } from '../constants/index';

/** index the input exactly
 *
 * @param input input to be indexed
 */
export function indexExact(input: any): string[] {
  if (!input) return [];

  return [
    Array.from(toNormal(`${input}`))
      .reduce(
        (s, c) =>
          INDEXER_CHARS_IGNORE.includes(c) ? s : [...s, c.toLowerCase()],
        []
      )
      .join(''),
  ];
}
