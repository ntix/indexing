(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.validating = {}));
})(this, (function (exports) { 'use strict';

    /** Removes diacritics
     *
     * @param text text to process
     * @param processed text
     */
    function toNormal(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Gets the index of the text ignoring diacritics
     *
     * @param searchText text to search
     * @param findText text to find
     */
    function normalIndexOf(searchText, findText) {
        if (searchText && findText) {
            searchText = toNormal(searchText).toLowerCase();
            findText = toNormal(findText).toLowerCase();
            return searchText.indexOf(findText);
        }
        return -1;
    }

    /** word boundary chars */
    const INDEXER_CHARS_BOUNDARIES = ' \t\n\r\v!"£$%^&*()_+{}[]:@~;#?,./|¬=<>';

    /** Capital chars */
    const INDEXER_CHARS_CAPITAL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /** chars to ignore */
    const INDEXER_CHARS_IGNORE = "-'`";

    /** quote chars */
    const INDEXER_CHARS_QUOTE = '"';

    /** index the input exactly
     *
     * @param input input to be indexed
     */
    function indexExact(input) {
        if (!input)
            return [];
        return [
            Array.from(toNormal(`${input}`))
                .reduce((s, c) => INDEXER_CHARS_IGNORE.includes(c) ? s : [...s, c.toLowerCase()], [])
                .join(''),
        ];
    }

    /**
     * Extacts words from the text passed
     *
     * @param text text to get words from
     * @param splitCapitals split capitalised
     */
    function indexGetWords(text) {
        if (!text)
            return [];
        const is = (c, m) => m.indexOf(c) !== -1;
        text = toNormal(text + ' ');
        const words = [];
        let word = [];
        let wordType = null;
        let nextWordType = null;
        let quote = '';
        for (let i = 0; i < text.length; i++) {
            const c = text.charAt(i);
            let ignore = false;
            let isBreak = false;
            if (quote === c) {
                quote = '';
                isBreak = true;
                ignore = true;
            }
            else if (is(c, INDEXER_CHARS_QUOTE)) {
                quote = c;
                isBreak = true;
                ignore = true;
            }
            if (i === text.length - 1)
                quote = ''; // close quote on last char regardless
            if (!quote) {
                if (is(c, INDEXER_CHARS_IGNORE)) {
                    ignore = true;
                }
                else if (is(c, INDEXER_CHARS_BOUNDARIES)) {
                    if (wordType != null && wordType !== exports.indexWordType.boundary)
                        isBreak = true;
                    ignore = true;
                    nextWordType = exports.indexWordType.boundary;
                }
                else if (is(c, INDEXER_CHARS_CAPITAL)) {
                    if (wordType != null && wordType !== exports.indexWordType.textCapitals)
                        isBreak = true;
                    nextWordType = exports.indexWordType.textCapitals;
                }
                else {
                    if (wordType != null &&
                        !(wordType === exports.indexWordType.text ||
                            wordType === exports.indexWordType.textCapitals))
                        isBreak = true;
                    nextWordType = exports.indexWordType.text;
                }
            }
            if (!quote && isBreak && word.length) {
                words.push(word.join('').toLowerCase());
                if (wordType === exports.indexWordType.textCapitals && word.length > 1)
                    word.forEach((wc) => words.push(wc.toLowerCase()));
                word = [];
            }
            if (!ignore)
                word.push(c);
            wordType = nextWordType;
        }
        return words;
    }
    exports.indexWordType = void 0;
    (function (indexWordType) {
        indexWordType[indexWordType["text"] = 0] = "text";
        indexWordType[indexWordType["textCapitals"] = 1] = "textCapitals";
        indexWordType[indexWordType["boundary"] = 2] = "boundary";
    })(exports.indexWordType || (exports.indexWordType = {}));

    /** index service */
    class IndexService {
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

    /** Index service builder */
    class IndexServiceBuilder {
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

    exports.INDEXER_CHARS_BOUNDARIES = INDEXER_CHARS_BOUNDARIES;
    exports.INDEXER_CHARS_CAPITAL = INDEXER_CHARS_CAPITAL;
    exports.INDEXER_CHARS_IGNORE = INDEXER_CHARS_IGNORE;
    exports.INDEXER_CHARS_QUOTE = INDEXER_CHARS_QUOTE;
    exports.IndexService = IndexService;
    exports.IndexServiceBuilder = IndexServiceBuilder;
    exports.indexExact = indexExact;
    exports.indexGetWords = indexGetWords;
    exports.normalIndexOf = normalIndexOf;
    exports.toNormal = toNormal;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
