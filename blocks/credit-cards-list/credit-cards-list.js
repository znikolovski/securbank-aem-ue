export default async function decorate(block) {

  const props = [...block.children];
  const firsttag = props[0].textContent.trim();
  const variationname = props[1].textContent.trim() || "master";

  console.log(firsttag);
  console.log(variationname);

  const url = 'https://publish-p55117-e571178.adobeaemcloud.com/graphql/execute.json/securbank/CreditCardList';
  const options = {};
  const faq = await fetch(url, options);
  const index = await faq.json();

  let itemsHTML = '';
  index.data.faqList.items.forEach(item => {
    itemsHTML += `
      <li data-aue-resource="urn:aemconnection:` + item._path + `/jcr:content/data/master" data-aue-type="reference" data-aue-label="faq content fragment" data-aue-filter="cf">
        <h4 data-aue-prop="question" data-aue-label="question" data-aue-type="text">${item.creditCardName}</h4>
        <p data-aue-prop="answer" data-aue-label="answer" data-aue-type="richtext" class="faqDescription">${item.shortSummary.plaintext}</p>
      </li>`;
  });

  block.innerHTML = `
    <h2 class='sectionHeading'>Credit Cards</h2>
    <ul class="faqList">
      ${itemsHTML}
    </ul>`;
}
