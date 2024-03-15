import { createOptimizedPicture } from '../../scripts/aem.js';

/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
    const aempublishurl = 'https://publish-p123917-e1220159.adobeaemcloud.com';
    const aemauthorurl = 'https://author-p123917-e1220159.adobeaemcloud.com';
    const persistedquery = '/graphql/execute.json/securbank/CreditCardByPath';
    const creditcardpath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
    const variationname = block.querySelector(':scope div:nth-child(2) > div').innerHTML.trim();
  
    const url = window.location && window.location.origin && window.location.origin.includes('author')
      ? `${aemauthorurl}${persistedquery};path=${creditcardpath};variation=${variationname};ts=${Math.random() * 1000}`
      : `${aempublishurl}${persistedquery};path=${creditcardpath};variation=${variationname};ts=${Math.random() * 1000}`;
    const options = { credentials: 'include' };
  
    const cfReq = await fetch(url, options)
      .then((response) => response.json())
      .then((contentfragment) => {
        let offer = '';
        if (contentfragment.data) {
          offer = contentfragment.data.creditCardByPath.item;
        }
        return offer;
      });
  
    const itemId = `urn:aemconnection:${creditcardpath}/jcr:content/data/master`;
  
    block.innerHTML = `
    <div class='creditcard' data-aue-resource=${itemId} data-aue-type="reference" data-aue-filter="cf">
        <div>
            <img class='ccimage' data-aue-prop="cardImage" data-aue-type="media" src=${cfReq.cardImage._publishUrl}>
            <p data-aue-prop="headline" data-aue-type="text" class='ccname'>${cfReq.name}</p>
            <p data-aue-prop="detail" data-aue-type="richtext" class='ccbenefits'>${cfReq.keyBenefits.plaintext}</p>
        </div>
        <div class='banner-logo'>
        </div>
    </div>
  `;
  }
  