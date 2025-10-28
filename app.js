const quizData = [
  {
    question: "나무는 낮에 이산화탄소를 배출한다. (O/X)",
    answer: "X",
    explanation: "낮에는 광합성을 통해 이산화탄소를 흡수하고 산소를 배출합니다."
  },
  {
    question: "산림은 지구의 탄소 저장고 역할을 한다. (O/X)",
    answer: "O",
    explanation: "산림은 대기 중 탄소를 흡수하여 기후변화 완화에 기여합니다."
  },
  {
    question: "모든 산불은 자연적으로 발생한다. (O/X)",
    answer: "X",
    explanation: "대부분의 산불은 인간의 부주의로 인해 발생합니다."
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const rankingList = document.getElementById("rankingList");

function showQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
}

function checkAnswer(answer) {
  const q = quizData[current];
  if (answer === q.answer) {
    score += 10;
    feedbackEl.textContent = "✅ 정답입니다! " + q.explanation;
    feedbackEl.style.color = "green";
  } else {
    feedbackEl.textContent = "❌ 오답입니다! " + q.explanation;
    feedbackEl.style.color = "red";
  }
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  current++;
  if (current < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizEl.style.display = "none";
  resultEl.style.display = "block";
  scoreText.textContent = `당신의 점수: ${score}점`;
}

function saveScore() {
  const name = document.getElementById("playerName").value || "익명";
  const scores = JSON.parse(localStorage.getItem("forestQuizScores")) || [];
  scores.push({ name, score });
  localStorage.setItem("forestQuizScores", JSON.stringify(scores));
  showRanking();
}

function showRanking() {
  rankingList.innerHTML = "";
  const scores = JSON.parse(localStorage.getItem("forestQuizScores")) || [];
  scores.sort((a, b) => b.score - a.score);
  scores.slice(0, 5).forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}위 - ${s.name}: ${s.score}점`;
    rankingList.appendChild(li);
  });
}

document.getElementById("btnO").addEventListener("click", () => checkAnswer("O"));
document.getElementById("btnX").addEventListener("click", () => checkAnswer("X"));
nextBtn.addEventListener("click", nextQuestion);
document.getElementById("saveBtn").addEventListener("click", saveScore);
document.getElementById("retryBtn").addEventListener("click", () => location.reload());

showQuestion();
