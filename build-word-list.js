const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const fs = require('fs');

(async function () {
  const response = await fetch('https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000')
  const dom = (new JSDOM(await response.text())).window.document;


  let lis = Array.prototype.map.call(dom.querySelector('.top-g').querySelectorAll('li'),li => {
    return li.firstElementChild.textContent
  });

  // remove duplicates
  lis = [...lis]

  fs.writeFileSync('words.js',`const words = ${JSON.stringify(lis)};`)
})();