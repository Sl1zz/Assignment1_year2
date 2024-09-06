document.addEventListener("DOMContentLoaded", loadRSS);
function loadRSS() {
    // Use CORS proxy
    let proxy = 'https://cors-anywhere.herokuapp.com/';

    // RSS feed URL (Breaking News)
    let url = 'https://www.beehive.govt.nz/rss.xml';

    // Create an XMLHttpRequest Object to request the XML file
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", proxy + url, true);
    xhttp.send();

    // Process RSS file when it has been loaded successfully
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                if (this.responseXML) {
                    parseRSS(this.responseXML);
                } else {
                    console.error('Failed to parse XML.');
                }
            } else {
                console.error('Error fetching RSS feed:', this.statusText);
            }
        }
    };
}

function parseRSS(xmlDoc) {
    const items = xmlDoc.getElementsByTagName('item');
    if (!items.length) {
        console.error('No items found in the RSS feed.');
        return;
    }

    let rssContentLeft = '';
    let rssContentRight = '';

    // Loop through all items and distribute between two columns
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = item.getElementsByTagName('title')[0]?.textContent || 'No Title';
        const link = item.getElementsByTagName('link')[0]?.textContent || '#';
        const description = item.getElementsByTagName('description')[0]?.textContent || 'No Description';
        const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || 'No Date';

        const content = `
            <div class="rss-item border border-success  border-2 rounded p-3 mb-3 ">
                <h3><a href="${link}" target="_blank">${title}</a></h3>
                <p class="fst-italic">${new Date(pubDate).toLocaleDateString()}</p>
                <p>${description}</p>
            </div>
        `;

        // Alternate items between left and right columns
        if (i % 2 === 0) {
            rssContentLeft += content;
        } else {
            rssContentRight += content;
        }
    }

    // Display the RSS content in two columns
    document.getElementById('rssFeedLeft').innerHTML = rssContentLeft;
    document.getElementById('rssFeedRight').innerHTML = rssContentRight;
}