

var channels = [], currChnl, currActivity, nextPg, key;


function init() {

    key = window.localStorage.getItem("key");
    if (!key || key=="null" || key=="undefined" ) { 
        chgKey();
        alert("You'll need to get an API key to use this app. Anyone can get an API key instantly for free from Google. Just check on Google on how to get one.");
    }

    var pass = window.localStorage.getItem("pass");
    if (!pass) {
        return showPopup();
    }

    populateChannels();
    openActivity("chl");

    document.body.style.height = window.innerHeight+"px";
}

window.onload = function () {
    setWindowOrientation();
    init();
};

window.onerror = e=>{ alert(e); };

document.addEventListener("deviceready", function() {
    document.addEventListener("backbutton", (e) => {
        e.preventDefault();
        back(e);
    });
});