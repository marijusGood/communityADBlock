var buttonPressed = true;
var eParent = [];
var selected = null;

window.addEventListener('click', function (e) {
    if(!buttonPressed) {
        //TODO: this does not block onClick
        // prevent links or buttons working https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        e.preventDefault();
        event.stopImmediatePropagation();

        eParent = getParents(e.target);
        
        loadSlider();

        //add slider range
        var slider = document.getElementById("parentRange");
        var elementDisplay = this.document.getElementById("parentValue");
        slider.max = String(eParent.length-1);

        //add event listeners
        document.getElementById("deleteAd").addEventListener("click", deleteAd);
        document.getElementById("cancelAd").addEventListener("click", removeSlider);
        selected = eParent[0];
        
        elementDisplay.innerHTML = eParent[0].nodeName + " ID: " + eParent[0].id + " Class: " + eParent[0].className;

        slider.oninput = function() {
            elementDisplay.innerHTML = eParent[this.value].nodeName + " ID: " + eParent[this.value].id + " Class: " + eParent[this.value].className;
            clearMasks();
            selected = eParent[this.value];
            createMask(eParent[this.value])
        }
  
        buttonPressed = true;
    }

    return false;
});

// activated on mouseover
window.addEventListener('mouseover',function(e) {
    if(!buttonPressed) {
        createMask(e.target);
    }
});

// activated on mouseout
window.addEventListener('mouseout', function(e) {
    if(!buttonPressed) {
        clearMasks();
    }
});

// creating the blue stuff
//target is the element to display blue stuff over
function createMask(target) {
    //add this to the dive itself because when you move the page the outline does not
    var rect = target.getBoundingClientRect();
    var hObj = document.createElement("div");
    hObj.className = 'highlight-wrap';
    hObj.style.top=rect.top+"px";
    hObj.style.width=target.clientWidth+"px";
    hObj.style.height=target.clientHeight+"px";
    hObj.style.left=rect.left+"px";
    document.body.appendChild(hObj);
}

//highlight-wrap is the blue selective stuff over everything
//clear the blue selective stuff
function clearMasks() {
    var hwrappersLength = document.getElementsByClassName("highlight-wrap").length;
    var hwrappers = document.getElementsByClassName("highlight-wrap");
    if(hwrappersLength > 0) {
        for(var i=0; i<hwrappersLength; i++) {
            hwrappers[i].remove();
        }
    }
}

//load slider into the page
async function loadSlider() {
    var sliderHTML = '<input type="range" min="0" max="2" value="0" class="sliderRemoveAD" id="parentRange"><p>Element: <span id="parentValue"></span></p><button id="deleteAd"> Delete ADs</button><button id="cancelAd"> cancel </button>';
    var div = document.createElement('div');
    div.setAttribute('class', 'slidecontainerRemoveAdd');
    div.innerHTML = sliderHTML;

    document.body.appendChild(div);
}

//get all parents of the element
function getParents(elem) {
    var parents = [];
    //get all parents elements of the clicked elements till you hit body laments(head, body and so on)
    while(elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
      elem = elem.parentNode;
      parents.push(elem);
    }

    if (parents.length == 0) {
        parents = [e.target];
    }

    return parents;
}


// when delete Ad is pressed it will hide the ad which is selected and will 
function deleteAd(){
    //remove slider
    removeSlider();

    let message = {
        nodeName: selected.nodeName,
        ID: selected.id,
        Class: selected.className
    }
    
    //send message to background?
    chrome.runtime.sendMessage(message);

    console.log(selected.outerHTML);
    console.log(selected.parents);
    console.log(selected.classList);
    console.log(selected.parentNode);

    var hwrappers = document.getElementsByClassName("Box");

    console.log(hwrappers);
    //selected.classList.add("hidden-element");

    selected.remove();
    selected = null;
}

//remove slider
function removeSlider() {
    var hwrappers = document.getElementsByClassName("slidecontainerRemoveAdd");
    hwrappers[0].remove();
    clearMasks();
}

// if the message from popup.js contains blockAD, activate remvoeAD.js
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
    sendResponse({status: 'ok'});
    if(request.message === "blockAD") {
        buttonPressed = false;
    }
}