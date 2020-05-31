function request(url) {
    load();
    return new Promise(
        function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    resolve(JSON.parse(xhr.responseText));
                    unload();
                }
                if(xhr.status != 200 && xhr.readyState == 4) {
                    reject(xhr.responseText);
                    unload();
                }
            };

            xhr.onerror = function () {
                alert("Check your Internet Connection");
                reject();
                unload();
            };

            xhr.open("GET", url);
            xhr.send();

        }
    );
}



async function search(type, query, channelId, pageToken, max) {


    var url = "https://www.googleapis.com/youtube/v3/search";
    prevQuery = query;
    url += "?part=snippet";
    url += "&type=" + type;
    url += "&q=" + query;
    if (type == "video") { url += "&order=date"; }
    url += "&maxResults=" + (max ? max : 30);
    if (channelId) {
        url += "&channelId=" + channelId;
    }
    if (pageToken) {
        url += "&pageToken=" + pageToken;
    }

    url += "&key=" + key;

    var res = await request(url);
    try {
        return JSON.parse(res);
    }
    catch (e) {
        return res;
    }

}


function getVideo(obj) {
    var id = obj.id.videoId;
    var title = obj.snippet.title;
    var thumbnail = obj.snippet.thumbnails.medium.url;
    var desc = obj.snippet.description;
    var d = new Date(obj.snippet.publishTime);
    var publishTime = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ", " + ("0" + d.getDate()).slice(-2) + "-" + ("0" + d.getMonth()).slice(-2) + "-" + ("0" + d.getFullYear()).slice(-2);

    return { id: id, title, title, thumbnail: thumbnail, publishTime: publishTime, desc: desc };


}

async function getVideos(q) {

    var arr = []
    q = q ? q : "";

    channelId = currChnl;

    if (!channelId) { throw "channel not defined" }

    var res = await search("video", q, channelId, nextPg);

    nextPg = res.nextPageToken;

    if (res.pageInfo && res.pageInfo.totalResults > 0) {

        for (var i in res.items) {
            var obj = getVideo(res.items[i]);
            arr.push(obj);
        }
        return arr;
    }

    return [];

}

function getChannel(obj) {

    var snip = obj.snippet;

    var id = snip.channelId;
    var title = snip.channelTitle;
    var desc = snip.description;
    var thumbnail = snip.thumbnails.default.url;

    return { id: id, title: title, logo: thumbnail, desc: desc };

}
async function getChannels(q, max) {
    //console.log(q,max);
    var arr = [];
    var res = await search("channel", q, null, null, max ? max : null);

    for (var i in res.items) {
        var obj = getChannel(res.items[i]);
        arr.push(obj);
    }

    return arr;
}
