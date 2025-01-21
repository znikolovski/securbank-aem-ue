import {
    h, Component, Fragment, render
    // eslint-disable-next-line import/no-unresolved,import/extensions
  } from '../../scripts/preact.js';
  // eslint-disable-next-line import/no-unresolved,import/extensions
  import htm from '../../scripts/htm.js';
  
  const html = htm.bind(h);

export default async function decorate(block) {
    block.innerHTML = '<div></div>'
    const iconHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L3.54223 12.3383C1.93278 11.0162 1 9.04287 1 6.96005C1 3.11612 4.15607 0 8 0C11.8439 0 15 3.11612 15 6.96005C15 9.04287 14.0672 11.0162 12.4578 12.3383L8 16ZM3 6H5C6.10457 6 7 6.89543 7 8V9L3 7.5V6ZM11 6C9.89543 6 9 6.89543 9 8V9L13 7.5V6H11Z" fill="#000000"/>
</svg>`;
    
    return new Promise((resolve) => {
        const app = html`<${Fragment}>
        <span class=${`icon iconTest`} dangerouslySetInnerHTML=${{ __html: iconHTML }}>
        </span>
        </Fragment>
        `;
        render(app, block);
        resolve();
    })
    
}