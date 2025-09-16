async function fetchDisasterAlerts() {
  const RSS_URL = "https://reliefweb.int/disasters/rss.xml";
  const PROXY_URL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL);
  const alertContainer = document.querySelector(".alert-container");
  const lastUpdated = document.querySelector(".last-updated");
  const retryButton = document.querySelector(".retry-button");

  if (!alertContainer || !lastUpdated || !retryButton) return;

  // Show loading state
  alertContainer.innerHTML = `
    <div class="alert-item loading">
      <span class="alert-badge info">INFO</span>
      <p>Loading alerts...</p>
      <span class="alert-time">Now</span>
    </div>
  `;
  retryButton.style.display = "none";

  try {
    console.log("Fetching:", PROXY_URL);
    const response = await fetch(PROXY_URL);
    console.log("Response status:", response.status);

    if (!response.ok) throw new Error("Failed to fetch RSS feed");

    const text = await response.text();
    console.log("Fetched text length:", text.length);

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const items = xml.querySelectorAll("item");

    console.log("Parsed items:", items.length);

    alertContainer.innerHTML = "";
    lastUpdated.textContent = Last updated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })};

    if (items.length === 0) {
      alertContainer.innerHTML = `
        <article class="alert-item no-data">
          <span class="alert-badge warning">WARNING</span>
          <p>No alerts available right now.</p>
          <span class="alert-time">Now</span>
        </article>
      `;
      return;
    }

    items.forEach((item, idx) => {
      if (idx < 5) {
        const title = item.querySelector("title")?.textContent || "No title";
        const pubDate = item.querySelector("pubDate")?.textContent || "";
        const dateObj = new Date(pubDate);
        const formattedDate = !isNaN(dateObj)
          ? dateObj.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          : pubDate;

        const newAlert = document.createElement("article");
        newAlert.className = "alert-item";
        newAlert.innerHTML = `
          <span class="alert-badge info">INFO</span>
          <p>${title}</p>
          <span class="alert-time">${formattedDate}</span>
        `;
        alertContainer.appendChild(newAlert);
      }
    });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    alertContainer.innerHTML = `
      <article class="alert-item error">
        <span class="alert-badge warning">WARNING</span>
        <p>Unable to load live alerts. Please try again later.</p>
        <span class="alert-time">Now</span>
      </article>
    `;
    lastUpdated.textContent = Last updated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (Failed);
    retryButton.style.display = "block";
  }
}

// Chatbot toggle functionality
function setupChatbot() {
  const chatbotIcon = document.querySelector(".chatbot-icon");
  const chatbotContainer = document.querySelector(".chatbot-container");
  const chatbotClose = document.querySelector(".chatbot-close");

  if (chatbotIcon && chatbotContainer && chatbotClose) {
    chatbotIcon.addEventListener("click", () => {
      chatbotContainer.style.display = chatbotContainer.style.display === "none" ? "flex" : "none";
    });
    chatbotClose.addEventListener("click", () => {
      chatbotContainer.style.display = "none";
    });
  }
}

// Initialize
fetchDisasterAlerts();
setInterval(fetchDisasterAlerts, 12000);
setupChatbot();

// Retry button handler
document.querySelector(".retry-button")?.addEventListener("click", fetchDisasterAlerts);