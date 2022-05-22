import { IndexService } from './IndexService';
/** Index service builder */
export class IndexServiceBuilder {
    /** use IndexServiceBuilder.create<T>() to create a service builder */
    constructor(termBuilders) {
        this.termBuilders = termBuilders;
    }
    /** create an service builder for the given type */
    static create() {
        return new IndexServiceBuilder([]);
    }
    /** adds a term builder */
    add(termBuilder) {
        return new IndexServiceBuilder([...this.termBuilders, termBuilder]);
    }
    /** build index on items passed using added builders */
    build(items) {
        return new IndexService(items, items.reduce((terms, item) => {
            this.termBuilders.forEach((indexer) => {
                terms = terms.concat(indexer(item)
                    .filter((value) => value != null)
                    .map((value, distance) => ({
                    value,
                    distance,
                    item,
                })));
            });
            return terms;
        }, []), this);
    }
}
