/** Removes diacritics
 *
 * @param text text to process
 * @param processed text
 */
export function toNormal(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
