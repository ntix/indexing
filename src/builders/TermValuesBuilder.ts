/**
 * describes a term values builder,
 * taking an item and returning term values array
 *
 * @param item object to index
 *
 * @returns array of term values to add to the index
 */
export type TermValuesBuilder<T> = (item: T) => (string | null | undefined)[];
