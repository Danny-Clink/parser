const { Patterns, Urls } = require("../constants");
const {
  specificationsLayoutPattern,
  specificationsNamePattern,
  specificationsValuePattern,
  contentTitlePattern,
  productNameRu,
  productDescriptionPattern,
  anySymbolsPattern,
  div,
  closedDiv,
  closedH1,
  removeLineBreaks,
} = Patterns;
const { productInfoUrl } = Urls;

class Parser {
  constructor(Request) {
    this._request = new Request();
  }

  async parse(data) {
    const { products } = data;

    for(let product of products) {
      const response = await this._request
        .getHtmlPage(`${productInfoUrl}/${product.id}`);

      if(response) {
        const data = this.prepareData(response);

        console.log(data);
      }
    }
  }

  prepareData(data) {
    const html = data.replace(removeLineBreaks, "");
    let regularExpression = this.createRegularExpression([specificationsLayoutPattern]);
    const layoutRows = html.match(regularExpression);

    return {
      title: this.getTitle(html),
      // subscription: this.getDescription(html), // isnt done
      specifications: this.getSpecifications(layoutRows)
    }
  }

  getClearInfo(data, regulars) {
    for(const regular of regulars) {
      const regularExpression = this.createRegularExpression([regular]);
      data = data.replace(regularExpression, "");
    }

    return data.trim();
  }

  createRegularExpression(items) {
    const [ item ] = items;

    if(items.length > 1) { items.shift() }
    
    return new RegExp(items.length > 1 ? item.concat(...items) : item, "g");
  }

  getTitle(html) {
    const titlePattern = this.createRegularExpression([contentTitlePattern, anySymbolsPattern, closedDiv]);
    const [ title ] = html.match(titlePattern);

    return this.getClearInfo(title, [
      contentTitlePattern,
      div,
      closedDiv,
      ])
  }

  getSpecifications(layoutRows) {
    const namePattern = this.createRegularExpression([specificationsNamePattern, anySymbolsPattern, closedDiv]);
    const valuePattern = this.createRegularExpression([specificationsValuePattern, anySymbolsPattern, closedDiv]);

    return layoutRows.map(row => {
      let [ name ] = row.match(namePattern);
      name = this.getClearInfo(name, [
        specificationsNamePattern,
        closedDiv
      ]);

      let [ value ] = row.match(valuePattern);
      value = this.getClearInfo(value, [
        specificationsValuePattern,
        closedDiv
      ]);

      return { name, value };
    });
  }

  getDescription(html) {
    const descriptionPattern = this.createRegularExpression([productDescriptionPattern, anySymbolsPattern, closedDiv]);
    const [ description ] = html.match(descriptionPattern);

    return this.getClearInfo(description, [
      productDescriptionPattern,
      div,
      closedDiv,
      ])
  }
}

module.exports = Parser;