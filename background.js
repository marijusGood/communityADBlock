let key = "key";
let value = "aaa";

// storage https://developer.chrome.com/docs/extensions/reference/storage/#usage
chrome.storage.local.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});

// why is this here?
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
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
  console.log(request);
}