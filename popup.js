document.getElementById("deleteAd").addEventListener("click", myFunction);

function myFunction() {
    let params = {
      active: true,
      currentWindow: true
    }
    chrome.tabs.query(params, (tabs) => {
      let message = {
        message: "blockAD"
      }
  
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
}