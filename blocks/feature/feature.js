import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const aempublishurl = 'https://publish-p115476-e1135027.adobeaemcloud.com';
  const aemauthorurl = 'https://author-p115476-e1135027.adobeaemcloud.com';
  const commerceurl = 'https://com421.adobedemo.com/graphql';
  const persistedquery = '/graphql/execute.json/securbank/ProductByPath';

  const mediaWrapper = document.createElement('div');
  mediaWrapper.classList.add('feature-content-media');
  const picture = block.querySelector('picture');
  mediaWrapper.append(picture);

  const productWrapper = block.lastElementChild;
  const productCFPath = productWrapper && block.lastElementChild.getElementsByTagName('a').length > 0 ? block.lastElementChild.getElementsByTagName('a')[0].title : null;

  const url = window.location && window.location.origin && window.location.origin.includes('author')
    ? `${aemauthorurl}${persistedquery};path=${productCFPath};ts=${Math.random() * 1000}`
    : `${aempublishurl}${persistedquery};path=${productCFPath};ts=${Math.random() * 1000}`;
  const options = { credentials: 'include' };

  // console.log(url); //https://author-p123917-e1220159.adobeaemcloud.com/graphql/execute.json/securbank/OfferByPath;path=/content/dam/securbank/en/offers/997;variation=main;ts=172.03956935404463

  const productData = await fetch(url, options)
    .then((response) => response.json())
    .then(async (contentfragment) => {
      let product = '';
      if (contentfragment.data) {
        product = contentfragment.data.productByPath.item;
      }
      const productId = product.productReference;
      const productQueryOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }

      const productData = await fetch(commerceurl+'?query='+`
        {
          products(filter: { sku: { eq: "${productId}" } }) {
            items {
              name
              interest_rate
              sku
            }
          }
        }
      `
    , productQueryOptions)
      .then((response) => response.json())
      .then((product) => {
        if (product.data && product.data.products.items.length > 0) {
          return product.data.products.items[0];
        }
      });

      return productData;
    });

  
  

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('feature-content-wrapper');
  let row = block.getElementsByTagName('div')[3];
  row.classList.add('feature-content-container');
  contentWrapper.append(mediaWrapper);
  contentWrapper.append(row);

  const callOutWrapper = document.createElement('div');
  callOutWrapper.classList.add('feature-callout-wrapper');
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
  row = block.getElementsByTagName('div')[4];
  const placeholders = await fetchPlaceholders('');
  const { interestrate } = placeholders;
  const interest = document.createElement('p');
  interest.classList.add('feature-interest-rate');
  interest.innerHTML = `<strong>${productData ? productData.interest_rate : interestrate}</strong><sup>APR</sup>`;
  callOutWrapper.appendChild(interest);

  callOutWrapper.append(row);

  block.textContent = '';
  block.append(contentWrapper);
  block.append(callOutWrapper);
}
