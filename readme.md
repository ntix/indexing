# @ntix/indexing

A small text indexer

from 3.0.1 moved to github packages

[![Build](https://github.com/ntix/indexing/actions/workflows/build.yml/badge.svg)](https://github.com/ntix/indexing/actions/workflows/build.yml)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1a87c55f9eb644488095b31b223676a6)](https://app.codacy.com/gh/ntix/indexing?utm_source=github.com&utm_medium=referral&utm_content=ntix/indexing&utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/c5d087874caf417c9e38073ee9770fc2)](https://app.codacy.com/gh/ntix/indexing/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)[![Known Vulnerabilities](https://snyk.io/test/github/ntix/indexing/badge.svg)](https://snyk.io/test/github/ntix/indexing)
![Deploy](https://github.com/ntix/indexing/actions/workflows/deploy.yml/badge.svg)

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
