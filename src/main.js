const beforeCardImg = document.getElementById("before-card");
const afterCardImg = document.getElementById("after-card");
const highButton = document.getElementById("high-btn");
const lowButton = document.getElementById("low-btn");
const message = document.getElementById("message");
const scoreElement = document.getElementById("score");

const suits = ["spades", "hearts", "diamonds", "clubs"];
const ranks = [
  { label: "A", value: 14 },
  { label: "02", value: 2 },
  { label: "03", value: 3 },
  { label: "04", value: 4 },
  { label: "05", value: 5 },
  { label: "06", value: 6 },
  { label: "07", value: 7 },
  { label: "08", value: 8 },
  { label: "09", value: 9 },
  { label: "10", value: 10 },
  { label: "J", value: 11 },
  { label: "Q", value: 12 },
  { label: "K", value: 13 },
];

let currentCard = null;
let score = 0;

function getRandomCard() {
  const suit = suits[Math.floor(Math.random() * suits.length)];
  const rank = ranks[Math.floor(Math.random() * ranks.length)];

  return {
    suit,
    rankLabel: rank.label,
    value: rank.value,
    imagePath: `/images/card_${suit}_${rank.label}.png`,
  };
} //ランダムなカードを生成する関数

function showCard(cardElement, card) {
  cardElement.src = card.imagePath;
  cardElement.alt = `${card.suit} ${card.rankLabel}`;
} //カードの画像を表示する関数

function resetRound() {
  currentCard = getRandomCard();
  showCard(beforeCardImg, currentCard);
  afterCardImg.src = "/images/card_back.png";
  afterCardImg.alt = "Hidden card";
  message.textContent = "High or Low?";
} //新しいラウンドを開始する関数

function judgeRound(playerChoice) {
  let nextCard;
  //ボタンを無効にして、プレイヤーが複数回クリックできないようにする
  highButton.disabled = true;
  lowButton.disabled = true;

  while (true) {
    nextCard = getRandomCard(); //次のカードを生成
    if (
      nextCard.value !== currentCard.value ||
      nextCard.suit !== currentCard.suit
    ) {
      break;
    }
  } //最初のカードと同じカードが出ないようにする

  showCard(afterCardImg, nextCard);

  //プレイヤーの選択と次のカードを比較して勝敗を判定
  if (nextCard.value === currentCard.value) {
    message.textContent = "draw";
  } else {
    const isCorrect =
      (playerChoice === "high" && nextCard.value > currentCard.value) ||
      (playerChoice === "low" && nextCard.value < currentCard.value);
    if (isCorrect) {
      score++;
      scoreElement.textContent = score;
      message.textContent = "win";
    } else {
      score = 0;
      scoreElement.textContent = 0;
      message.textContent = "lose";
    }
  }

  setTimeout(() => {
    resetRound();
    highButton.disabled = false;
    lowButton.disabled = false;
  }, 2000); //2秒後に次のラウンドを開始し、ボタンを有効にする
}

resetRound(); //最初のラウンドを開始

highButton.addEventListener("click", () => {
  judgeRound("high");
});

lowButton.addEventListener("click", () => {
  judgeRound("low");
});
