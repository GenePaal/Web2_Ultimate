var nowImgIndex = 0;
var imgs = document.getElementsByClassName("banner");
var nextImgBtn = document.getElementById("next");
var previousImgBtn = document.getElementById("previous");
var bannerBg = document.getElementById("bannerBg")
function nextImg() {
    var nextImgIndex = (nowImgIndex + 1) % imgs.length
    imgs[nowImgIndex].style.display = "none";
    imgs[nextImgIndex].style.display = "";
    nowImgIndex = nextImgIndex;
}
var bannerResult = setInterval(function () {
    nextImg();
}, 1500);
bannerBg.onmousemove = function () {
    clearInterval(bannerResult);
}
bannerBg.onmouseout = function () {
    bannerResult = setInterval(function () {
        nextImg();
    }, 2000);
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

