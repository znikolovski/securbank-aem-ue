import { sampleRUM } from './aem.js';
import { initRumTracking, pushEventToDataLayer } from '../plugins/martech/src/index.js';

// Define RUM tracking function
const track = initRumTracking(sampleRUM, { withRumEnhancer: false });

// Track page views when the page is fully rendered
// The data will be automatically enriched with applied propositions for personalization use cases
track('lazy', () => {
  pushEventToDataLayer(
    'web.webpagedetails.pageViews', {
      web: {
        webPageDetails: {
          URL: window.location.href,
          name: document.title || '',
          pageViews: { value: 1 },
          isHomePage: window.location.pathname === '/',
        },
      },
    });
});

track('click', ({source, target}) => {
  pushEventToDataLayer('web.webinteraction.linkClicks', {
    web: {
      webInteraction: {
        URL: target,
        name: source,
        linkClicks: { value: 1 },
        type: target && new URL(target).origin !== window.location.origin
          ? 'exit'
          : 'other',
      },
    },
  });
});