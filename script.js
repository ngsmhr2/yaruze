/*HTMLをページごとに取得*/
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");

/*2ページ目
タイマー部分の取得*/
const timer = document.querySelector("#timer");

/*作業開始、作業終了のボタン取得*/
const startBtn = document.querySelector("#startBtn");
const finishBtn = document.querySelector("#finishBtn");

/*応援画像の取得*/
const workImage = document.querySelector("#workImage");

/*3ページ目
作業時間表示　部分の取得*/
const resultTime = document.querySelector("#resultTime");
/*ご褒美画像　部分の取得*/
const resultImage = document.querySelector("#resultImage");
/*ご褒美コメント　部分の取得*/
const comment = document.querySelector("#comment");

/*Twitterシェアボタン　の取得*/
const shareBtn = document.querySelector("#shareBtn");
/*リスタートボタン　の取得*/
const restartBtn = document.querySelector("#restartBtn");


/*.character-btnってclassがついたHTML要素をすべて取得*/
const characterButtons =
    document.querySelectorAll(".character-btn");


/*どのキャラを選んだか*/
let selectedCharacter = "";

/*作業開始した時間を入れる*/
let startTime;
/*止めるやつの基礎*/
let timerId;

/*経過時間*/
let elapsedSeconds = 0;

/*画像切り替え。どっちの画像を表示してるか覚える*/
let imageIndex = 0;
let imageTimer;


/*キャラクターの設定*/
const characters = {
    cat: {
        workImages: [
            "images/cat1.png",
            "images/cat2.png"
        ],
        resultImage:
            "images/cat3.png"
    },

    dog: {
        workImages: [
            "images/dog1.png",
            "images/dog2.png"
        ],
        resultImage:
            "images/dog3.png"
    }
};



// --------------------
// 1ページ目
// --------------------

/*ボタン達をひとつずつ取り出す*/
for (const button of characterButtons) {

    button.addEventListener("click", () => {

        /*どのキャラクターか取得*/
        selectedCharacter =
            button.dataset.character;

        /*ページ切り替え
        classListでpage1が持ってるclassの一覧を操作できる
        HTMLのpage1のclassにhiddenを追加する*/
        page1.classList.add("hidden");
        /*page2のhiddenを消す*/
        page2.classList.remove("hidden");

        /*画像表示*/
        workImage.src =
            characters[selectedCharacter]
                .workImages[0];
    });
}



// --------------------
// タイマー開始
// --------------------

startBtn.addEventListener("click", () => {

    /*作業開始のボタンを消す*/
    startBtn.style.display = "none";

    startTime = Date.now();

    timerId = setInterval(() => {

        elapsedSeconds =
            Math.floor(
                (Date.now() - startTime) / 1000
            );

        updateTimer();

    }, 1000);

    imageTimer = setInterval(() => {

        imageIndex =
            imageIndex === 0 ? 1 : 0;

        workImage.src =
            characters[selectedCharacter]
                .workImages[imageIndex];

    }, 1000);

});



// --------------------
// 時間表示
// --------------------

function updateTimer() {

    const hour =
        String(
            Math.floor(elapsedSeconds / 3600)
        ).padStart(2, "0");

    const minute =
        String(
            Math.floor(
                (elapsedSeconds % 3600) / 60
            )
        ).padStart(2, "0");

    const second =
        String(
            elapsedSeconds % 60
        ).padStart(2, "0");

    timer.textContent =
        `${hour}:${minute}:${second}`;
}



// --------------------
// 作業完了
// --------------------

finishBtn.addEventListener("click", () => {

    clearInterval(timerId);
    clearInterval(imageTimer);

    page2.classList.add("hidden");
    page3.classList.remove("hidden");

    resultTime.textContent =
        `今回は ${timer.textContent} 作業をしました！`;

    resultImage.src =
        characters[selectedCharacter]
            .resultImage;

    if (elapsedSeconds < 3600) {

        comment.textContent =
            "よく頑張りました！";

    } else if (elapsedSeconds < 10800) {

        comment.textContent =
            "集中して取り組めましたね！";

    } else {

        comment.textContent =
            "素晴らしい集中力です！！";
    }
});



// --------------------
// X共有
// --------------------

shareBtn.addEventListener("click", () => {

    const text =
        `電卓作業タイマーで ${timer.textContent} 作業しました！
        https://ngsmhr2.github.io/yaruze/`;

    const url =
        "https://twitter.com/intent/tweet?text="
        + encodeURIComponent(text);

    window.open(url);
});



// --------------------
// 最初に戻る
// --------------------

restartBtn.addEventListener("click", () => {

    clearInterval(timerId);
    clearInterval(imageTimer);

    elapsedSeconds = 0;
    imageIndex = 0;

    timer.textContent = "00:00:00";

    /*作業開始のボタンを復活する*/
    startBtn.style.display = "inline-block";

    page3.classList.add("hidden");
    page1.classList.remove("hidden");
});