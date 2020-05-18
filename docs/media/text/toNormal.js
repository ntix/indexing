/** Removes diacritics
 *
 * @param text text to process
 * @param processed text
 */
export function toNormal(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
