async function chlSearch(ev, elm) {

    if (ev.keyCode == 13) {

        var arr = await getChannels(elm.value);
        $("chl_results").innerHTML = "";
        var to = 100;


        arr.forEach(v => {
            var click_fxn = function (elm) {
                elm.style.background = "green";
                elm.style.color = "white";
                channels.push(v);
                window.localStorage.setItem("channels", JSON.stringify(channels));
                populateChannels();


            };

            displayChannel($("chl_results"), v, to, click_fxn);
            to += 50;
        });

        return;
    }

}

async function loadMoreVideos() {
    var videos = await getVideos();
    var elm = $("vid_results");

    var to = 100;

    var click_fxn = function (elm) {
        openVideo(elm.obj);
    };

    videos.forEach(
        v => {
            displayVideoCard(elm, v, to, click_fxn);
            to += 50;
        }
    );

    var loadBtn = document.createElement("div");
    loadBtn.setAttribute("class", "add_chl_btn");
    loadBtn.onclick = () => {
        loadBtn.style.height = "0%";
        loadMoreVideos();
    };
    loadBtn.innerHTML = "<span>Load More Videos</span>";

    elm.appendChild(loadBtn);
    setTimeout(() => { loadBtn.style.transform = "scale(1,1)"; }, to);

}

async function searchVideo(elm, ev) {

    if (ev.keyCode != 13) { return; }

    var q = elm.value;

    var videos = await getVideos(q);
    var elm = $("vid_results");

    var to = 100;
    elm.innerHTML = "";

    var click_fxn = function (elm) {
        openVideo(elm.obj);
    };

    videos.forEach(
        v => {
            displayVideoCard(elm, v, to, click_fxn);
            to += 50;
        }
    );

    var loadBtn = document.createElement("div");
    loadBtn.setAttribute("class", "add_chl_btn");
    loadBtn.onclick = () => {
        loadBtn.style.height = "0%";
        loadMoreVideos();
    };
    loadBtn.innerHTML = "<span>Load More Videos</span>";

    elm.appendChild(loadBtn);
    setTimeout(() => { loadBtn.style.transform = "scale(1,1)"; }, to);

}

function openVideo(obj) {

    openActivity("vid");

    $("v_iframe").src = "https://www.youtube.com/embed/" + obj.id;
    $("v_desc").innerHTML = obj.desc;

}
function setPass() {
    if ($("pass1").value != $("pass2").value) {
        return alert("Password and Confirm password do not macthes");
    }
    $("set_pass_popup").style.transform = "translateY(-300%)";
    window.localStorage.setItem("pass", $("pass1").value);
    init();
}

function chgPass() {
    $("ent_pass_popup").style.transform = "translateY(-300%)";
    showPopup("chg");
}

function chgKey() {
    navigator.notification.prompt("Enter the API key", (res) => {
        key = res.input1;
        window.localStorage.setItem("key", key);
        $("ent_pass_popup").style.transform = "translateY(-300%)";
    });
    
}

function entPass() {
    var pass = $("pass").value;
    if (pass == window.localStorage.getItem("pass")) {
        openActivity("add_chl");
        $("ent_pass_popup").style.transform = "translateY(-300%)";
    }
    else {
        alert("Wrong Password");
    }
}
