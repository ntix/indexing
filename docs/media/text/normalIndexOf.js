import { toNormal } from "./toNormal.js";
/**
 * Gets the index of the text ignoring diacritics
 *
 * @param searchText text to search
 * @param findText text to find
 */
export function normalIndexOf(searchText, findText) {
    if (searchText && findText) {
        searchText = toNormal(searchText).toLowerCase();
        findText = toNormal(findText).toLowerCase();
        return searchText.indexOf(findText);
    }
    return -1;
}
