import { IndexService } from "./IndexService.js";
/** Index service builder */
export class IndexServiceBuilder {
    constructor() {
        this.builders = [];
    }
    /** adds a term builder */
    add(builder) {
        this.builders.push(builder);
    }
    /** build index on items passed using added builders */
    build(items) {
        return new IndexService(items.reduce((terms, item) => {
            this.builders.forEach((indexer) => {
                terms = terms.concat(indexer(item)
                    .filter((value) => value != null)
                    .map((value, distance) => ({
                    value,
                    distance,
                    item,
                })));
            });
            return terms;
        }, []));
    }
}
