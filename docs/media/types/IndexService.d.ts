import { IIndexTerm } from './IIndexTerm';
import { IIndexSearchOptions } from './IIndexSearchOptions';
import { IIndexSearchResultItem } from './IIndexSearchResultItem';
import { IndexServiceBuilder } from './IndexServiceBuilder';
/** index service */
export declare class IndexService<T> {
    /** all items */
    readonly all: T[];
    private readonly terms;
    private readonly builder;
    private emptyQueryResults;
    constructor(
    /** all items */
    all: T[], terms: IIndexTerm<T>[], builder: IndexServiceBuilder<T>);
    /** search the index
     *
     * @param query text to find
     * @param options search options
     *
     * @returns array of item results
     */
    search(query?: string, options?: IIndexSearchOptions): IIndexSearchResultItem<T>[];
    /** Build another service with the same term builders
     *
     * @param items items to index
     */
    build(items: T[]): IndexService<T>;
}
