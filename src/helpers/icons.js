export const homeIcon =
`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
  <g fill="none" stroke="#000" stroke-linecap="square" stroke-linejoin="square" data-name="House 1">
    <path d="M5.5 14.48l-1 .84V27.5h6v-11h9v11h6V15.32M25.5 11.19V4.5h-4v3.38"/>
    <path d="M15 2.5L.5 14.5l2 2.5L15 6.5 27.5 17l2-2.5L15 2.5z"/>
  </g>
</svg>
`;

export const searchIcon =
`
<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path d="M12.543 10.497l5.245 5.245c.586.586.59 1.532 0 2.122a1.495 1.495 0 0 1-2.125-.004l-5.262-5.263" id="search-icon-a"/>
    <mask id="search-icon-c" x="0" y="0" width="7.829" height="7.809" fill="#fff">
      <use xlink:href="#search-icon-a"/>
    </mask>
    <circle id="search-icon-b" cx="7" cy="7" r="7"/>
    <mask id="search-icon-d" x="0" y="0" width="14" height="14" fill="#fff">
      <use xlink:href="#search-icon-b"/>
    </mask>
  </defs>
  <g transform="translate(1 1)" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="square">
    <use stroke="#3c3c3b" mask="url(#search-icon-c)" xlink:href="#search-icon-a"/>
    <use stroke="#3c3c3b" mask="url(#search-icon-d)" xlink:href="#search-icon-b"/>
  </g>
</svg>
`;

export const myShowsIcon =
`
<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.005 13.73l.59 4.659c.018.135-.009.205-.027.226-.035.04-.14.007-.234-.038l-4.29-1.995a2.536 2.536 0 0 0-1.043-.206c-.388 0-.757.073-1.041.206l-4.292 1.995c-.152.072-.21.066-.234.038-.018-.02-.044-.09-.025-.228l.588-4.66c.076-.646-.209-1.516-.649-1.98l-3.236-3.43c-.109-.117-.115-.19-.111-.203.005-.013.053-.069.207-.099l4.655-.886c.631-.115 1.373-.651 1.69-1.22L10.005 1.5l2.445 4.41c.317.568 1.06 1.104 1.688 1.218l4.65.887c.158.03.208.087.211.099.004.012-.004.085-.114.202l-3.23 3.43c-.447.471-.733 1.344-.65 1.984z" stroke="#3c3c3b" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const settingsIcon =
`
<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <circle id="a" cx="9" cy="13" r="2"/>
    <mask id="d" x="0" y="0" width="4" height="4" fill="#fff">
      <use xlink:href="#a"/>
    </mask>
    <circle id="b" cx="16" cy="5" r="2"/>
    <mask id="e" x="0" y="0" width="4" height="4" fill="#fff">
      <use xlink:href="#b"/>
    </mask>
    <circle id="c" cx="2" cy="8" r="2"/>
    <mask id="f" x="0" y="0" width="4" height="4" fill="#fff">
      <use xlink:href="#c"/>
    </mask>
  </defs>
  <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
    <path d="M2 .5v6M2 9.5v8M9 .5v11M9 14.5v3M16 .5v3M16 6.5v11" stroke="#3c3c3b" stroke-linecap="round" stroke-linejoin="round"/>
    <use stroke="#3c3c3b" mask="url(#d)" stroke-width="2" stroke-linecap="square" xlink:href="#a"/>
    <use stroke="#3c3c3b" mask="url(#e)" stroke-width="2" stroke-linecap="square" xlink:href="#b"/>
    <use stroke="#3c3c3b" mask="url(#f)" stroke-width="2" stroke-linecap="square" xlink:href="#c"/>
  </g>
</svg>
`;
