import { IIndexTerm } from './IIndexTerm';
import { IIndexSearchOptions } from './IIndexSearchOptions';
import { IIndexSearchResultItem } from './IIndexSearchResultItem';
/** index service */
export declare class IndexService<T> {
  private terms;
  constructor(terms: IIndexTerm<T>[]);
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
  ): IIndexSearchResultItem<T>[];
}
