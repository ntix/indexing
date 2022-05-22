import { indexGetWords } from './builders/index';
/** index service */
export class IndexService {
    constructor(
    /** all items */
    all, terms, builder) {
        this.all = all;
        this.terms = terms;
        this.builder = builder;
        this.emptyQueryResults = all.map((item) => ({ item, rank: 0 }));
    }
    /** search the index
     *
     * @param query text to find
     * @param options search options
     *
     * @returns array of item results
     */
    search(query, options) {
        if (!query)
            return (options === null || options === void 0 ? void 0 : options.queryRequired) ? [] : this.emptyQueryResults;
        const words = indexGetWords(query);
        let all = words.reduce((results, word, wordIndex) => {
            this.terms.forEach((term) => {
                if (term.value.startsWith(word)) {
                    let result = results.find((r) => r.item === term.item);
                    if (result)
                        result.rank += 1;
                    else {
                        result = {
                            item: term.item,
                            rank: 0,
                            lastIndex: 0,
                            matches: {},
                        };
                        results.push(result);
                    }
                    result.rank += word.length / term.value.length;
                    if (!result.matches[wordIndex] && term.distance >= result.lastIndex)
                        result.rank += 1 / Math.pow(2, term.distance - result.lastIndex);
                    result.matches[wordIndex] = true;
                    result.lastIndex = term.distance;
                }
            });
            return results;
        }, []);
        if (options) {
            if (options.matchThreshold) {
                const matchThreshold = options.matchThreshold;
                all = all.filter((r) => Object.keys(r.matches).length >= matchThreshold);
            }
        }
        all.sort((a, b) => (a.rank > b.rank ? -1 : a.rank < b.rank ? 1 : 0));
        return all.map((i) => ({
            item: i.item,
            rank: i.rank,
        }));
    }
    /** Build another service with the same term builders
     *
     * @param items items to index
     */
    build(items) {
        return this.builder.build(items);
    }
}
