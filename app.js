// 레벨별 5문항, 10단계(총 50문항). 난이도는 하→상으로 증가
const LEVEL_QUESTIONS = [
  // 1단계 - 기초 상식
  [
    { question: "나무는 광합성으로 산소를 만든다.", answer: "O", explanation: "광합성에서 이산화탄소를 흡수하고 산소를 배출합니다." },
    { question: "쓰레기를 숲에 묻으면 빨리 분해된다.", answer: "X", explanation: "플라스틱 등은 수십~수백 년 걸립니다." },
    { question: "산불은 건조한 날씨에 더 쉽게 번진다.", answer: "O", explanation: "건조·강풍 조건에서 확산 위험이 큽니다." },
    { question: "도시 숲은 여름철 기온을 약간 올린다.", answer: "X", explanation: "그늘과 증산으로 기온을 낮춥니다." },
    { question: "낙엽은 토양 형성에 도움이 된다.", answer: "O", explanation: "낙엽은 유기물로 분해되어 토양을 비옥하게 합니다." },
  ],
  // 2단계
  [
    { question: "모든 곰은 겨울잠을 잔다.", answer: "X", explanation: "종과 환경에 따라 다르며 완전한 동면이 아닐 수 있습니다." },
    { question: "나무의 나이테는 성장 환경을 반영한다.", answer: "O", explanation: "나이테 간격은 기후·영양 상태를 반영합니다." },
    { question: "습지는 숲 생물다양성과 무관하다.", answer: "X", explanation: "습지는 생물다양성의 핵심 서식지입니다." },
    { question: "간벌은 숲 관리에 사용될 수 있다.", answer: "O", explanation: "밀도를 조절해 건강한 생장을 돕습니다." },
    { question: "멸종위기종은 법적 보호를 받지 않는다.", answer: "X", explanation: "대부분 국가에서 법적 보호를 받습니다." },
  ],
  // 3단계
  [
    { question: "이끼는 대개 공기 오염에 민감하다.", answer: "O", explanation: "이끼는 대기질 지표종으로 쓰입니다." },
    { question: "벌목 후 나무를 전혀 심지 않는 것이 지속가능하다.", answer: "X", explanation: "지속가능한 산림은 재조림·자연갱신이 필요합니다." },
    { question: "토양 침식은 숲 훼손과 관련이 있다.", answer: "O", explanation: "식생 훼손은 침식을 촉진합니다." },
    { question: "외래종은 항상 생태계에 이롭다.", answer: "X", explanation: "침입외래종은 토착종을 위협할 수 있습니다." },
    { question: "산림은 탄소를 저장하는 기능이 있다.", answer: "O", explanation: "목재·토양에 탄소를 장기 저장합니다." },
  ],
  // 4단계
  [
    { question: "드론은 산불 감시에 활용될 수 있다.", answer: "O", explanation: "열화상·실시간 모니터링에 유용합니다." },
    { question: "토종 수종만이 생물다양성을 만든다.", answer: "X", explanation: "핵심은 균형과 상호작용입니다." },
    { question: "연료용 장작은 항상 탄소중립이다.", answer: "X", explanation: "수확·연소·재생 주기에 따라 다릅니다." },
    { question: "산사태는 경사·강우·토질 등 복합 요인과 관련된다.", answer: "O", explanation: "다요인 재해로 예측·완화가 필요합니다." },
    { question: "사냥 금지구역은 개체군 회복에 도움이 된다.", answer: "O", explanation: "과도한 포획을 줄여 회복 기회를 줍니다." },
  ],
  // 5단계
  [
    { question: "숲 가장자리 효과는 일부 종에 불리할 수 있다.", answer: "O", explanation: "미기후 변화로 내음성 종에 불리할 수 있습니다." },
    { question: "탄소배출권은 산림 보전에 인센티브를 줄 수 있다.", answer: "O", explanation: "흡수원 가치를 시장에서 보상합니다." },
    { question: "모노컬처 조림은 항상 병해충에 강하다.", answer: "X", explanation: "단일종 대면적은 취약해질 수 있습니다." },
    { question: "산불 후 자연천이는 항상 빠르게 진행된다.", answer: "X", explanation: "기후·종자원에 따라 수십 년 걸릴 수 있습니다." },
    { question: "탐방로 이탈은 식생 훼손을 유발할 수 있다.", answer: "O", explanation: "토양 다짐과 식물 뿌리 손상이 발생합니다." },
  ],
  // 6단계
  [
    { question: "길게 가뭄이 지속되면 나무는 수분 스트레스를 받는다.", answer: "O", explanation: "기공 폐쇄·생장 저하가 나타납니다." },
    { question: "버섯은 모두 먹을 수 있다.", answer: "X", explanation: "독버섯 다수가 있으며 식별이 중요합니다." },
    { question: "죽은 나무(고사목)는 생태적으로 무가치하다.", answer: "X", explanation: "서식처·영양 순환에 중요합니다." },
    { question: "열대우림 파괴는 지역 기후에도 영향을 준다.", answer: "O", explanation: "증발산·순환 감소로 강수 패턴이 변합니다." },
    { question: "멧돼지는 토양 뒤집기로 식생에 영향을 준다.", answer: "O", explanation: "교란으로 종 조성 변화를 유발할 수 있습니다." },
  ],
  // 7단계
  [
    { question: "방화선은 산불 확산 억제에 쓰인다.", answer: "O", explanation: "연료 연속성을 끊어 확산을 막습니다." },
    { question: "산림 인증(FSC 등)은 전혀 신뢰할 수 없다.", answer: "X", explanation: "국제 표준에 기반한 제3자 인증입니다." },
    { question: "토양 유기탄소는 관리로 증가시킬 수 있다.", answer: "O", explanation: "낙엽층 보전, 교란 최소화로 증가합니다." },
    { question: "야생동물 먹이주기는 항상 좋은 보전 전략이다.", answer: "X", explanation: "습관·의존성 유발로 역효과가 납니다." },
    { question: "산림 파편화는 종 이동을 어렵게 만든다.", answer: "O", explanation: "서식지 연결성이 저하됩니다." },
  ],
  // 8단계
  [
    { question: "혼효림은 단일수종림보다 복원력이 높을 수 있다.", answer: "O", explanation: "다양성은 교란 대응력을 높입니다." },
    { question: "모든 처방화(관리 목적의 불)는 해롭다.", answer: "X", explanation: "적절한 처방화는 연료를 줄여 대형산불을 예방합니다." },
    { question: "사슴 과밀은 하층식생을 약화시킬 수 있다.", answer: "O", explanation: "과도한 섭식이 재생을 방해합니다." },
    { question: "침엽수는 활엽수보다 항상 탄소 저장량이 적다.", answer: "X", explanation: "수종·나이·현지 조건에 따라 다릅니다." },
    { question: "숲의 미세먼지 저감 효과는 전혀 없다.", answer: "X", explanation: "엽면 포집 등으로 저감 효과가 있습니다." },
  ],
  // 9단계
  [
    { question: "산림 수문학에서 캐노피 차단은 중요 요소다.", answer: "O", explanation: "우수의 일부가 잎·가지에 머뭅니다." },
    { question: "생태계 서비스는 문화적 가치와 무관하다.", answer: "X", explanation: "문화·레크리에이션 서비스도 포함합니다." },
    { question: "기후변화로 분포대가 고위도로 이동할 수 있다.", answer: "O", explanation: "온난화에 따른 이주·고사 위험이 있습니다." },
    { question: "모든 바이오매스 에너지는 탄소중립으로 본다.", answer: "X", explanation: "전주기 평가가 필요합니다." },
    { question: "생태통로는 단절된 서식지를 연결한다.", answer: "O", explanation: "이동·유전적 교류를 돕습니다." },
  ],
  // 10단계 - 심화
  [
    { question: "REDD+는 산림전용·황폐화 감소를 위한 국제 메커니즘이다.", answer: "O", explanation: "개도국 산림 온실가스 감축을 지원합니다." },
    { question: "순생산(NPP)은 광합성 총생산(GPP)과 동일하다.", answer: "X", explanation: "NPP=GPP-호흡(R)입니다." },
    { question: "림연료 연속성(연속 연료)은 화재 거동에 큰 영향이 없다.", answer: "X", explanation: "연료의 연속성은 확산과 강도에 핵심입니다." },
    { question: "고유종 보전은 유전적 다양성과도 관련된다.", answer: "O", explanation: "유전 다양성은 적응·회복력을 좌우합니다." },
    { question: "산림에서 블루카본은 주로 해양 생태계 개념이다.", answer: "O", explanation: "블루카본은 맹그로브·해초 등 해양·연안에 적용됩니다." },
  ],
];

const LEVEL_COUNT = 10;
const levels = Array.from({ length: LEVEL_COUNT }, (_, i) => ({
  id: i + 1,
  title: `${i + 1}단계`,
  questions: LEVEL_QUESTIONS[i],
}));

const PROGRESS_KEY = 'forest_quiz_progress_v1';
// { unlocked: number, completed: number[] }
function readProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { unlocked: 1, completed: [] };
    const parsed = JSON.parse(raw);
    const unlocked = Math.min(
      Math.max(1, Number(parsed.unlocked) || 1),
      LEVEL_COUNT
    );
    const completed = Array.isArray(parsed.completed) ? parsed.completed : [];
    return { unlocked, completed };
  } catch {
    return { unlocked: 1, completed: [] };
  }
}
function writeProgress(next) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
}

let currentQuestionIndex = 0;
let currentScore = 0;

// DOM 참조
const screenHome = document.getElementById("screen-home");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");
const screenLevels = document.getElementById('screen-levels');
const screenFinale = document.getElementById('screen-finale');

const btnGoLevels = document.getElementById('btn-go-levels');
const btnBackHome = document.getElementById('btn-back-home');
const btnShowRanking = document.getElementById("btn-show-ranking");
const btnO = document.getElementById("btn-o");
const btnX = document.getElementById("btn-x");
const btnRetry = document.getElementById("btn-retry");
const btnResultHome = document.getElementById('btn-result-home');
const btnNextLevel = document.getElementById('btn-next-level');
const btnResultRanking = document.getElementById("btn-result-ranking");

const btnFinaleLevels = document.getElementById('btn-finale-levels');
const btnFinaleHome = document.getElementById('btn-finale-home');

const levelsGrid = document.getElementById('levels-grid');
const levelsMap = document.getElementById('levels-map');

const questionEl = document.getElementById("question");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const timerEl = document.getElementById('timer');

const rankingDialog = document.getElementById("ranking-dialog");
const rankingListEl = document.getElementById("ranking-list");
const btnClearScores = document.getElementById("btn-clear-scores");
const btnCloseRanking = document.getElementById("btn-close-ranking");

function switchScreen(target) {
  [screenHome, screenQuiz, screenResult, screenLevels, screenFinale].forEach((el) => el.classList.remove("active"));
  target.classList.add("active");
}

let currentLevelId = 1;
let currentLevelQuestions = LEVEL_QUESTIONS[0];
let questionTimerId = null;
let remainingSeconds = 10;

function startLevel(levelId) {
  currentLevelId = levelId;
  const level = levels.find(l => l.id === levelId);
  currentLevelQuestions = level ? level.questions : quizData;
  currentQuestionIndex = 0;
  currentScore = 0;
  updateHud();
  switchScreen(screenQuiz);
  showQuestion();
}

function updateHud() {
  progressEl.textContent = `${currentQuestionIndex + 1} / ${currentLevelQuestions.length}`;
  scoreEl.textContent = `점수: ${currentScore}`;
}

function showQuestion() {
  const current = currentLevelQuestions[currentQuestionIndex];
  if (!current) return;
  questionEl.textContent = current.question;
  updateHud();
  startTimer();
}

function handleAnswer(userAnswer) {
  const q = currentLevelQuestions[currentQuestionIndex];
  if (!q) return;
  stopTimer();
  if (userAnswer === q.answer) {
    currentScore += 1;
    flashFeedback(true);
    setTimeout(() => alert(`정답! 🌳\n${q.explanation}`), 50);
  } else {
    flashFeedback(false);
    setTimeout(() => alert(`오답 😢\n${q.explanation}`), 50);
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex += 1;
  if (currentQuestionIndex < currentLevelQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  saveScore(currentScore);
  finalScoreEl.textContent = `당신의 점수: ${currentScore}`;
  // 단계 완료 처리
  const prog = readProgress();
  if (!prog.completed.includes(currentLevelId)) {
    prog.completed.push(currentLevelId);
  }
  if (currentLevelId < LEVEL_COUNT) {
    prog.unlocked = Math.max(prog.unlocked, currentLevelId + 1);
  }
  writeProgress(prog);

  if (currentLevelId === LEVEL_COUNT) {
    switchScreen(screenFinale);
  } else {
    switchScreen(screenResult);
  }
}

// 점수 저장/랭킹
const SCORE_KEY = "forest_quiz_scores";

function readScores() {
  try {
    const raw = localStorage.getItem(SCORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeScores(scores) {
  localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
}

function saveScore(score) {
  const scores = readScores();
  scores.push(Number(score) || 0);
  writeScores(scores);
}

function showRanking() {
  const scores = readScores().slice().sort((a, b) => b - a).slice(0, 20);
  rankingListEl.innerHTML = "";
  if (scores.length === 0) {
    const li = document.createElement("li");
    li.textContent = "아직 기록이 없습니다.";
    rankingListEl.appendChild(li);
  } else {
    scores.forEach((s, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}위: ${s}점`;
      rankingListEl.appendChild(li);
    });
  }
  rankingDialog.showModal();
}

function clearScores() {
  writeScores([]);
  writeProgress({ unlocked: 1, completed: [] });
  if (screenLevels.classList.contains('active')) {
    renderLevels();
  }
  showRanking();
}

// 단계 UI 렌더링
function renderLevels() {
  const prog = readProgress();
  if (!levelsMap) return;
  // 좌표 프리셋 (경로 모양)
  // 산 등반 느낌: 아래 → 위로 아지랑이 선형 경로
  const nodes = [
    { x: 40,  y: 500 },
    { x: 80,  y: 460 },
    { x: 60,  y: 415 },
    { x: 110, y: 375 },
    { x: 90,  y: 330 },
    { x: 140, y: 290 },
    { x: 120, y: 245 },
    { x: 170, y: 205 },
    { x: 150, y: 160 },
    { x: 190, y: 120 },
  ];

  // 자연 레이어 강도 업데이트 (완료할수록 풍부해짐)
  const doneCount = prog.completed.length;
  const ratio = Math.min(1, doneCount / LEVEL_COUNT);
  const clouds = document.querySelector('.layer-clouds');
  const mountains = document.querySelector('.layer-mountains');
  const forest = document.querySelector('.layer-forest');
  if (clouds) clouds.style.opacity = String(0.4 + 0.4 * ratio);
  if (mountains) mountains.style.opacity = String(0.3 + 0.5 * ratio);
  if (forest) forest.style.opacity = String(0.2 + 0.7 * ratio);

  // SVG 초기화
  levelsMap.innerHTML = '';
  const ns = 'http://www.w3.org/2000/svg';

  // 경로 (점선)
  const path = document.createElementNS(ns, 'polyline');
  path.setAttribute('class', 'map-path');
  path.setAttribute('fill', 'none');
  path.setAttribute('points', nodes.map(n => `${n.x},${n.y}`).join(' '));
  levelsMap.appendChild(path);

  // 산/자연 일러스트(레이어드 폴리곤 + 구릉/나무 느낌)
  const mBack = document.createElementNS(ns, 'polygon');
  mBack.setAttribute('class', 'map-mountain');
  mBack.setAttribute('points', '0,520 60,380 120,420 200,300 280,360 320,520');
  mBack.setAttribute('fill', '#315a46');
  mBack.setAttribute('opacity', '0.35');
  levelsMap.appendChild(mBack);
  const mMid = document.createElementNS(ns, 'polygon');
  mMid.setAttribute('points', '0,540 80,360 150,420 220,300 300,380 320,540');
  mMid.setAttribute('fill', '#3f7458');
  mMid.setAttribute('opacity', '0.55');
  levelsMap.appendChild(mMid);
  const mFront = document.createElementNS(ns, 'polygon');
  mFront.setAttribute('points', '0,540 100,400 170,430 230,330 320,450 320,540');
  mFront.setAttribute('fill', '#4d8d67');
  mFront.setAttribute('opacity', '0.75');
  levelsMap.appendChild(mFront);

  // 둥근 구릉과 나무(간단 원/타원)
  const hill = document.createElementNS(ns, 'ellipse');
  hill.setAttribute('cx', '260');
  hill.setAttribute('cy', '470');
  hill.setAttribute('rx', '40');
  hill.setAttribute('ry', '18');
  hill.setAttribute('fill', '#e6f7aa');
  hill.setAttribute('opacity', '0.8');
  levelsMap.appendChild(hill);
  const treeTrunk = document.createElementNS(ns, 'rect');
  treeTrunk.setAttribute('x', '250');
  treeTrunk.setAttribute('y', '454');
  treeTrunk.setAttribute('width', '6');
  treeTrunk.setAttribute('height', '12');
  treeTrunk.setAttribute('fill', '#7a4d2a');
  levelsMap.appendChild(treeTrunk);
  const treeTop = document.createElementNS(ns, 'circle');
  treeTop.setAttribute('cx', '253');
  treeTop.setAttribute('cy', '448');
  treeTop.setAttribute('r', '12');
  treeTop.setAttribute('fill', '#9ee08f');
  levelsMap.appendChild(treeTop);

  const peak = nodes[nodes.length - 1];
  const pole = document.createElementNS(ns, 'line');
  pole.setAttribute('class', 'map-flag-pole');
  pole.setAttribute('x1', String(peak.x + 14));
  pole.setAttribute('y1', String(peak.y + 18));
  pole.setAttribute('x2', String(peak.x + 14));
  pole.setAttribute('y2', String(peak.y - 10));
  levelsMap.appendChild(pole);
  const banner = document.createElementNS(ns, 'path');
  banner.setAttribute('class', 'map-flag-banner');
  banner.setAttribute('d', `M ${peak.x + 14} ${peak.y - 10} q 14 6 0 12 z`);
  levelsMap.appendChild(banner);


  // 노드
  nodes.forEach((pos, idx) => {
    const id = idx + 1;
    const locked = id > prog.unlocked;
    const done = prog.completed.includes(id);

    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'map-node' + (locked ? ' locked' : ''));

    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', String(pos.x));
    c.setAttribute('cy', String(pos.y));
    c.setAttribute('r', '18');
    g.appendChild(c);

    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', String(pos.x));
    t.setAttribute('y', String(pos.y + 4));
    t.setAttribute('text-anchor', 'middle');
    t.textContent = String(id);
    g.appendChild(t);

    if (locked) {
      const lock = document.createElementNS(ns, 'text');
      lock.setAttribute('x', String(pos.x + 10));
      lock.setAttribute('y', String(pos.y - 12));
      lock.textContent = '🔒';
      g.appendChild(lock);
    } else if (done) {
      const star = document.createElementNS(ns, 'text');
      star.setAttribute('x', String(pos.x));
      star.setAttribute('y', String(pos.y + 32));
      star.setAttribute('text-anchor', 'middle');
      star.textContent = '⭐️';
      g.appendChild(star);
    }

    if (!locked) {
      g.addEventListener('click', () => startLevel(id));
    }

    levelsMap.appendChild(g);
  });

  // 현재 단계 아이(캐릭터) - 모든 노드 뒤에 배치
  const progressIndex = Math.min(nodes.length - 1, Math.max(0, prog.completed.length));
  const pos = nodes[progressIndex];
  const kid = document.createElementNS(ns, 'g');
  kid.setAttribute('class', 'kid-bounce');
  // 그림자
  const shadow = document.createElementNS(ns, 'ellipse');
  shadow.setAttribute('class', 'map-kid-shadow');
  shadow.setAttribute('cx', String(pos.x));
  shadow.setAttribute('cy', String(pos.y + 14));
  shadow.setAttribute('rx', '12');
  shadow.setAttribute('ry', '4');
  kid.appendChild(shadow);
  // 다리(하단) - 두 다리를 벌린 사람 형태
  const leg1 = document.createElementNS(ns, 'rect');
  leg1.setAttribute('x', String(pos.x - 5));
  leg1.setAttribute('y', String(pos.y + 8));
  leg1.setAttribute('width', '3.5');
  leg1.setAttribute('height', '14');
  leg1.setAttribute('fill', '#654321');
  leg1.setAttribute('rx', '1');
  kid.appendChild(leg1);
  const leg2 = document.createElementNS(ns, 'rect');
  leg2.setAttribute('x', String(pos.x + 1.5));
  leg2.setAttribute('y', String(pos.y + 8));
  leg2.setAttribute('width', '3.5');
  leg2.setAttribute('height', '14');
  leg2.setAttribute('fill', '#654321');
  leg2.setAttribute('rx', '1');
  kid.appendChild(leg2);
  // 몸통(상의)
  const body = document.createElementNS(ns, 'circle');
  body.setAttribute('class', 'map-kid-body');
  body.setAttribute('cx', String(pos.x));
  body.setAttribute('cy', String(pos.y - 2));
  body.setAttribute('r', '11');
  kid.appendChild(body);
  // 팔 - 몸통 옆에 수직으로 배치
  const arm1 = document.createElementNS(ns, 'rect');
  arm1.setAttribute('x', String(pos.x - 12));
  arm1.setAttribute('y', String(pos.y - 8));
  arm1.setAttribute('width', '3.5');
  arm1.setAttribute('height', '12');
  arm1.setAttribute('fill', '#654321');
  arm1.setAttribute('rx', '1');
  kid.appendChild(arm1);
  const arm2 = document.createElementNS(ns, 'rect');
  arm2.setAttribute('x', String(pos.x + 8.5));
  arm2.setAttribute('y', String(pos.y - 8));
  arm2.setAttribute('width', '3.5');
  arm2.setAttribute('height', '12');
  arm2.setAttribute('fill', '#654321');
  arm2.setAttribute('rx', '1');
  kid.appendChild(arm2);
  // 머리
  const head = document.createElementNS(ns, 'circle');
  head.setAttribute('class', 'map-kid-head');
  head.setAttribute('cx', String(pos.x));
  head.setAttribute('cy', String(pos.y - 16));
  head.setAttribute('r', '10');
  kid.appendChild(head);
  // 머리카락(상단)
  const hair = document.createElementNS(ns, 'path');
  hair.setAttribute('fill', '#ffa500');
  hair.setAttribute('d', `M ${pos.x - 10} ${pos.y - 24} Q ${pos.x} ${pos.y - 28} ${pos.x + 10} ${pos.y - 24} L ${pos.x + 8} ${pos.y - 21} Q ${pos.x} ${pos.y - 25} ${pos.x - 8} ${pos.y - 21} Z`);
  kid.appendChild(hair);
  // 얼굴: 눈
  const eye1 = document.createElementNS(ns, 'circle');
  eye1.setAttribute('cx', String(pos.x - 4));
  eye1.setAttribute('cy', String(pos.y - 16));
  eye1.setAttribute('r', '2');
  eye1.setAttribute('fill', '#000');
  kid.appendChild(eye1);
  const eye2 = document.createElementNS(ns, 'circle');
  eye2.setAttribute('cx', String(pos.x + 4));
  eye2.setAttribute('cy', String(pos.y - 16));
  eye2.setAttribute('r', '2');
  eye2.setAttribute('fill', '#000');
  kid.appendChild(eye2);
  // 얼굴: 입(웃음)
  const mouth = document.createElementNS(ns, 'path');
  mouth.setAttribute('stroke', '#ff69b4');
  mouth.setAttribute('stroke-width', '1.5');
  mouth.setAttribute('fill', 'none');
  mouth.setAttribute('d', `M ${pos.x - 3} ${pos.y - 12} Q ${pos.x} ${pos.y - 9} ${pos.x + 3} ${pos.y - 12}`);
  kid.appendChild(mouth);
  levelsMap.appendChild(kid);
}

// 이벤트 바인딩
btnGoLevels.addEventListener('click', () => { renderLevels(); switchScreen(screenLevels); });
btnBackHome.addEventListener('click', () => switchScreen(screenHome));
btnRetry.addEventListener("click", () => startLevel(currentLevelId));
btnNextLevel.addEventListener('click', () => {
  const next = Math.min(currentLevelId + 1, LEVEL_COUNT);
  if (next === currentLevelId) {
    switchScreen(screenFinale);
  } else {
    startLevel(next);
  }
});
btnO.addEventListener("click", () => handleAnswer("O"));
btnX.addEventListener("click", () => handleAnswer("X"));
btnShowRanking.addEventListener("click", showRanking);
btnResultRanking.addEventListener("click", showRanking);
btnClearScores.addEventListener("click", clearScores);
btnCloseRanking.addEventListener("click", () => rankingDialog.close());
btnFinaleLevels.addEventListener('click', () => { renderLevels(); switchScreen(screenLevels); });
btnFinaleHome.addEventListener('click', () => { renderLevels(); switchScreen(screenLevels); });
btnResultHome.addEventListener('click', () => { renderLevels(); switchScreen(screenLevels); });

// 초기 진입
switchScreen(screenHome);
// 초기 진행상태 기본값 보장
writeProgress(readProgress());

// 타이머 & 피드백
function startTimer() {
  stopTimer();
  remainingSeconds = 10;
  renderTimer();
  questionTimerId = setInterval(() => {
    remainingSeconds -= 1;
    renderTimer();
    if (remainingSeconds <= 0) {
      stopTimer();
      // 시간초과: 자동 오답 처리
      flashFeedback(false);
      setTimeout(() => alert('시간 초과! 😢\n오답으로 처리됩니다.'), 50);
      nextQuestion();
    }
  }, 1000);
}

function stopTimer() {
  if (questionTimerId) {
    clearInterval(questionTimerId);
    questionTimerId = null;
  }
}

function renderTimer() {
  if (timerEl) timerEl.textContent = `${remainingSeconds}초`;
}

function flashFeedback(isCorrect) {
  const cls = isCorrect ? 'flash-correct' : 'flash-wrong';
  const node = questionEl;
  node.classList.remove('flash-correct', 'flash-wrong');
  // reflow to restart animation
  // eslint-disable-next-line no-unused-expressions
  node.offsetWidth;
  node.classList.add(cls);
}


(function () {
  const STORAGE_KEY = 'observations';

  /**
   * Storage helpers
   */
  function loadObservations() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to parse observations from storage', e);
      return [];
    }
  }

  function saveObservations(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function addObservation(item) {
    const list = loadObservations();
    list.push(item);
    // newest first rendering, but we just store in append order
    saveObservations(list);
  }

  function deleteObservationById(id) {
    const list = loadObservations();
    const next = list.filter((it) => it.id !== id);
    saveObservations(next);
  }

  function clearAll() {
    // Only clear our key to avoid nuking unrelated site data
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * DOM helpers
   */
  function $(sel) { return document.querySelector(sel); }
  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'dataset' && v && typeof v === 'object') {
        Object.entries(v).forEach(([dk, dv]) => node.dataset[dk] = dv);
      } else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v);
    });
    children.forEach((c) => node.appendChild(c));
    return node;
  }

  function formatDate(value) {
    try {
      // expect YYYY-MM-DD
      const [y, m, d] = value.split('-');
      return `${y}.${m}.${d}`;
    } catch { return value; }
  }

  function todayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }

  /**
   * Views
   */
  const views = {
    home: '#view-home',
    add: '#view-add',
    detail: '#view-detail'
  };

  function showView(name) {
    Object.values(views).forEach((sel) => $(sel).classList.remove('active'));
    $(views[name]).classList.add('active');
  }

  /**
   * Render list on Home
   */
  function renderList() {
    const listEl = $('#observation-list');
    const emptyEl = $('#empty-state');
    const data = loadObservations();
    // sort newest first by id (timestamp)
    data.sort((a, b) => b.id - a.id);
    listEl.innerHTML = '';

    if (data.length === 0) {
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    data.forEach((item) => {
      const left = el('div', {}, [
        el('div', { class: 'title', text: item.species || '미상' }),
        el('div', { class: 'meta', text: `${item.location || '위치 미상'} · ${formatDate(item.date)}` })
      ]);
      const right = el('div', { class: 'photo', title: item.hasPhoto ? '사진 있음' : '사진 없음' }, [
        document.createTextNode(item.hasPhoto ? '📸' : '▫️')
      ]);
      const li = el('li', { class: 'list-item', dataset: { id: String(item.id) } }, [left, right]);
      li.addEventListener('click', () => openDetail(item.id));
      listEl.appendChild(li);
    });
  }

  /**
   * Detail view
   */
  let currentDetailId = null;
  function openDetail(id) {
    const data = loadObservations();
    const item = data.find((it) => it.id === id);
    if (!item) return;
    currentDetailId = id;
    const box = $('#detail-content');
    box.innerHTML = '';

    const rows = [
      ['종', item.species || '-'],
      ['날짜', formatDate(item.date)],
      ['위치', item.location || '-'],
      ['특징', item.features || '-'],
      ['날씨', item.weather || '-'],
      ['사진', item.hasPhoto ? '예' : '아니오']
    ];

    rows.forEach(([k, v]) => {
      const row = el('div', { class: 'detail-row' }, [
        el('div', { class: 'key', text: k }),
        el('div', { class: 'val', text: v })
      ]);
      box.appendChild(row);
    });

    showView('detail');
  }

  /**
   * Add form handling
   */
  function resetAddForm() {
    $('#form-add').reset();
    $('#date').value = todayISO();
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    const species = $('#species').value.trim();
    const date = $('#date').value || todayISO();
    const location = $('#location').value.trim();
    const features = $('#features').value.trim();
    const weather = $('#weather').value;
    const hasPhoto = $('#hasPhoto').checked;

    if (!species || !date || !location) {
      alert('식물명, 날짜, 위치는 필수입니다.');
      return;
    }

    const item = {
      id: Date.now(),
      species,
      date,
      location,
      features,
      weather,
      hasPhoto
    };

    addObservation(item);
    renderList();
    showView('home');
  }

  /**
   * Wire events
   */
  function bindEvents() {
    $('#btn-add').addEventListener('click', () => {
      resetAddForm();
      showView('add');
    });

    $('#btn-cancel-add').addEventListener('click', () => {
      showView('home');
    });

    $('#form-add').addEventListener('submit', handleAddSubmit);

    $('#btn-back').addEventListener('click', () => {
      currentDetailId = null;
      showView('home');
    });

    $('#btn-delete').addEventListener('click', () => {
      if (currentDetailId == null) return;
      if (confirm('이 기록을 삭제할까요?')) {
        deleteObservationById(currentDetailId);
        currentDetailId = null;
        renderList();
        showView('home');
      }
    });

    $('#btn-clear-all').addEventListener('click', () => {
      if (confirm('모든 기록을 삭제할까요?')) {
        clearAll();
        renderList();
      }
    });
  }

  /**
   * Init
   */
  document.addEventListener('DOMContentLoaded', () => {
    // default date today on first load for add view (when opened)
    renderList();
    bindEvents();
  });
})();


