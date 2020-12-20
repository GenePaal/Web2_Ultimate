// gameAndLottery.js
var begin = document.getElementById("begin");
var beginBtn = document.getElementById("beginBtn");
var td = document.getElementById("game").getElementsByTagName("td");
var li = document.getElementsByTagName("li");
var span = document.getElementsByTagName("span");
var carrotList = document.getElementById("carrotList");
var scoretxt = document.getElementById("score");
var gameResult;
var carrotCounts = 5;
var score = 0;
var lotteryCounts = 0;
for (var i = 0; i < td.length; i++) {
    td[i].onclick = function () {
        // 如果有class  说明还在可以被敲击的阶段
        if (this.hasAttribute("class")) {
            this.removeAttribute("class");
            score += 5;
            scoretxt.innerHTML = "当前得分：" + score;
            this.firstElementChild.innerHTML = "";
        }
    }
}
// 接收到一个下标是 td数组中被选中产生老鼠的下标
function startCountDown(index) {
    span[index].innerHTML = "3";
    var time = 3;
    var gameResult2 = setInterval(function () {
        time--;
        if (span[index].innerHTML == "") {
            clearInterval(gameResult2);
        }
        else if (time == 0) {
            // 老鼠逃脱
            // 删去老鼠
            // 萝卜-1
            td[index].removeAttribute("class");
            span[index].innerHTML = "";
            if (li[0].innerHTML != "") {
                li[carrotCounts - 1].innerHTML = "";
                carrotCounts--;
            }
            if (li[0].innerHTML == "") {
                clearInterval(gameResult);
                clearInterval(gameResult2);
                var game = document.getElementById("game");
                game.style.display = "none";
                var gameOver = document.getElementById("gameOver");
                gameOver.style.display = "";
                document.getElementById("finalScore").innerHTML = "最终得分：" + score;
                lotteryCounts = parseInt(score / 50);
                document.getElementById("lotteryCounts").innerHTML = "抽奖次数：" + lotteryCounts;
                if (parseInt(score / 50) == 0) {
                    document.getElementById("tip").innerHTML = "很遗憾您没有抽奖机会";
                } else {
                    document.getElementById("tip").innerHTML = "请前往抽奖区抽奖";
                }
            }
            clearInterval(gameResult2);
        } else {
            span[index].innerHTML = time;
        }
    }, 1000);
}
// 开始按钮一旦被点击
beginBtn.onclick = function () {
    begin.style.display = "none";
    gameResult = setInterval(function () {
        var randomNumber = parseInt(Math.random() * 16);
        // 如果没有class属性给它加上，有就不必了
        if (!td[randomNumber].hasAttribute("class")) {
            td[randomNumber].setAttribute("class", "mouse");
            startCountDown(randomNumber);
        }
    }, 200);
}

var clickToGetLotteryCountsBtn = document.getElementById("clickToGetLotteryCounts");
var clickToLotteryBtn = document.getElementById("clickToLottery");
var td2 = document.getElementById("lotteryBg").getElementsByTagName("td");
for (var i = 0; i < td2.length; i++) {
    td2[i].style.width = "100px";
    td2[i].style.height = "100px";
    td2[i].style.textAlign = "center";
    if ((td2[i].innerHTML == "") && (i % 3 == 0)) {
        td2[i].innerHTML = "积分100";
    } else if ((td2[i].innerHTML == "") && (i % 3 == 1)) {
        td2[i].innerHTML = "积分200";
    } else if ((td2[i].innerHTML == "") && (i % 3 == 2)) {
        td2[i].innerHTML = "积分300";
    }
}
// 点击获取次数
clickToGetLotteryCountsBtn.onclick = function () {
    alert("当前抽奖次数为 " + lotteryCounts);
}

// 抽奖按钮一旦点击, 就开始抽奖
var isLottering = false;
var preIndex = 0;
clickToLotteryBtn.onclick = function () {
    if (isLottering) {
        alert("正在抽奖");
    } else {
        isLottering = true;
        td2[preIndex].style.backgroundColor = "";
        if (lotteryCounts <= 0) {
            alert("无抽奖次数");
        } else { // 抽奖
            lotteryCounts--;
            // 抽奖的结果
            // 500毫秒 换一个，5秒的时候，结束
            var sumTime = 0;
            var randomIndex = 0;
            var lotteryResult = setInterval(function () {
                if (parseInt(sumTime) == 5) {
                    if (td2[randomIndex].innerHTML.indexOf("积分") == -1) {  // 获得键盘加上豪华
                        alert("恭喜获得 " + td2[randomIndex].innerHTML + " 豪华键盘!");
                    } else { // 获得积分
                        alert("恭喜获得 " + td2[randomIndex].innerHTML + " !");
                    }
                    isLottering = false;
                    clearInterval(lotteryResult);
                } else {
                    sumTime += 200 / 1000;
                    // 如果等于5  停止运行
                    td2[preIndex].style.backgroundColor = "";
                    // 随机的序列  产生0 - 15 的数
                    randomIndex = parseInt(Math.random() * 16);
                    preIndex = randomIndex;
                    td2[randomIndex].style.backgroundColor = "#CCC";
                }
            }, 100);
        }
    }

}