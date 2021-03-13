import { TermValuesBuilder } from './builders/index';
import { IndexService } from './IndexService';
/** Index service builder */
export declare class IndexServiceBuilder<T> {
  private builders;
  /** adds a term builder */
  add(builder: TermValuesBuilder<T>): void;
  /** build index on items passed using added builders */
  build(items: T[]): IndexService<T>;
}
