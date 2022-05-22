import { toNormal } from '../text/index';
import { INDEXER_CHARS_IGNORE, INDEXER_CHARS_QUOTE, INDEXER_CHARS_CAPITAL, INDEXER_CHARS_BOUNDARIES, } from '../constants/index';
/**
 * Extacts words from the text passed
 *
 * @param text text to get words from
 * @param splitCapitals split capitalised
 */
export function indexGetWords(text) {
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
                if (wordType != null && wordType !== indexWordType.boundary)
                    isBreak = true;
                ignore = true;
                nextWordType = indexWordType.boundary;
            }
            else if (is(c, INDEXER_CHARS_CAPITAL)) {
                if (wordType != null && wordType !== indexWordType.textCapitals)
                    isBreak = true;
                nextWordType = indexWordType.textCapitals;
            }
            else {
                if (wordType != null &&
                    !(wordType === indexWordType.text ||
                        wordType === indexWordType.textCapitals))
                    isBreak = true;
                nextWordType = indexWordType.text;
            }
        }
        if (!quote && isBreak && word.length) {
            words.push(word.join('').toLowerCase());
            if (wordType === indexWordType.textCapitals && word.length > 1)
                word.forEach((wc) => words.push(wc.toLowerCase()));
            word = [];
        }
        if (!ignore)
            word.push(c);
        wordType = nextWordType;
    }
    return words;
}
export var indexWordType;
(function (indexWordType) {
    indexWordType[indexWordType["text"] = 0] = "text";
    indexWordType[indexWordType["textCapitals"] = 1] = "textCapitals";
    indexWordType[indexWordType["boundary"] = 2] = "boundary";
})(indexWordType || (indexWordType = {}));
