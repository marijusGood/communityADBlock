function saveADToStorage(recivedDataJson) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
      var tabURL = tabs[0].url;

      let pattern = /(?:\/\/).+?(?=\/)/;
      let match = tabURL.match(pattern)[0];
      let url = match.substring(2, match.length);

      chrome.storage.local.set({[url]: recivedDataJson}, function() {
        console.log(url +' is set to ' + recivedDataJson);
      });
  });

}

//example of a listener
chrome.tabs.onUpdated.addListener(
    () => {
      console.log("test")
    }
)

chrome.runtime.onMessage.addListener(receiver);

// element that is deleted 
function receiver(request, sender, sendResponse) {
  sendResponse({status: 'ok'});
  saveADToStorage(JSON.stringify(request));
}

