let key = "key";
let value = "aaa";

chrome.storage.local.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});


async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


chrome.tabs.onUpdated.addListener(
    () => {
      console.log("test")
    }
)

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  console.log(request);
}