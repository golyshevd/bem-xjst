block('b')(
  addMix()(function() {
    return { block: 'mixed' };
  }),

  content()('test')
);
