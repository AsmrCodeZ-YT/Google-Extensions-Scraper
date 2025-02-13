document.getElementById("scrapeButton").addEventListener("click", () => {
    document.getElementById("status").textContent = "⏳ Downloading....";

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
        });
    });
});

// Downloaded
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "showData") {
        const outputElement = document.getElementById("output");
        outputElement.textContent = JSON.stringify(message.data, null, 2);
        outputElement.classList.remove("hidden");

        document.getElementById("copyButton").classList.remove("hidden");
        document.getElementById("status").textContent = "✅ Downloaded! ";
    }
});


