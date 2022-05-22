import { TermValuesBuilder } from './builders/index';
import { IndexService } from './IndexService';
/** Index service builder */
export declare class IndexServiceBuilder<T> {
    private readonly termBuilders;
    /** create an service builder for the given type */
    static create<T>(): IndexServiceBuilder<T>;
    /** use IndexServiceBuilder.create<T>() to create a service builder */
    private constructor();
    /** adds a term builder */
    add(termBuilder: TermValuesBuilder<T>): IndexServiceBuilder<T>;
    /** build index on items passed using added builders */
    build(items: T[]): IndexService<T>;
}
