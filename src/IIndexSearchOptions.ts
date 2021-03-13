/**
 * describes options available to search method
 */
export interface IIndexSearchOptions {
  /** number of matches required */
  matchThreshold?: number;
  /** when true empty query returns empty results */
  queryRequired?: boolean;
}
