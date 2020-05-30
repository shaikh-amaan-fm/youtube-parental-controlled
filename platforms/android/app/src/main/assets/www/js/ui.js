function openActivity(activityName) {
    var val = 0;
    switch (activityName) {
        case "add_chl": val = 0; break;
        case "chl": val = -25; break;
        case "vid_res": val = -50; break;
        case "vid": val = -75; break;
    }
    currActivity = activityName;
    $("activity_cnt").style.transform = "translateX(" + val + "%)";

}

function back() {

    switch (currActivity) {
        case "add_chl": return openActivity("chl");
        case "chl": { 
                if (navigator.app) {
                    navigator.app.exitApp();
                } 
                else if (navigator.device) {
                    navigator.device.exitApp();
                } else {
                    window.close();
                } 
                return; 
        }
        case "vid_res": return openActivity("chl");
        case "vid": return openActivity("vid_res");
    }
    alert("back");
}

function setWindowOrientation(){
    var portrait = true;
    setInterval(
        function(){
            if(window.innerHeight<window.innerWidth){
                if(!portrait) { return; }
                portrait = false;
                document.body.style.width = "30%";
                document.body.style.margin = "auto 35%";
            }
            else {
                portrait = true;
                document.body.style.width = "100%";
                document.body.style.margin = "0%";
            }
        },
        500
    );
}

function showPopup(name) {

    if (name == "ent") {
        $("ent_pass_popup").style.transform = "translateY(0%)";
        return;
    }

    $("set_pass_popup").style.transform = "translateY(0%)";
    if (name == "set") { $("set_pass_label").innerHTML = "Change Password"; }

}

function displayChannel(elm, obj, to, click_fxn) {

    var card = document.createElement("div");
    card.setAttribute("class", "chl_card");

    card.obj = obj;

    var logo = document.createElement("img");
    logo.src = obj.logo;
    card.appendChild(logo);

    var title = document.createElement("span");
    title.innerHTML = obj.title;
    card.appendChild(title);

    card.onclick = () => {
        click_fxn(card);
    };

    elm.appendChild(card);

    setTimeout(() => {
        card.style.transform = "scale(1,1)";
    }, to);

}

function displayVideoCard(elm, obj, to, click_fxn) {

    var card = document.createElement("div");
    card.setAttribute("class", "vid_card");

    card.obj = obj;

    var logo = document.createElement("img");
    logo.src = obj.thumbnail;
    card.appendChild(logo);

    var title = document.createElement("span");
    title.setAttribute("id", "title");
    title.innerHTML = obj.title;
    card.appendChild(title);

    var date = document.createElement("span");
    date.setAttribute("id", "date");

    date.innerHTML = obj.publishTime;
    card.appendChild(date);

    card.onclick = () => {
        click_fxn(card);
    };

    elm.appendChild(card);

    setTimeout(() => {
        card.style.transform = "scale(1,1)";
    }, to);

}

function populateChannels() {
    channels = window.localStorage.getItem("channels");
    var elm = $("chl_screen")
    channels = channels ? JSON.parse(channels) : [];
    var to = 100;
    elm.innerHTML = "";

    var click_fxn = function (elm) {
        currChnl = elm.obj.id;
        nextPg = "";

        openActivity("vid_res");
        populateVideoCards();
    };

    var cart = $("chl_cart");
    cart.innerHTML = "";
    channels.forEach(
        v => {
            var cart_card = document.createElement("div");
            cart_card.setAttribute("class", "add_chl_cart_card");

            cart_card.innerHTML = "<span>" + v.title + "</span>";

            var cls = document.createElement("button");
            cls.setAttribute("class", "rem");
            cls.innerHTML = "x";

            cls.onclick = function () {

                navigator.notification.confirm("Do you want to remove " + v.title + " ?", (res) => {
                    var f = res == 1 ? true : false;
                    if (f) {
                        cart_card.style.display = "none";
                        channels = channels.filter(j => {
                            if (v.title != j.title) {
                                return true;
                            }
                            return false;
                        });
                        window.localStorage.setItem("channels", JSON.stringify(channels));
                        populateChannels();
                    }
                },null,'Yes, No');

            };

            cart_card.appendChild(cls);
            cart.appendChild(cart_card);

            displayChannel(elm, v, to, click_fxn);
            to += 50;
        }
    );

    var addBtn = document.createElement("div");
    addBtn.setAttribute("class", "add_chl_btn");
    addBtn.onclick = () => {
        showPopup("ent");
    };
    addBtn.innerHTML = "<span>Edit Channel list</span>";

    elm.appendChild(addBtn);
    setTimeout(() => { addBtn.style.transform = "scale(1,1)"; }, to);

}

async function populateVideoCards() {
    var videos = await getVideos();
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

    if (videos.length < 30) {
        return;
    }

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

