const { hostname } = require("os");
const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  //"a" refers to <a> elements in html
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      try {
        //invalied url
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
        //relative url
        //   urls.push(`${baseURL}${linkElement.href}`);
      } catch (err) {
        console.log(`error with relative url ${err.message}`);
      }
    } else {
      //absolute url
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url ${err.message}`);
      }
    }
  }

  return urls;
}

function normaliseURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}
module.exports = {
  normaliseURL,
  getURLsFromHTML,
};
