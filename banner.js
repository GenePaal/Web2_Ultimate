// banner.js
var nowImgIndex = 0;
var imgs = document.getElementsByClassName("banner");
var nextImgBtn = document.getElementById("next");
var previousImgBtn = document.getElementById("previous");
var bannerBox = document.getElementById("bannerBox")
var bannerBtn = document.getElementsByClassName("bannerBtn");
function nextImg() {
    var nextImgIndex = (nowImgIndex + 1) % imgs.length
    imgs[nowImgIndex].style.display = "none";
    imgs[nextImgIndex].style.display = "";
    nowImgIndex = nextImgIndex;
}
var bannerResult = setInterval(function () {
    nextImg();
}, 1500);


bannerBox.onmousemove = function () {
    clearInterval(bannerResult);
}
bannerBox.onmouseout = function () {
    bannerResult = setInterval(function () {
        nextImg();
    }, 2000);
}

for (var i = 0; i < bannerBtn.length; i++) {
    bannerBtn[i].onmousemove = function () {
        this.style.cursor = "pointer";
        clearInterval(bannerResult);
    }
    bannerBtn[i].onmouseout = function () {
        bannerResult = setInterval(function () {
            nextImg();
        }, 2000);
    }
}
nextImgBtn.onclick = function () {
    nextImg();
};
previousImgBtn.onclick = function () {
    var previousImgIndex = (nowImgIndex - 1 + imgs.length) % imgs.length;
    imgs[nowImgIndex].style.display = "none";
    imgs[previousImgIndex].style.display = "";
    nowImgIndex = previousImgIndex;
}

