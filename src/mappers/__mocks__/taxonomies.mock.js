export const standardTaxonomies = [
  {
    id: 1,
    name: 'Root',
    parent: null,
    store: { id: 1 },
  },
  {
    id: 2,
    name: 'Branch',
    parent: { id: 1 },
    store: { id: 1 },
  },
  {
    id: 3,
    name: 'Branch2',
    parent: { id: 1 },
    store: { id: 1 },
  },
  {
    id: 4,
    name: 'Leaf',
    parent: { id: 2 },
    store: { id: 1 },
  },
  {
    id: 5,
    name: 'Leaf2',
    parent: { id: 2 },
    store: { id: 1 },
  },
  {
    id: 6,
    name: 'Leaf3',
    parent: { id: 3 },
    store: { id: 1 },
  },
  {
    id: 7,
    name: 'Root2',
    parent: null,
    store: { id: 1 },
  },
];

export const standardTaxonomiesResult = [
  {
    id: 1,
    name: 'Root',
    parent: null,
    store: { id: 1 },
    children: [
      {
        id: 2,
        name: 'Branch',
        parent: { id: 1 },
        store: { id: 1 },
        children: [
          {
            id: 4,
            name: 'Leaf',
            parent: { id: 2 },
            store: { id: 1 },
            children: [],
          },
          {
            id: 5,
            name: 'Leaf2',
            parent: { id: 2 },
            store: { id: 1 },
            children: [],
          },
        ],
      },
      {
        id: 3,
        name: 'Branch2',
        parent: { id: 1 },
        store: { id: 1 },
        children: [
          {
            id: 6,
            name: 'Leaf3',
            parent: { id: 3 },
            store: { id: 1 },
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'Root2',
    parent: null,
    store: { id: 1 },
    children: [],
  },
];

export const circularTaxonomies = [
  {
    id: 1,
    name: 'Root',
    parent: null,
  },
  {
    id: 2,
    name: 'Branch',
    parent: { id: 1 },
  },
  {
    id: 3,
    name: 'Branch2',
    parent: { id: 1 },
  },
  {
    id: 4,
    name: 'CircularLeaf1',
    parent: { id: 5 },
  },
  {
    id: 5,
    name: 'CircularLeaf2',
    parent: { id: 4 },
  },
  {
    id: 6,
    name: 'Leaf3',
    parent: { id: 3 },
  },
  {
    id: 7,
    name: 'Root2',
    parent: null,
  },
];

export const circularTaxonomiesResult = [
  {
    id: 1,
    name: 'Root',
    parent: null,
    children: [
      {
        id: 2,
        name: 'Branch',
        parent: { id: 1 },
        children: [],
      },
      {
        id: 3,
        name: 'Branch2',
        parent: { id: 1 },
        children: [
          {
            id: 6,
            name: 'Leaf3',
            parent: { id: 3 },
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'Root2',
    parent: null,
    children: [],
  },
];
