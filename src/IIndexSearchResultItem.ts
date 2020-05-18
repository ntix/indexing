/**
 * describes a result from an index search
 */
export interface IIndexSearchResultItem<T> {
  item: T;
  rank: number;
}
