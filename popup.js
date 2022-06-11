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
      
      //send to removeAD.js to be activated (this seems wrong)
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
}