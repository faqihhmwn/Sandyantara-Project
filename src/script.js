// for disable right click
document.addEventListener(
  "contextmenu",
  function (event) {
    event.preventDefault();
    alert("Right Click is Disable");
  },
  false
);

// for rss feed
document.addEventListener("DOMContentLoaded", function () {
  var rssFeedUrl = "https://rss.app/feeds/ttq80Z9EgmKGobpB.xml";

  fetch(rssFeedUrl)
    .then((response) => response.text())
    .then((data) => {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");
      let items = xmlDoc.getElementsByTagName("item");

      for (let i = 0; i < items.length; i++) {
        let title = items[i].getElementsByTagName("title")[0].textContent;
        let link = items[i].getElementsByTagName("link")[0].textContent;
        let description =
          items[i].getElementsByTagName("description")[0].textContent;

        let newsItem = `
                    <div class="news-item">
                        <h2><a href="${link}" target="_blank">${title}</a></h2>
                        <a href="${link}" target="_blank">${description} read more...</a>
                    </div>
                `;

        document
          .getElementById("rss-feed")
          .insertAdjacentHTML("beforeend", newsItem);
      }
    })
    .catch((error) => console.error("Error fetching the RSS feed:", error));
});
