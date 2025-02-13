(function() {
  // Main CSS Selector : ForEach
  const listItemSelector = "li.mZqwiRnIFidSPLizwEwdysUFJLGYnOuGkcmo";
  
  // CSS Selectors 
  const timeSelector = "span.update-components-actor__sub-description.text-body-xsmall.t-black--light";
  const titleSelector = "div.wWGajrcbYTtbIPNqIrjHrRjxQdwqZvCg";
  const likeSelector = "button.t-black--light.display-flex.align-items-center.social-details-social-counts__count-value.social-details-social-counts__count-value-hover";
  const cmtSelector = "button.t-black--light.social-details-social-counts__count-value.social-details-social-counts__count-value-hover.text-body-small.hoverable-link-text.social-details-social-counts__btn";
  const repSelector = "button.ember-view.t-black--light.social-details-social-counts__count-value-hover.social-details-social-counts__item--truncate-text.full-width.text-body-small.hoverable-link-text.social-details-social-counts__btn";


  // Main Selector With append Selector
  function extractFromElement(element, selector, processFunc = (text) => text) {
    const node = element.querySelector(selector);
    return node && node.textContent ? processFunc(node.textContent.trim()) : "N/A";
  }

  // Clear Funtions
  function processTimeText(text) {
    return Commen = text.split(" ")[0].trim();
  }

  
  function processLikeText(text) {
    const Like = text.split("\n")[0].trim();
    return parseInt(Like.replace(/,/g, ""), 10);
  }

  function processCRText(text) {
    const Commen = text.split(" ")[0].trim();
    return parseInt(Commen.replace(/,/g, ""), 10);
  }


  // Download as JSON
  function downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const listItems = document.querySelectorAll(listItemSelector);
  const videos = [];

  listItems.forEach(item => {
    const time = extractFromElement(item, timeSelector, processTimeText);
    const title = extractFromElement(item, titleSelector);
    const like = extractFromElement(item, likeSelector, processLikeText);
    const comment = extractFromElement(item, cmtSelector, processCRText);
    const repost = extractFromElement(item, repSelector, processCRText);

    console.log(comment);
    videos.push({ time,title, like, comment, repost});
  });

  // EXPORT
  const output = {
    videos: videos,
    site: window.location.href
  };
  console.log("Extracted Data:", output);
  downloadJSON(output, "export.json");
})();
