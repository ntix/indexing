import { IIndexTerm } from './IIndexTerm';
import { TermValuesBuilder } from './builders/index';
import { IndexService } from './IndexService';

/** Index service builder */
export class IndexServiceBuilder<T> {
  /** create an service builder for the given type */
  static create<T>() {
    return new IndexServiceBuilder<T>([]);
  }

  /** use IndexServiceBuilder.create<T>() to create a service builder */
  private constructor(private readonly termBuilders: TermValuesBuilder<T>[]) {}

  /** adds a term builder */
  add(termBuilder: TermValuesBuilder<T>): IndexServiceBuilder<T> {
    return new IndexServiceBuilder<T>([...this.termBuilders, termBuilder]);
  }

  /** build index on items passed using added builders */
  build(items: T[]): IndexService<T> {
    return new IndexService<T>(
      items,
      items.reduce<IIndexTerm<T>[]>((terms, item) => {
        this.termBuilders.forEach((indexer) => {
          terms = terms.concat(
            indexer(item)
              .filter((value) => value != null)
              .map((value, distance) => ({
                value,
                distance,
                item,
              }))
          );
        });

        return terms;
      }, [])
    );
  }
}
