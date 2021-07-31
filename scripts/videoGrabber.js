function getRandomChannelVideo() {
    document.getElementById('yt-video').innerHTML = "";

    let channelUrl = document.getElementById("link").value;
    if (channelUrl === '') {
        getRandomVideo();
        return false;
    }
    let regExp = /^(?:(http|https):\/\/[a-zA-Z-]*\.{0,1}[a-zA-Z-]{3,}\.[a-z]{2,})\/channel\/([\w\/\-]+)$/;
    let match = channelUrl.match(regExp);
    let link = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${match[2]}&maxResults=100&order=date&type=video&key=APIKEY`;
    fetch(link)
        .then(response => response.json())
        .then(data => {
            let videoCount = data.items.length;
            if (videoCount === 0) {
                document.getElementById('status').innerHTML = `<div class="alert alert-danger" role="alert">An error occured. Did you enter a valid Youtube channel (with videos)?</div>`;
                return false;
            }
            let randomVideo = Math.floor(Math.random() * (videoCount - 0));
            let randomVideoId = data.items[randomVideo].id.videoId;
            document.getElementById('yt-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${randomVideoId}" width="480" height="270" frameborder="0" allowfullscreen></iframe>`;
            document.getElementById('status').innerHTML = `<div class="alert alert-success" role="alert">Success! A random YouTube video has been selected.</div>`;
        })
        .catch(error => {
            console.error('An error occured when during the fetch: ', error);
        });
    return false;
}

function getRandomVideo() {
    let rwLink = `http://random-word-api.herokuapp.com/word?number=1&swear=0`;
    fetch(rwLink)
        .then(response => response.json())
        .then(data => {
            let randomWord = data[0];
            return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${randomWord}&key=APIKEY`);
        })
        .then(response => response.json())
        .then(data => {
            let videoCount = data.items.length;
            if (videoCount === 0) {
                document.getElementById('status').innerHTML = `<div class="alert alert-danger" role="alert">An error occured. Please try again.</div>`;
                return false;
            }
            let randomVideo = Math.floor(Math.random() * (videoCount - 0));
            let randomVideoId = data.items[randomVideo].id.videoId;
            document.getElementById('yt-video').innerHTML = `<iframe src="https://www.youtube.com/embed/${randomVideoId}" width="480" height="270" frameborder="0" allowfullscreen></iframe>`;
            document.getElementById('status').innerHTML = `<div class="alert alert-success" role="alert">Success! A random YouTube video has been selected.</div>`;
        })
        .catch(error => {
            console.error('An error occured when during the fetch: ', error);
        });
    return false;
}