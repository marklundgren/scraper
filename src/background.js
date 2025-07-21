chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "download") {
    const { filename, content } = request;

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    });

    sendResponse({ status: "ok" });
  }

  // Required for async messaging
  return true;
});
