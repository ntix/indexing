import { IIndexTerm } from './IIndexTerm';
import { IIndexSearchOptions } from './IIndexSearchOptions';
import { IIndexSearchResultItem } from './IIndexSearchResultItem';
import { indexGetWords } from './builders/index';

/** index service */
export class IndexService<T> {
  constructor(private terms: IIndexTerm<T>[]) {}

  /** search the index
   *
   * @param query text to find
   * @param options search options
   *
   * @returns array of item results
   */
  search(
    query: string,
    options?: IIndexSearchOptions
  ): IIndexSearchResultItem<T>[] {
    const words = indexGetWords(query);

    let all = words.reduce<any[]>((results, word, wordIndex) => {
      this.terms.forEach((term) => {
        if (term.value.startsWith(word)) {
          let result = results.find((r) => r.item === term.item);
          if (result) result.rank += 1;
          else {
            result = {
              item: term.item,
              rank: 0,
              lastIndex: 0,
              matches: {},
            };
            results.push(result);
          }

          result.rank += word.length / term.value.length;

          if (!result.matches[wordIndex] && term.distance >= result.lastIndex)
            result.rank += 1 / Math.pow(2, term.distance - result.lastIndex);

          result.matches[wordIndex] = true;
          result.lastIndex = term.distance;
        }
      });

      return results;
    }, []);

    if (options) {
      if (options.matchThreshold) {
        const matchThreshold = options.matchThreshold;
        all = all.filter(
          (r) => Object.keys(r.matches).length >= matchThreshold
        );
      }
    }

    all.sort((a, b) => (a.rank > b.rank ? -1 : a.rank < b.rank ? 1 : 0));

    return all.map((i) => ({
      item: i.item,
      rank: i.rank,
    }));
  }
}
