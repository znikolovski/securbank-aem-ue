import { fetchPlaceholders } from '../../scripts/aem.js';


export default async function decorate(block) {
  let row = block.firstElementChild;
  const featureimage = row.querySelector('picture');
  let featurecontent = block.getElementsByTagName('div')[3]
  featurecontent.classList.add('feature-content-container');
  featurecontent.prepend(featureimage);
  row = block.getElementsByTagName('div')[5]
  row.classList.add('feature-cta-container');

  block.textContent = '';
  block.append(featurecontent);
  block.append(row);
}
