/**
 * describes an index term
 */
export interface IIndexTerm<T> {
    /** term value */
    value: string;
    /** distance of term in the source */
    distance: number;
    /** item term found in */
    item: T;
}
