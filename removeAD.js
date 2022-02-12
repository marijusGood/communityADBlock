var buttonPressed = true;
var eParent = [];
var selected = null;

window.addEventListener('click', function (e) {
    if(!buttonPressed) {
        //TODO: this does not block onClick
        e.preventDefault();

        

        eParent = getParents(e.target);
        if (eParent.length == 0) {
            eParent = [e.target];
        }
        loadSlider();

        var slider = document.getElementById("parentRange");
        var elementDisplay = this.document.getElementById("parentValue");
        slider.max = String(eParent.length-1);
        document.getElementById("deleteAd").addEventListener("click", deleteAd);
        document.getElementById("cancelAd").addEventListener("click", cancelSlider);
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

window.addEventListener('mouseover',function(e) {
    if(!buttonPressed) {
        createMask(e.target);
    }
});

window.addEventListener('mouseout', function(e) {
    if(!buttonPressed) {
        clearMasks();
    }
});

function createMask(target) {
    //add this to the dive itself because when you move the page the outline does not
    var rect = target.getBoundingClientRect();
    var hObj = document.createElement("div");
    hObj.className = 'highlight-wrap';
    hObj.style.top=rect.top+"px";
    hObj.style.width=target.clientWidth+"px";
    hObj.style.height=target.clientHeight+"px";
    hObj.style.left=rect.left+"px";
    //hObj.style.WebkitTransition='top 0.2s';
    document.body.appendChild(hObj);
}

function clearMasks() {
    var hwrappersLength = document.getElementsByClassName("highlight-wrap").length;
    var hwrappers = document.getElementsByClassName("highlight-wrap");
    if(hwrappersLength > 0) {
        for(var i=0; i<hwrappersLength; i++) {
            hwrappers[i].remove();
        }
    }
}

 async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function loadSlider() {
    // var sliderElement = document.createElement("slider");
    // document.body.appendChild(sliderElement);

    var sliderHTML = '<input type="range" min="0" max="2" value="0" class="sliderRemoveAD" id="parentRange"><p>Element: <span id="parentValue"></span></p><button id="deleteAd"> Delete ADs</button><button id="cancelAd"> cancel </button>';
    var div = document.createElement('div');
    div.setAttribute('class', 'slidecontainerRemoveAdd');
    div.innerHTML = sliderHTML;

   
    document.body.appendChild(div);

    //sliderElement.innerHTML = await fetchHtmlAsText("slider.html");
}

function getParents(elem) {
    var parents = [];
    while(elem.parentNode && elem.parentNode.nodeName.toLowerCase() != 'body') {
      elem = elem.parentNode;
      parents.push(elem);
    }
    return parents;
}



function deleteAd(){
    selected.remove();
    var hwrappers = document.getElementsByClassName("slidecontainerRemoveAdd");
    hwrappers[0].remove();
    clearMasks();
    let message = {
        nodeName: selected.nodeName,
        ID: selected.id,
        Class: selected.className
    }
    
    chrome.runtime.sendMessage(message);
    selected = null;
}

function cancelSlider() {
    var hwrappers = document.getElementsByClassName("slidecontainerRemoveAdd");
    hwrappers[0].remove();
    clearMasks();
    
    selected = null;
}

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
    if(request.message === "blockAD") {
        buttonPressed = false;
    }
}