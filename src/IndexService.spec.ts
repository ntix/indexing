import { IndexService } from './IndexService';
import { IndexServiceBuilder } from './IndexServiceBuilder';
import { indexGetWords, indexExact } from './builders/index';

describe('index service', () => {
  const items = [
    { id: '0-0', name: 'Aa Bb' },
    { id: '1-1', name: "Ab C-c's" },
    { id: '2-2', name: 'Bb Aa' },
    { id: '3-3', name: 'Cc Aa DD' },
    { id: '4-4', name: 'Cc Ca "DD"' },
    { id: '5-5', name: 'ABC' },
  ];
  let index: IndexService<IPerson>;
  let builder: IndexServiceBuilder<IPerson>;

  beforeEach(() => {
    builder = IndexServiceBuilder.create<IPerson>()
      .add((item) => indexGetWords(item.name))
      .add((item) => indexExact(item.id));
    index = builder
      .build(items);
  });

  it('builder handles nulls etc', () => {
    expect(() => builder.add((_) => [null, undefined])).not.toThrow();
  });

  it('options.queryRequired default', () => {
    const results = index.search();

    expect(results.length).toBe(items.length);
  });

  it('search results get ranked', () => {
    const results = index.search('AB');

    expect(results[0].rank).toBe(8.5);
  });

  it('options.queryRequired true)', () => {
    const results = index.search(null, { queryRequired: true });

    expect(results.length).toBe(0);
  });

  it('finds by id', () => {
    const results = index.search(`${items[0].id} ${items[1].id}`);

    expect(results.length).toBe(2);
    expect(results[0].item).toBe(items[0]);
    expect(results[1].item).toBe(items[1]);
  });

  it('finds by capitals split', () => {
    const results = index.search('CC');

    expect(results.length).toBe(4);
    expect(results[0].item).toBe(items[4]);
    expect(results[1].item).toBe(items[3]);
    expect(results[2].item).toBe(items[1]);
    expect(results[3].item).toBe(items[5]);
  });

  it('finds and ranks', () => {
    const results = index.search('ab c');

    expect(results[0].item).toBe(items[1]);
    expect(results[1].item).toBe(items[5]);
    expect(results[2].item).toBe(items[4]);
    expect(results[3].item).toBe(items[3]);
  });

  it('finds and ranks (match threshold)', () => {
    const results = index.search('CAD', { matchThreshold: 3 });

    expect(results[0].item.name).toBe(items[3].name);
    expect(results[0].rank).not.toBe(0);
    expect(results.length).toBe(1);
  });

  it('finds by quoted or unquoted', () => {
    const results = index.search('"DD"');

    expect(results.length).toBe(2);
    expect(results[0].item).toBe(items[3]);
    expect(results[1].item).toBe(items[4]);
  });

  interface IPerson {
    id: string;
    name: string;
  }
});
