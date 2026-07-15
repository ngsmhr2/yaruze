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
    runa: {
        workImages: [
            "images/runa1.png",
            "images/runa2.png"
        ],
        resultImage:
            "images/runa3.png",

        comments: {
            short: "「お疲れ様でしたっ！次もあたしと一緒に頑張りましょう！」",
            middle: "「と〜〜っても立派です！花丸、あげちゃいます！」",
            long: "「こんなに頑張ったあなたは、本当に素敵ですっ！今日は自分をいっぱい褒めてあげてくださいね！」"
        }

    },

    dog: {
        workImages: [
            "images/dog1.png",
            "images/dog2.png"
        ],
        resultImage:
            "images/dog3.png",

        comments: {
            short: "おつかれワン！",
            middle: "いっぱい頑張ったワン！",
            long: "最高の頑張りだったワン！！"
        }

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

        /*画像の1枚目を表示*/
        workImage.src =
            characters[selectedCharacter]
                .workImages[0];
    });
}



// --------------------
// タイマー開始
// --------------------

/*作業開始ボタンがクリックされたら*/
startBtn.addEventListener("click", () => {

    /*作業開始のボタンを消す
    cssにnoneを追加して消してる*/
    startBtn.style.display = "none";

    /*作業完了ボタンを表示する*/
    finishBtn.style.display = "inline-block";

    /*今の時刻を記録する*/
    startTime = Date.now();
    /*セットインターバル→一定間隔ごとに繰り返す*/
    timerId = setInterval(() => {

        /*今の時間と開始時間を引き算して、1000で割ってる
        それをMath.floorで小数点以下を切り捨てて、経過時間として表示してる*/
        elapsedSeconds =
            Math.floor(
                (Date.now() - startTime) / 1000
            );

        /*下で作ってる関数*/
        updateTimer();

    }, 1000);

    /*1秒ごとに画像を切り替える
    setInterval→〇秒ごとにこの処理を繰り返してくれ*/
    imageTimer = setInterval(() => {

        /*imageIndexは上でつくった、今どっちの画像を表示してるか覚えてる変数。
        三項演算子。条件が正しければA、違えばB
        imageIndexは0ですか？って聞いてる*/
        imageIndex =
            imageIndex === 0 ? 1 : 0;

        /*画像変更*/
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

/*クリックされたら*/
finishBtn.addEventListener("click", () => {

    /*clear→消す、止める。interval→インターバル、一定時間ごとの処理
    これでタイマーと画像切り替えをそれぞれ止めてる*/
    clearInterval(timerId);
    clearInterval(imageTimer);

    /*前もやってた画面切り替え*/
    page2.classList.add("hidden");
    page3.classList.remove("hidden");

    /*HTMLのとこにテキストコメントで書いてる*/
    resultTime.textContent =
        `今回は ${timer.textContent} 作業をしました！`;

    /*結果画像の表示
    上でやってたことがリザルトイメージに変わっただけ*/
    resultImage.src =
        characters[selectedCharacter]
            .resultImage;


    /*もしelapsedSecondsが3600より小さいなら*/
    if (elapsedSeconds < 3600) {
        /*いつもの。テキストコメント。セレクトキャラクター*/
        comment.textContent =
            characters[selectedCharacter].comments.short;

    } else if (elapsedSeconds < 10800) {

        comment.textContent =
            characters[selectedCharacter].comments.middle;

    } else {

        comment.textContent =
            characters[selectedCharacter].comments.long;

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

    /*念のためタイマーと画像切り替えをもう一度止めてる*/
    clearInterval(timerId);
    clearInterval(imageTimer);

    /*タイマーと画像表示をリセット*/
    elapsedSeconds = 0;
    imageIndex = 0;

    /*タイマー表示を書き換えリセット*/
    timer.textContent = "00:00:00";

    /*作業開始のボタンを復活する*/
    startBtn.style.display = "inline-block";

    /*作業完了のボタンを消す*/
    finishBtn.style.display = "none";

    /*1ページ目に戻す*/
    page3.classList.add("hidden");
    page1.classList.remove("hidden");
});