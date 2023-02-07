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


// chrome.tabs.query(params, (tabs) => {

//   let message = {
//     nodeName: "NAV",
//     ID: "",
//     Class: "header-nav",
//     message: "fromBC"
//   }
  
//   //send to removeAD.js to be activated (this seems wrong)
//   chrome.tabs.sendMessage(tabs[0].id, message);
// });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(1000);



function myFunction() {
  let params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params, (tabs) => {
    let message = {
      nodeName: "NAV",
      ID: "",
      Class: "header-nav",
      message: "fromBC"
    }
    
    //send to removeAD.js to be activated (this seems wrong)
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

myFunction();