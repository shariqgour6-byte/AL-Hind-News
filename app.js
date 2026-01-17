async function loadNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = "Khabrein load ho rahi hain...";
    
    try {
        // Hum Google News ki RSS feed ko JSON mein convert karke use kar rahe hain
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=hi&gl=IN&ceid=IN:hi');
        const data = await res.json();
        
        container.innerHTML = "";
        data.items.forEach(item => {
            container.innerHTML += `
                <div style="border:1px solid #ccc; padding:10px; margin:10px; border-radius:8px;">
                    <h3>${item.title}</h3>
                    <p>${item.pubDate}</p>
                    <a href="${item.link}" target="_blank">Pura Padhein</a>
                </div>`;
        });
    } catch (e) {
        container.innerHTML = "News load nahi ho saki.";
    }
}
window.onload = loadNews;
