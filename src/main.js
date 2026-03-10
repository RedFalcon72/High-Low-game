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
}

function showCard(cardElement, card) {
  cardElement.src = card.imagePath;
  cardElement.alt = `${card.suit} ${card.rankLabel}`;
}

function resetRound() {
  currentCard = getRandomCard();
  showCard(beforeCardImg, currentCard);
  afterCardImg.src = "/images/card_back.png";
  afterCardImg.alt = "Hidden card";
  message.textContent = "High or Low?";
}

function judgeRound(playerChoice) {
  const nextCard = getRandomCard();
  showCard(afterCardImg, nextCard);

  if (nextCard.value === currentCard.value) {
    message.textContent = "同じ数字! 引き分け";
  } else {
    const isCorrect =
      (playerChoice === "high" && nextCard.value > currentCard.value) ||
      (playerChoice === "low" && nextCard.value < currentCard.value);

    if (isCorrect) {
      score += 1;
      scoreElement.textContent = String(score);
      message.textContent = "正解!";
    } else {
      score = 0;
      scoreElement.textContent = "0";
      message.textContent = "不正解... スコアをリセット";
    }
  }

  currentCard = nextCard;
}

highButton.addEventListener("click", () => {
  judgeRound("high");
});

lowButton.addEventListener("click", () => {
  judgeRound("low");
});

resetRound();
