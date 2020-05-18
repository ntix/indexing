/**
 * Extacts words from the text passed
 *
 * @param text text to get words from
 * @param splitCapitals split capitalised
 */
export declare function indexGetWords(text: string): string[];
export declare enum indexWordType {
    text = 0,
    textCapitals = 1,
    whitespace = 2
}
