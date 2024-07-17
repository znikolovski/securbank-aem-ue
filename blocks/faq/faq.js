export default async function decorate(block) {

  const url = 'https://publish-p55117-e571178.adobeaemcloud.com/graphql/execute.json/securbank/FAQListbyTag;tag=transactions';
  const options = {};
  const faq = await fetch(url, options);
  const index = await faq.json();
  // console.log(index.data.faqList.items);


  let itemsHTML = '';
  index.data.faqList.items.forEach(item => {
    itemsHTML += `
      <li data-aue-resource="urn:aemconnection:` + item._path + `/jcr:content/data/master" data-aue-type="reference" data-aue-filter="cf">
        <details class="faqDetails">    
          <summary class="faqHeading">
            <span data-aue-prop="question" data-aue-type="text">${item.question}</span>
            <b></b>
          </summary>
          <div data-aue-prop="answer" data-aue-type="richtext" class="faqDescription">${item.answer.html}</div>
        </details>
      </li>`;
  });

  block.innerHTML = `
    <h4 class='sectionHeading'>Frequently Asked Questions</h4>
    <ul class="faqList">
      ${itemsHTML}
    </ul>`;
}