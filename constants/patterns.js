module.exports = {
  specificationsLayoutPattern: /<*tr class="specifications__layout-row">(.*?)<\/tr>/g,
  specificationsNamePattern: '<*div class="specifications__name">',
  specificationsValuePattern: '<*div class="specifications__value">',
  contentTitlePattern: '<*h1 class="product__name content__title">',
  productNameRu: '<*div class="product__name_ru">', // do we need it?
  productDescriptionPattern: '<*div class="product__description">',
  anySymbolsPattern: '(.*?)',
  div: '<div>',
  closedDiv: '<\/div>',
  closedH1: '<\/h1>',
  removeLineBreaks: /\r?\n|\r/g
};