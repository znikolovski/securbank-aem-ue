export default function decorate(block) {
  const rows = [...block.children];
  const firstRowCols = [...rows[0].children];

  // Standard columns structure: 1 row with 2+ columns
  if (firstRowCols.length >= 2) {
    block.classList.add(`columns-${firstRowCols.length}-cols`);
    rows.forEach((row) => {
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          if (picWrapper && picWrapper.children.length === 1) {
            picWrapper.classList.add('columns-highlight-img-col');
          }
          return;
        }
        // Handle image reference links (DAM asset URLs rendered as <a> tags)
        const link = col.querySelector('a[href]');
        if (link && /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(new URL(link.href, window.location).pathname)) {
          const img = document.createElement('img');
          img.src = link.href;
          img.alt = '';
          img.loading = 'lazy';
          col.replaceChildren(img);
          col.classList.add('columns-highlight-img-col');
        }
      });
    });
    return;
  }

  // Legacy/fallback: multiple single-column rows authored via block model
  // Restructure into 2 columns: first row with image → left, rest → right
  const imageRow = rows.find((row) => row.querySelector('picture, img, a[href*="assets"]'));
  const contentRows = rows.filter((row) => row !== imageRow);

  const newRow = document.createElement('div');
  const imgCol = document.createElement('div');
  const textCol = document.createElement('div');

  imgCol.classList.add('columns-highlight-img-col');

  if (imageRow) {
    // Move image content into the image column
    const imgContent = imageRow.querySelector('picture')
      || imageRow.querySelector('img');
    if (imgContent) {
      imgCol.appendChild(imgContent);
    } else {
      // Image might be a link to an asset — convert to an img
      const link = imageRow.querySelector('a');
      if (link) {
        const img = document.createElement('img');
        img.src = link.href;
        img.alt = link.textContent || '';
        img.loading = 'lazy';
        imgCol.appendChild(img);
      }
    }
  }

  // Move all remaining content into the text column
  contentRows.forEach((row) => {
    [...row.querySelectorAll(':scope > div > *')].forEach((el) => {
      textCol.appendChild(el);
    });
  });

  newRow.appendChild(imgCol);
  newRow.appendChild(textCol);

  block.textContent = '';
  block.appendChild(newRow);
  block.classList.add('columns-2-cols');
}
