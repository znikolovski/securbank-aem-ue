export default async function decorate(block) {

  const url = 'https://publish-p55117-e571178.adobeaemcloud.com/graphql/execute.json/securbank/FAQListbyTag;tag=transactions';
  const options = {};
  const faq = await fetch(url, options);
  const index = await faq.json();
  console.log(index.data.faqList.items);

  block.innerHTML = `
                <h4 class='sectionHeading'>Frequently Asked Questions</h4>
                <ul class="faqList">
                <li>
                  <details class="faqDetails">    
                                  <summary class="faqHeading">
                                      <span data-aue-prop="question" data-aue-type="text" >Question</span>
                                      <b></b>
                                  </summary>
                                  <div data-aue-prop="answer" data-aue-type="richtext" class="faqDescription">Answer</div>
                              </details>
                </li>
                </ul>`;
}