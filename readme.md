# @ntix/indexing

A small text indexer

from 3.0.1 moved to github packages

![CI](https://github.com/ntix/indexing/workflows/CI/badge.svg?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/ntix/indexing/badge.svg)](https://snyk.io/test/github/ntix/indexing)
[![npm version](https://badge.fury.io/js/%40ntix%2Findexing.svg)](https://badge.fury.io/js/%40ntix%2Findexing)

[Documentation](https://ntix.github.io/indexing/)

```typescript
  import { IndexServiceBuilder } from './IndexServiceBuilder';
  import { indexGetWords, indexExact } from './builders/index';

  interface IPerson{
    id: string;
    name: string;
  }

  const items = [
    { id: '0-0', name: 'Aa Bb' },
    { id: '1-1', name: "Ab C-c's" },
    { id: '2-2', name: 'Bb Aa' },
    { id: '3-3', name: 'Cc Aa DD' },
    { id: '4-4', name: 'Cc Ca "DD"' },
    { id: '5-5', name: 'ABC' },
  ];

  const builder = IndexServiceBuilder.create<IPerson>()
      .add((item) => indexGetWords(item.name))
      .add((item) => indexExact(item.id));

  const index = builder
      .build(items);
  });

  const results = index.search('AB');

  > results 
  > { item: { id: '5-5', name: 'ABC' }, rank: 8.5 }

```

See tests for more examples of usage
