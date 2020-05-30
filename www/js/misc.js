
function handleEnter(elm) {
    switch (elm.id) {
        case "vid_search": { getVideos(elm.value); break; }
        case "chl_search": { getChannels(elm.value); break; }
    }
}

function load() {
    $("load").style.display = "block";
    setTimeout(function () { $("load").style.opacity = 1; }, 10);
}

function unload() {
    $("load").style.opacity = 0;
    setTimeout(function () { $("load").style.display = "none"; }, 1000);
}

function $(id) { return document.getElementById(id); }

