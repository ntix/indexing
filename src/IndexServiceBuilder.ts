import { IIndexTerm } from './IIndexTerm';
import { TermValuesBuilder } from './builders/index';
import { IndexService } from './IndexService';

/** Index service builder */
export class IndexServiceBuilder<T> {
  private builders: TermValuesBuilder<T>[] = [];

  /** adds a term builder */
  add(builder: TermValuesBuilder<T>) {
    this.builders.push(builder);
  }

  /** build index on items passed using added builders */
  build(items: T[]): IndexService<T> {
    return new IndexService<T>(
      items.reduce<IIndexTerm<T>[]>((terms, item) => {
        this.builders.forEach((indexer) => {
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
