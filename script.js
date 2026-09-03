// --- Audio Effects System (Web Audio API Synthesizer) ---
class GameSound {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTyping() {
    if (this.muted || !this.ctx) return;
    this.init();
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140 + Math.random() * 60, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playClick() {
    if (this.muted || !this.ctx) return;
    this.init();
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playConfirm() {
    if (this.muted || !this.ctx) return;
    this.init();
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    
    [440, 554.37].forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.07);
      
      gain.gain.setValueAtTime(0.05, now + index * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.07 + 0.22);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + index * 0.07);
      osc.stop(now + index * 0.07 + 0.25);
    });
  }

  playSuccess() {
    if (this.muted || !this.ctx) return;
    this.init();
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C Major Chord (emotional resonance)
    
    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);
      
      gain.gain.setValueAtTime(0.04, now + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.55);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 0.65);
    });
  }
}

const sound = new GameSound();

// --- Ambient Particle System ---
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 25;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 20 + 8;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    
    const duration = Math.random() * 12 + 8;
    particle.style.animationDuration = `${duration}s`;
    
    const delay = Math.random() * 10;
    particle.style.animationDelay = `-${delay}s`;
    
    container.appendChild(particle);
  }
}

// --- Enneagram Questions Registry ---
const rawQuestions = {
  1: [
    { id: "1-1", text: "나는 모든 일을 개선하기 위해 깊이 생각해서 행동한다." },
    { id: "1-2", text: "나는 다른 사람들보다 근면하며 책임감이 강하다." },
    { id: "1-3", text: "나는 정직하고 자제력이 있는 사람이다." },
    { id: "1-4", text: "나의 행동은 원칙에 기초를 둔다." },
    { id: "1-5", text: "나는 완벽을 위해 끝까지 참고 노력한다." },
    { id: "1-6", text: "나는 규칙을 잘 지키며 엄격하다." },
    { id: "1-7", text: "나는 다른 사람들의 신임을 얻을 수 있다." },
    { id: "1-8", text: "나는 정의감이 강하고 근면하다." },
    { id: "1-9", text: "나는 주로 나의 양심과 이성에 따른다." },
    { id: "1-10", text: "나는 이성친구 또는 친구와의 약속이 없으면 불안함을 느낀다." }
  ],
  2: [
    { id: "2-1", text: "나는 다른 사람들과 함께 일하기를 더 좋아한다." },
    { id: "2-2", text: "나는 사람들에게 칭찬을 잘 한다." },
    { id: "2-3", text: "내 생각보다는 남의 생각에 공감할 때가 많다." },
    { id: "2-4", text: "나는 친구들이 나에게 의지할 때 기분이 좋다." },
    { id: "2-5", text: "나의 관심사는 다른 사람들을 도와주는 것이다." },
    { id: "2-6", text: "나는 사람들을 관심 있게 대하고 보살피려 한다." },
    { id: "2-7", text: "나는 사람들과 친해지려고 많이 노력하고 있다." },
    { id: "2-8", text: "나는 타인의 만족을 위해 노력한다." },
    { id: "2-9", text: "나는 타인의 호감을 얻기 위해 노력한다." },
    { id: "2-10", text: "나는 자해 또는 자살 시도에 대해 생각해 본 적 있다." }
  ],
  3: [
    { id: "3-1", text: "나는 능력을 발휘하는데 많은 시간을 투자한다." },
    { id: "3-2", text: "나는 과정보다는 결과를 중시한다." },
    { id: "3-3", text: "나는 적응력이 뛰어나 상황에 적절히 대응한다." },
    { id: "3-4", text: "나는 인간 중심적이기보다는 오히려 목표 중심적이다." },
    { id: "3-5", text: "나는 사람들에게 지나친 경쟁을 강요한다." },
    { id: "3-6", text: "나는 성공만이 애정을 획득할 수 있다고 믿는다." },
    { id: "3-7", text: "나는 실패를 두려워하여 과장하는 경향이 있다." },
    { id: "3-8", text: "나는 침체에 빠지지 않고 무엇인가를 끊임없이 행한다." },
    { id: "3-9", text: "나는 사람들에 대한 배려보다는 일의 성취를 더 중요하게 생각한다." },
    { id: "3-10", text: "나는 문신 혹은 피어싱에 관심이 간다." }
  ],
  4: [
    { id: "4-1", text: "나는 감성적이어서 혼자 있을 때가 많다." },
    { id: "4-2", text: "나는 혼자서 자신만의 고상한 취미를 즐긴다." },
    { id: "4-3", text: "나는 낭만적이고 예술가적인 기질이 있다." },
    { id: "4-4", text: "나는 이방인처럼 느낄 때가 많다." },
    { id: "4-5", text: "나는 다른 사람들과는 다른 독특한 감정을 가지고 있다." },
    { id: "4-6", text: "나는 분위기에 약하고 자기 생각에 골몰하는 편이다." },
    { id: "4-7", text: "나는 내 행동의 동기와 감정에 대해 회의적인 생각이 들 때가 있다." },
    { id: "4-8", text: "나는 감동적인 것을 추구하다가 혼자 우울해지기도 한다." },
    { id: "4-9", text: "나는 비현실적이며 몽상가적 기질을 가지고 있다." },
    { id: "4-10", text: "나는 가끔 충동적으로 행동(ex. 투자, 폭식, 성관계 등) 하는 경향이 있다." }
  ],
  5: [
    { id: "5-1", text: "나는 무엇인가에 집중하며 통찰한다." },
    { id: "5-2", text: "나는 문제가 있으면 풀릴 때까지 그것만 골똘히 생각한다." },
    { id: "5-3", text: "나는 공적인 것보다는 개인생활에 대한 관심이 많다." },
    { id: "5-4", text: "나는 감정보다는 이성을 추구한다." },
    { id: "5-5", text: "나는 시간이나 돈을 아끼는 경향이 있다." },
    { id: "5-6", text: "나의 관심사는 나를 둘러싼 세계를 이해하는 것이다." },
    { id: "5-7", text: "나는 권위를 믿지 않고 규칙을 무시한다." },
    { id: "5-8", text: "나는 지적이고 냉철하게 관찰하는 편이다." },
    { id: "5-9", text: "나는 머리로 모든 것을 이해하고 판단한다." },
    { id: "5-10", text: "나는 1시간 이상 걸리는 곳으로 이동하는 것에 부담을 느껴한다." }
  ],
  6: [
    { id: "6-1", text: "나는 명확한 지침이 있을 때 일의 능률이 오른다." },
    { id: "6-2", text: "나는 사랑하는 사람을 가끔 의심하는 경향이 있다." },
    { id: "6-3", text: "나는 성공에 대해서도 가끔 평가 절하하는 경향이 있다." },
    { id: "6-4", text: "나는 잘 훈련되어 있어 조직이나 집단에 헌신할 수 있다." },
    { id: "6-5", text: "사람들은 내게 때로 용기가 필요하다고 말한다." },
    { id: "6-6", text: "나는 결과에 대한 두려움 때문에 일을 질질 끄는 경우가 있다." },
    { id: "6-7", text: "나는 충성할 만한 사람이라고 판단되면 헌신할 수 있다." },
    { id: "6-8", text: "나는 친하게 지내는 사람과 영원한 우정을 유지하도록 노력한다." },
    { id: "6-9", text: "나는 모든 일에서 안전을 중요하게 생각한다." },
    { id: "6-10", text: "나는 잠수를 타고 싶다고 생각한 적이 있다." }
  ],
  7: [
    { id: "7-1", text: "나는 자발적으로 재미있는 일을 즐긴다" },
    { id: "7-2", text: "나는 모험적이며 위험을 감수한다." },
    { id: "7-3", text: "나는 끊임없이 변화하는 생활을 좋아한다." },
    { id: "7-4", text: "나는 자극과 흥분을 유발하는 활동을 좋아한다." },
    { id: "7-5", text: "나는 어린아이처럼 명량하고 순진하다." },
    { id: "7-6", text: "나는 미래에 대해 항상 열정을 가지고 있다." },
    { id: "7-7", text: "나는 여러 가지 일들을 즐기며, 새로운 경험을 갈망한다." },
    { id: "7-8", text: "나는 한 가지 일에 정착하기가 어렵다." },
    { id: "7-9", text: "나는 현실에 만족하지 않고 새로운 것을 추가한다." },
    { id: "7-10", text: "나는 심리적 어려움이 생긴다면 전문 상담 또는 약물 치료를 받아야 한다고 생각한다." }
  ],
  8: [
    { id: "8-1", text: "나에게는 지도자로서의 기질이 있다." },
    { id: "8-2", text: "나는 의사 결정을 할 때 적절한 지도력을 발휘한다." },
    { id: "8-3", text: "나는 늘 강해야 한다고 생각한다." },
    { id: "8-4", text: "나는 사람들에게 영향력 있는 사람이다." },
    { id: "8-5", text: "나는 다른 사람들이 말하기 어려워하는 것을 이야기 한다." },
    { id: "8-6", text: "나는 공격적이고 자기 주장이 강하다." },
    { id: "8-7", text: "나는 사람들을 통제하려 한다." },
    { id: "8-8", text: "나는 사람들을 지시하고 동기를 부여한다." },
    { id: "8-9", text: "나는 강한 자신감으로 사람들을 설득 시킨다." },
    { id: "8-10", text: "나는 정치 또는 종교와 관련된 것은 피한다." }
  ],
  9: [
    { id: "9-1", text: "나는 자기만족적이며 태평한 편이다." },
    { id: "9-2", text: "나는 감정의 동요가 많지 않은 원만한 사람이다." },
    { id: "9-3", text: "나는 안전한 해결책을 원하고 되도록 갈등을 피한다." },
    { id: "9-4", text: "나는 친구들과 긴장을 풀고 마음 편하게 지낸다." },
    { id: "9-5", text: "나는 사람들을 유쾌하고 편하게 대한다." },
    { id: "9-6", text: "사람들은 나를 그냥 좋아한다." },
    { id: "9-7", text: "나는 세상에 대해 낙관적인 편이다." },
    { id: "9-10", text: "나는 동성에게 이성적 감정을 느낀 적이 있다." }
  ]
};

// Programmatically flatten and interleave the questions across types
const questionsList = [];
const maxIndex = 10;
for (let i = 0; i < maxIndex; i++) {
  for (let type = 1; type <= 9; type++) {
    const list = rawQuestions[type];
    if (i < list.length) {
      questionsList.push({
        type: type,
        id: list[i].id,
        text: list[i].text
      });
    }
  }
}

// Group into sets of 5 questions per page with chapters
const quizPages = [];
const questionsPerPage = 5;

quizPages.push({
  isChapter: true,
  title: "Chapter 1",
  text: "표면의 세계 (The Surface World)",
  story: [
    "자, 이제 점점 더 깊은 곳으로 들어가는\n여정을 시작해볼까?",
    "첫 번째 목적지는 네 마음의 가장 바깥쪽,\n'표면의 세계'야.",
    "너무 서두르지 말고,\n가벼운 마음으로 발걸음을 떼보자구."
  ]
});

let chapterQuestionIndex = 0;

for (let i = 0; i < questionsList.length; i += questionsPerPage) {
  const currentChunk = questionsList.slice(i, i + questionsPerPage);
  // Add chapter offsets to chunk for local numbering
  const chunkWithNumbers = currentChunk.map((q, idx) => ({
    ...q,
    localNum: chapterQuestionIndex + idx + 1
  }));
  chapterQuestionIndex += currentChunk.length;

  quizPages.push({
    isChapter: false,
    questions: chunkWithNumbers
  });
  
  if (i + questionsPerPage === 30) {
    quizPages.push({
      isChapter: true,
      title: "Chapter 2",
      text: "틈새의 기억 (Memories of the Rift)",
      story: [
        "표면을 지나 조금 더 깊은 곳,\n'틈새의 기억'에 도착했어.",
        "이곳에서는 네가 평소에 무심코 지나쳤던\n내면의 갈등들이 안개처럼 피어오르지.",
        "우리의 진짜 '틈'이 숨어있는 곳으로 가는\n중요한 길목이야."
      ]
    });
    chapterQuestionIndex = 0; // Reset numbering
  } else if (i + questionsPerPage === 60) {
    quizPages.push({
      isChapter: true,
      title: "Chapter 3",
      text: "심연의 세계 (The Abyssal World)",
      story: [
        "드디어 마지막 목적지,\n'심연의 세계'의 문 앞에 섰어.",
        "네 마음속 가장 깊은 곳에 웅크리고 있는\n진짜 '틈'의 모양이 보일 거야.",
        "망설이지 말고,\n용기를 내서 문을 열어봐."
      ]
    });
    chapterQuestionIndex = 0; // Reset numbering
  }
}


// --- Immersive Bonfire Dialog Poetic Lines (22 lines) ---
const bonfireQuotes = [
  "방랑자여, 어둠을 헤치고 여기까지 왔구나. 너를 괴롭혀 온 마음속의 틈을 찾아 함께 여정을 떠나보자.",
  "바람이 차갑네. 네 마음속 깊이 숨겨진 이야기를 계속 비춰봐.",
  "가끔은 피하고 싶은 대답도 있겠지. 괜찮아, 여기엔 오직 너와 모닥불뿐이야.",
  "빛과 그림자는 늘 공존하는 법. 너의 또 다른 조각을 보여줘.",
  "시간이 멈춘 듯 고요한 밤이야. 너의 일상을 한 번 돌아볼까?",
  "타인의 시선 뒤에 숨겨진 진짜 너는 어떤 모습이니?",
  "불꽃이 타오르며 어둠을 몰아내듯, 네 생각의 깊이를 더해가자.",
  "네가 세상을 향해 뻗는 손길에는 어떤 마음이 깃들어 있니?",
  "타오르는 잿더미 속에서 네 시선이 머무는 곳은 어디일까?",
  "성공과 실패, 그 사이에서 흔들리던 너의 영혼을 응시해봐.",
  "때로는 감정의 소용돌이에 휩쓸릴 때도 있겠지. 솔직해도 돼.",
  "너의 생각의 울타리는 얼마나 넓고 견고하니?",
  "세상이라는 거대한 톱니바퀴 속에서 너는 어떤 규칙을 쫓고 있어?",
  "마음의 방전이 두려워 멀리서 관찰하고 있는 것은 아니니?",
  "네 곁을 든든하게 지켜줄 안전한 약속을 갈망하고 있구나.",
  "불안함을 지우기 위해 애써 즐거운 모험만 찾고 있지는 않니?",
  "때로는 거절하는 법을 몰라 가슴 한구석이 묵직해지곤 하지.",
  "강해야만 살아남을 수 있다는 무거운 짐을 잠시 내려놓아도 좋아.",
  "너의 침묵 속에 잠들어 있던 목소리를 깨워볼 차례야.",
  "거의 다 왔어. 마음의 마지막 틈새까지 불빛을 비춰보자.",
  "이 깊은 자아의 끝에서, 네 영혼은 어떤 모습으로 서 있을까?",
  "마지막 문을 열기 전, 네 모든 조각들이 한자리에 모였어. 완성을 향해가자."
];

// --- 9 Enneagram Result Archetypes ---
const archetypes = {
  1: {
    number: 1,
    name: "시간을 멈춘 시계공",
    tagline: "멈춘 시계를 고치며 흐트러진 시간을 바로잡는 시계공입니다.",
    message: "고쳐야 할 시간이 아직 남아 있어.\n멈춘 바늘도, 틀어진 마음도 제자리를 찾아야 하니까.",
    riftTitle: "잃어버린 틈: ‘괜찮지 않아도 되는 순간’",
    narrative: [
      "시계공은 언제나 정확해야 했습니다. 한 번의 실수로 누군가에게 큰 상처를 남긴 후, 그는 “다시는 틀리지 않겠다”고 다짐합니다. 그날부터 마음속 세계의 시계들은 모두 같은 시간에 멈춰버립니다.",
      "그의 틈 속에는 고장 난 시계 하나가 숨겨져 있습니다. 아무리 고쳐도 몇 분씩 어긋나는 시계입니다. 시계공은 그것을 실패의 증거라 여기지만, 사실 그 시계는 그가 마지막으로 편안하게 웃었던 날의 시간을 담고 있습니다.",
      "플레이어가 모든 톱니를 완벽하게 맞추려 할수록 맵은 더 망가집니다. 마지막 퍼즐의 정답은 고장 난 시계를 고치지 않는 것입니다.",
      "시계공이 깨닫습니다.\n\n“어긋나도… 시간은 계속 흐르는구나.”",
      "그가 되찾는 것은 완벽함이 아니라 여유입니다."
    ],
    features: {
      personality: "차분하고 원칙적이며, 흐트러진 것을 바로잡고 싶어함.",
      likes: "시계, 질서, 공구, 정확한 약속",
      characteristics: "멈춘 시간을 고치며 잃어버린 순간들을 기억함.",
      keywords: ["추억", "원칙", "수리", "기억", "안내"]
    },
    representativeItems: [
      { img: "assets/item_1_1.png", name: "수리 도구 세트", desc: "(드라이버, 핀셋 등)" },
      { img: "assets/item_1_2.png", name: "회중시계", desc: "(시간 정지 장치)" },
      { img: "assets/item_1_3.png", name: "확대 루페", desc: "(정밀 작업용)" },
      { img: "assets/item_1_4.png", name: "공구 상자", desc: "(이동형 작업함)" }
    ],
    image: "assets/type_1.jpg",
    topImage: "assets/char_top_1.jpg",
    sheetImage: "assets/section5_combined_1.jpg",
    healingItem: "고장 난 회중시계 & 수리 도구 세트",
    color: "빈티지 브라운 (Vintage Brown)",
    colorHex: "#8e6c43",
    goodMatch: "7번 - 웃지 않는 광대",
    badMatch: "4번 - 거울 수집가"
  },
  2: {
    number: 2,
    name: "화살 잃은 큐피드",
    tagline: "사라진 화살을 찾아 헤매는 외로운 큐피드입니다.",
    message: "내 화살은 없어졌지만,\n누군가의 마음이 닿는 순간은 아직 믿고 있어.",
    riftTitle: "잃어버린 틈: ‘받는 것’",
    narrative: [
      "큐피드는 모두에게 화살을 쏘며 관계를 이어주었습니다. 누군가 외로워하면 곁에 있었고, 누군가 울면 먼저 달려갔습니다.",
      "하지만 어느 날 자신의 화살 하나가 사라집니다.",
      "그 뒤로 아무리 다른 사람을 이어줘도 자신의 등 뒤에는 계속 커다란 틈이 생깁니다. 그의 세계에는 수천 통의 편지가 있지만, 큐피드 앞으로 온 편지는 단 한 통도 열려 있지 않습니다.",
      "플레이어는 화살을 찾으러 왔다고 생각하지만, 마지막에 발견하는 것은 화살이 아니라 봉인된 편지 한 장입니다.",
      "그 편지에는 이렇게 적혀 있습니다.\n\n“이번에는 네가 나를 찾아오지 않아도 돼. 내가 너에게 갈게.”",
      "큐피드는 처음으로 누군가에게 기대는 법을 배웁니다.",
      "그가 잃어버린 것은 사랑이 아니라 사랑받는 법이었습니다."
    ],
    features: {
      personality: "다정하고 배려심이 많지만, 혼자 남는 건 서툴러요.",
      likes: "편지, 깃털, 포옹, 두근거림",
      characteristics: "잃어버린 화살 대신 사람들의 진심을 모으고 있어요.",
      keywords: ["다정함", "섬세함", "외로움", "진심"]
    },
    representativeItems: [
      { img: "assets/item_2_1.png", name: "사냥의 활", desc: "(원거리 또는 민첩)" },
      { img: "assets/item_2_2.png", name: "화살통", desc: "(마법 보충)" },
      { img: "assets/item_2_3.png", name: "하트 편지", desc: "(단발성 HP 회복)" },
      { img: "assets/item_2_4.png", name: "하트 랜턴", desc: "(어두운 장소를 비춤)" }
    ],
    image: "assets/type_2.jpg",
    topImage: "assets/char_top_2.jpg",
    sheetImage: "assets/section5_combined_2.jpg",
    healingItem: "봉인된 하트 편지 & 깃털 날개",
    color: "파스텔 앤틱 로즈 (Antique Rose)",
    colorHex: "#e879f9",
    goodMatch: "8번 - 갑옷을 벗지 않는 기사",
    badMatch: "5번 - 세상을 저장하는 방랑자"
  },
  3: {
    number: 3,
    name: "끝없이 달리는 소녀",
    tagline: "끝이 보이지 않는 길을 달리는 소녀입니다.",
    message: "조금 숨이 차도 괜찮아.\n멈추지 않으면 언젠가 내가 찾던 곳에 닿을 테니까.",
    riftTitle: "잃어버린 틈: ‘멈춘 뒤의 나’",
    narrative: [
      "소녀가 사는 세계에는 끝없는 철도가 있습니다. 곳곳의 전광판에는 계속 다음 목표가 떠오릅니다.\n\nNEXT GOAL / NEXT GOAL / NEXT GOAL",
      "하나를 통과하면 더 먼 곳에 새로운 결승선이 생깁니다.",
      "소녀는 오래전 한 번 멈춰 섰다가 누군가에게 들었습니다.\n\n“그 정도로 만족할 거야? 더 뛰어야지..”",
      "그날부터 그녀의 틈에서 ‘도착’이라는 역이 사라졌습니다.",
      "플레이어는 그녀보다 빨리 달리는 것이 아니라, 철도의 전원을 하나씩 끄며 길을 멈춰야 합니다. 마지막에는 아무것도 없는 작은 플랫폼이 나타납니다.\n\n간판에는 단 한 글자만 적혀 있습니다.\n\n[여기]",
      "처음으로 달리지 않는 소녀가 묻습니다.\n\n“아무것도 하지 않아도… 나는 여전히 나야?”",
      "그녀가 되찾는 것은 성공이 아니라 그저 나 자체의 존재감입니다."
    ],
    features: {
      personality: "용기가 있고, 포기하지 않고 끝까지 달려가요.",
      likes: "달리기, 노을, 기차, 바람",
      characteristics: "멈추지 않고 앞으로 나아가며 자신만의 길을 찾고 있어요.",
      keywords: ["도전", "인내", "희망", "이동", "여행"]
    },
    representativeItems: [
      { img: "assets/item_3_1.png", name: "러닝 슈즈", desc: "(카펠고 폰톤암)" },
      { img: "assets/item_3_2.png", name: "백팩", desc: "(여행과 필수품)" },
      { img: "assets/item_3_3.png", name: "목표 태그", desc: "(언젠가 도달할 곳)" },
      { img: "assets/item_3_4.png", name: "물통", desc: "(수분 보충용)" }
    ],
    image: "assets/type_3.jpg",
    topImage: "assets/char_top_3.jpg",
    sheetImage: "assets/section5_combined_3.jpg",
    healingItem: "목표 태그 & 수분 보충용 물통",
    color: "노을 빛 앰버 (Sunset Amber)",
    colorHex: "#f97316",
    goodMatch: "6번 - 답을 기다리는 예언자",
    badMatch: "9번 - 잠든 거인"
  },
  4: {
    number: 4,
    name: "거울 수집가",
    tagline: "거울 속에 숨은 진실을 모으는 수집가입니다.",
    message: "모든 거울은 다른 진실을 비추지.\n나는 그 파편들을 모아 나를 이해하려고 해.",
    riftTitle: "잃어버린 틈: ‘평범한 나’",
    narrative: [
      "거울 수집가는 자신을 특별하게 만들어주는 거울만 모옵니다. 어떤 거울에서는 아름답고, 어떤 거울에서는 비극적이며, 어떤 거울에서는 누구보다 특별해 보입니다.",
      "그런데 그의 세계 깊숙한 곳에는 아무것도 비추지 않는 거울 하나가 있습니다. 그는 그것을 가장 싫어합니다.",
      "플레이어가 거울 미궁을 통과하면서 알게 되는 사실은, 그 거울이 망가진 것이 아니라는 것입니다.",
      "그 거울에는 꾸미지 않은 현재의 모습만 비춥니다.",
      "마지막에 수집가는 처음으로 그 앞에 섭니다. 아무런 특별한 빛도, 비극도, 아름다운 연출도 없습니다. 그저 자신이 있습니다.",
      "“특별하지 않은 나도… 사라지는 건 아니었구나.”",
      "그가 되찾는 것은 특별함이 아니라 자기 자신입니다."
    ],
    features: {
      personality: "차분하고 관찰력이 뛰어나며, 진실을 알고 싶어 해요.",
      likes: "거울, 비밀, 조용한 방, 기록",
      characteristics: "거울 틈의 세계에서 사라진 조각들을 수집해요.",
      keywords: ["냉철", "통찰", "탐구", "자아"]
    },
    representativeItems: [
      { img: "assets/item_4_1.png", name: "성검", desc: "(진실을 꿰뚫는 검)" },
      { img: "assets/item_4_2.png", name: "올빼미", desc: "(모든 지혜와 연결된 기록책)" },
      { img: "assets/item_4_3.png", name: "휘장", desc: "(겨울 수호가의 상징)" },
      { img: "assets/item_4_4.png", name: "성수", desc: "(겨울 세계의 정수)" }
    ],
    image: "assets/type_4.jpg",
    topImage: "assets/char_top_4.jpg",
    sheetImage: "assets/section5_combined_4.jpg",
    healingItem: "수집일지 & 거울의 성수",
    color: "심연의 바이올렛 (Abyssal Violet)",
    colorHex: "#8b5cf6",
    goodMatch: "1번 - 시간을 멈춘 시계공",
    badMatch: "2번 - 화살 잃은 큐피드"
  },
  5: {
    number: 5,
    name: "세상을 저장하는 방랑자",
    tagline: "흩어지는 세상의 조각을 기록하며 걷는 방랑자입니다. 조용하고 사색적이며, 사라질 것을 놓치지 않으려 합니다.",
    message: "기록은 사라져도,\n나는 잊히는 것들을 위해 오늘도 한 조각을 저장해.",
    riftTitle: "잃어버린 틈: ‘직접 살아본 순간’",
    narrative: [
      "방랑자는 모든 것을 기록합니다. 도시, 사람, 별자리, 사건, 이야기.",
      "그의 가방에는 수천 개의 병이 있고, 각각 하나의 기억이 들어 있습니다. 그런데 정작 자신의 기억을 담은 병은 없습니다.",
      "그는 세상을 이해하면 안전하다고 믿었습니다. 그래서 언제나 조금 떨어진 곳에서 관찰하고 기록했습니다.",
      "플레이어가 그의 세계를 지나며 발견하는 것은 비어 있는 저장병 하나입니다. 방랑자는 그것을 채우기 위해 또 다른 정보를 찾으려 하지만, 병은 아무것도 받아들이지 않습니다.",
      "정답은 기록이 아니라 직접 경험하는 것입니다.",
      "플레이어와 방랑자가 함께 처음 보는 새벽을 말없이 바라보는 순간, 병 안에 작은 빛이 생깁니다.",
      "“알아내지 않아도 기억할 수 있구나.”",
      "그가 되찾는 것은 지식이 아니라 나로서의 온전한 경험입니다."
    ],
    features: {
      personality: "과묵, 사색적, 진중함, 관찰력이 뛰어남.",
      likes: "지도, 렌턴, 메모리 병, 기록노트",
      characteristics: "잊힌 기억을 수집하고 작은 저장병에 보관한다. 조용하고 말수가 적다.",
      keywords: ["과묵", "사색", "관찰", "지혜"]
    },
    representativeItems: [
      { img: "assets/item_5_1.png", name: "기록봉", desc: "(지혜의 형태의 기록 도구)" },
      { img: "assets/item_5_2.png", name: "지도책", desc: "(여행과 기록을 위한 필수품)" },
      { img: "assets/item_5_3.png", name: "저장병", desc: "(기억을 담는 유리 병)" },
      { img: "assets/item_5_4.png", name: "랜턴", desc: "(기억의 잔상을 비추는 빛)" }
    ],
    image: "assets/type_5.jpg",
    topImage: "assets/char_top_5.jpg",
    sheetImage: "assets/section5_combined_5.jpg",
    healingItem: "기록 렌턴 & 지수 저장병",
    color: "미드나잇 다크 인디고 (Dark Indigo)",
    colorHex: "#312e81",
    goodMatch: "8번 - 갑옷을 벗지 않는 기사",
    badMatch: "2번 - 화살 잃은 큐피드"
  },
  6: {
    number: 6,
    name: "답을 기다리는 예언자",
    tagline: "불확실한 미래 속에서, 확인의 징조를 기다리는 예언자",
    message: "별은 침묵 속에서 말하고,\n나는 그 침묵을 해석할 뿐이야.\n답이 올 때까지, 나는 이 자리에서 깨어 있을 거야.",
    riftTitle: "잃어버린 틈: ‘확신 없어도 내딛는 한 걸음’",
    narrative: [
      "예언자의 세계에는 수천 개의 표지판이 있습니다.\n\n위험. 조심. 돌아가시오. 확인되지 않음.",
      "그는 미래를 읽을 수 있지만, 이상하게도 자신의 미래만 볼 수 없습니다. 그래서 더 많은 징조를 찾고, 더 많은 가능성을 계산합니다.",
      "그의 틈 깊숙한 곳에는 두 갈래 길이 있습니다. 어느 쪽에도 표지판이 없습니다. 예언자는 그 앞에서 오랫동안 움직이지 못했습니다.",
      "플레이어가 아무리 단서를 모아도 정답은 나오지 않습니다. 결국 플레이어가 먼저 아무 길이나 선택해야 합니다.",
      "그리고 놀랍게도 두 길 모두 같은 장소로 이어집니다.",
      "예언자가 묻습니다.\n\n“정답을 알아야만 걸을 수 있는 건 아니었어?”",
      "그가 되찾는 것은 확신이 아니라 자기 신뢰입니다."
    ],
    features: {
      personality: "신중하고 예민하며, 확신이 서야 움직입니다.",
      likes: "징조, 별자리, 등불, 안전한 약속",
      characteristics: "답을 주는 표식을 기다리며, 미래의 위험을 먼저 살펴봅니다.",
      keywords: ["신중함", "기다림", "징조", "예지", "불확실성"]
    },
    representativeItems: [
      { img: "assets/item_6_1.png", name: "약속의 봉", desc: "(인연과 약속을 이어주는 신비한 봉)" },
      { img: "assets/item_6_2.png", name: "예언서", desc: "(별과 창조의 기록)" },
      { img: "assets/item_6_3.png", name: "점성구", desc: "(별빛을 비추는 구)" },
      { img: "assets/item_6_4.png", name: "천문도", desc: "(별의 운행도)" }
    ],
    image: "assets/type_6.jpg",
    topImage: "assets/char_top_6.jpg",
    sheetImage: "assets/section5_combined_6.jpg",
    healingItem: "별의 지팡이 & 예언서 (스스로를 믿는 나침반)",
    color: "미드나잇 프라페 퍼플 (Midnight Prophet Purple)",
    colorHex: "#1e1b4b",
    goodMatch: "3번 - 끝없이 달리는 소녀",
    badMatch: "7번 - 웃지 않는 광대"
  },
  7: {
    number: 7,
    name: "웃지 않는 광대",
    tagline: "웃지 않는 표정 속에 슬픈 감정을 숨긴 광대입니다.",
    message: "사람들은 내 농담을 기억하지만,\n나는 웃음이 멈춘 뒤의 침묵을 더 오래 기억해.",
    riftTitle: "잃어버린 틈: ‘슬퍼할 수 있는 자리’",
    narrative: [
      "광대의 서커스에서는 공연이 절대로 끝나지 않습니다. 음악이 멈추면 더 큰 음악이 시작되고, 관객이 떠나면 새로운 관객이 들어옵니다.",
      "광대는 계속 새로운 놀이를 만들어냅니다. 왜냐하면 무대가 조용해지는 순간, 오래전 잃어버린 누군가의 목소리가 들리기 때문입니다. 그래서 그는 웃지 않으면서도 계속 웃기는 광대가 되었습니다.",
      "플레이어의 임무는 공연을 성공시키는 것이 아닙니다. 하나씩 조명을 끄고, 음악을 멈추고, 관객을 돌려보냅니다.",
      "마지막에는 텅 빈 무대에 광대 혼자 남습니다. 그리고 처음으로 웁니다.",
      "그 순간, 색을 잃었던 서커스 천막에 아주 작은 색 하나가 돌아옵니다.",
      "“슬픈 것도… 끝까지 느끼면 지나가는구나.”",
      "그가 되찾는 것은 웃음이 아니라 슬픔을 마주할 용기입니다."
    ],
    features: {
      personality: "무대 위에서는 완벽한 광대. 하지만 조용해지면 외로움과 상처를 마주해요.",
      likes: "풍선, 조용한 밤, 아이의 웃음",
      characteristics: "무대 뒤의 어둠 속에서 혼자 감정을 다스려요.",
      keywords: ["열정", "모험", "즐거움", "무대의 어둠"]
    },
    representativeItems: [
      { img: "assets/item_7_1.png", name: "빨간 풍선", desc: "(유일한 친구)" },
      { img: "assets/item_7_2.png", name: "서커스 티켓", desc: "(붉고 찬란한 무대 위의 기억)" },
      { img: "assets/item_7_3.png", name: "오일 랜턴", desc: "(무대 뒤 유일한 빛)" },
      { img: "assets/item_7_4.png", name: "광대 가면", desc: "(웃음을 위한 가면)" }
    ],
    image: "assets/type_7.jpg",
    topImage: "assets/char_top_7.jpg",
    sheetImage: "assets/section5_combined_7.jpg",
    healingItem: "오일 렌턴 & 조용한 광대 가면",
    color: "카니발 골드 옐로우 (Carnival Gold Yellow)",
    colorHex: "#eab308",
    goodMatch: "1번 - 시간을 멈춘 시계공",
    badMatch: "6번 - 답을 기다리는 예언자"
  },
  8: {
    number: 8,
    name: "갑옷을 벗지 않는 기사",
    tagline: "상처 난 마음을 갑옷 속에 숨긴 기사입니다.",
    message: "벗지 않는 건 갑옷만이 아니야.\n나를 지키는 방식도, 내 사람들을 지키는 맹세도.",
    riftTitle: "잃어버린 틈: ‘드러내도 되는 나’",
    narrative: [
      "기사는 늘 성문의 가장 앞에 서 있습니다. 그의 세계에는 끊임없이 적이 몰려옵니다. 쓰러뜨려도 또 나타납니다.",
      "플레이어는 처음에는 적을 모두 처치해야 한다고 생각합니다. 하지만 적들은 사실 기사가 스스로 만들어낸 그림자입니다. “내가 약해지면 모두가 다친다.” 그 믿음이 계속 적을 만들어냅니다.",
      "성 안 깊숙한 방에는 아주 작은 갑옷 하나가 있습니다. 어린 시절의 기사에게 맞는 크기입니다. 그 옆에는 칼이 아니라 누구에게도 도움을 청하지 못한 기억이 놓여 있습니다.",
      "최종 전투에서 플레이어는 기사와 함께 싸우는 것이 아니라, 기사 앞에 서야 합니다. 처음으로 누군가가 그를 지켜줍니다.",
      "기사는 한 조각씩 갑옷을 내려놓습니다.\n\n“내가 뒤에 있어도… 세상이 무너지지 않는구나.”",
      "그가 되찾는 것은 힘이 아니라 나의 약함도 받아들일 수 있는 신뢰입니다."
    ],
    features: {
      personality: "강인하고 결단력이 있지만, 약한 모습을 보이지 않아요. 묵묵하고 책임감이 강함.",
      likes: "검, 맹세, 승부, 새벽",
      characteristics: "갑옷 안의 상처는 드러내지 않아요. 누구보다 앞에서 싸웁니다.",
      keywords: ["강인함", "보호", "용기", "신뢰"]
    },
    representativeItems: [
      { img: "assets/item_8_1.png", name: "성검", desc: "(정의와 전봉하는 검)" },
      { img: "assets/item_8_2.png", name: "율법서", desc: "(모든 규율과 법령이 기록된 책)" },
      { img: "assets/item_8_3.png", name: "강철문 위장", desc: "(규율과 기사단의 상징)" },
      { img: "assets/item_8_4.png", name: "성수", desc: "(죄악을 정화하고 싸움을 격세팅)" }
    ],
    image: "assets/type_8.jpg",
    topImage: "assets/char_top_8.jpg",
    sheetImage: "assets/section5_combined_8.jpg",
    healingItem: "성검 & 강철의 위장 (갑옷을 내려놓는 신뢰)",
    color: "임페리얼 다크 레드 (Imperial Dark Red)",
    colorHex: "#b91c1c",
    goodMatch: "2번 - 화살 잃은 큐피드",
    badMatch: "5번 - 세상을 저장하는 방랑자"
  },
  9: {
    number: 9,
    name: "잠든 거인",
    tagline: "깊은 잠에 빠진 거인을 지키는 외로운 소년입니다.",
    message: "세상이 잠시 조용해지면 좋겠어.\n거인의 꿈도, 내 마음도 그 안에서 쉬고 있으니까.",
    riftTitle: "잃어버린 틈: ‘내가 원하는 것’",
    narrative: [
      "거인의 세계는 평화롭습니다. 전쟁도 없고, 소음도 없고, 갈등도 없습니다. 하지만 아무것도 움직이지 않습니다. 바람도 불지 않고, 물도 흐르지 않습니다.",
      "왜냐하면 거인은 언제나 다른 사람들이 원하는 방향으로만 움직였기 때문입니다. 결국 어느 순간부터 아무것도 선택하지 않는 것이 가장 편해졌습니다.",
      "플레이어는 거인을 깨워야 하지만 아무리 소리쳐도 일어나지 않습니다. 산 정상에 도착하면 작은 씨앗 하나가 있습니다. 거인이 아주 오래전 심으려다가 포기한 씨앗입니다.",
      "“어디에 심을까?” 누군가 묻자 그는 늘 말했습니다. “아무 데나. 어디든 좋아”",
      "플레이어가 씨앗을 거인에게 돌려줍니다. 그리고 처음으로 거인이 말합니다.\n\n“나는… 저 언덕에 심고 싶어.”",
      "그 순간 바람이 불기 시작합니다. 그가 되찾는 것은 활력이 아니라 스스로가 선택인 자기 의지입니다."
    ],
    features: {
      personality: "조용하고 따뜻하며, 다툼보다 평화를 원해요.",
      likes: "자연, 돌, 별, 잔잔한 노래",
      characteristics: "외롭지만, 자연과 거인에게 깊은 애정을 가진 소년.",
      keywords: ["평화", "고요", "자연과의 공존", "소망"]
    },
    representativeItems: [
      { img: "assets/item_9_1.png", name: "장가지", desc: "(자연과 소통하기 위한 지팡이)" },
      { img: "assets/item_9_2.png", name: "기록서", desc: "(거인의 역사와 자연의 기록)" },
      { img: "assets/item_9_3.png", name: "등불", desc: "(빛과 어둠을 밝히는 신뢰의 빛)" },
      { img: "assets/item_9_4.png", name: "성수", desc: "(거인의 숲을 정화하게 지키는 성수)" }
    ],
    image: "assets/type_9.jpg",
    topImage: "assets/char_top_9.jpg",
    sheetImage: "assets/section5_combined_9.jpg",
    healingItem: "자연의 잔가지 지팡이 & 성수",
    color: "포레스트 모스 그린 (Forest Moss Green)",
    colorHex: "#059669",
    goodMatch: "9번 - 잠든 거인",
    badMatch: "3번 - 끝없이 달리는 소녀"
  }
};

// --- Story Sequence Script (Intro) ---
const introStory = [
  "평온하게 흐르던 바쁜 삶 속에서, 문득 발밑이 아득하게 허물어지는 기분을 느껴본 적이 있나요?",
  "우리는 살아가며 마음에 크고 작은 부딪힘을 겪고, 그 자리에는 나만의 어두운 '틈(결핍)'이 생겨납니다.",
  "그 틈새로 시린 바람이 불어올 때면, 우리는 왠지 모를 불안함이나 우울함으로 헤매이곤 하지요.",
  "이제, 밤하늘 아래 타오르는 고요한 모닥불 앞에 마주 앉아 당신 내면의 틈을 들여다볼 시간입니다.",
  "여정을 떠나기 전에, 영혼 관찰부 기록서에 당신의 흔적을 먼저 남겨주세요."
];

// --- App State ---
let storyPageIndex = 0;
let quizPageIndex = 0;
let testerInfo = null;
let answers = {}; // Key: Question ID, Value: 1, 2, 3, or 4 points



let isTyping = false;
let typingTimer = null;
let finalSortedTypes = [];
let finalPercentages = {};
let finalTypeScores = {};

// --- DOM Elements ---
const audioControl = document.getElementById('audioControl');
const screenStory = document.getElementById('screen-story');
const screenForm = document.getElementById('screen-form');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');

const storySystemText = document.getElementById('story-system-text');
const storySystemBox = document.getElementById('story-system-box');

// Form inputs
const betaName = document.getElementById('beta-name');
const betaAge = document.getElementById('beta-age');
const betaJob = document.getElementById('beta-job');
const betaContact = document.getElementById('beta-contact');
const betaAgree = document.getElementById('beta-agree');
const btnStartQuiz = document.getElementById('btn-start-quiz');

// Quiz elements
const quizSystemBox = document.getElementById('quiz-system-box');
const quizSystemText = document.getElementById('quiz-system-text');
const dialogNextIndicator = document.getElementById('dialog-next-indicator');
const quizCard = document.getElementById('quiz-card');
const questionsContainer = document.getElementById('questions-container');
const btnNextPage = document.getElementById('btn-next-page');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const progressCharacter = document.getElementById('progress-character');

// Result elements
const resultBadge = document.getElementById('result-badge');
const resultNpcName = document.getElementById('result-npc-name');
const resultTagline = document.getElementById('result-tagline');
const resultDescription = document.getElementById('result-description');
const top3List = document.getElementById('top3-list');
const statBarsContainer = document.getElementById('stat-bars-container');
const resultItem = document.getElementById('result-item');
const resultInteraction = document.getElementById('result-interaction');
const btnSubmit = document.getElementById('btn-submit');
const btnDetails = document.getElementById('btn-details');
const screenDetails = document.getElementById('screen-details');
const detailsStatBarsContainer = document.getElementById('details-stat-bars-container');
const btnRestart = document.getElementById('btn-restart');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  setupAudioToggle();
  startStorySequence();
  setupFormValidation();
  setupGlowCursor();
});

// --- Cursor Setup ---
function setupGlowCursor() {
  const cursor = document.getElementById('glow-cursor');
  if (!cursor) return;
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Optional interactive effects
  document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.8)');
  document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
}

// --- Sound setup ---
function setupAudioToggle() {
  audioControl.addEventListener('click', () => {
    const isMuted = sound.toggleMute();
    if (isMuted) {
      audioControl.classList.add('muted');
      audioControl.querySelector('.audio-icon').textContent = '🔇';
    } else {
      audioControl.classList.remove('muted');
      audioControl.querySelector('.audio-icon').textContent = '🔊';
      sound.init();
    }
  });
}

// --- Dynamic Text Typewriter Effect ---
function typeText(element, text, callback) {
  element.textContent = '';
  isTyping = true;
  let index = 0;
  
  if (typingTimer) clearInterval(typingTimer);
  
  typingTimer = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      sound.playTyping();
      index++;
    } else {
      clearInterval(typingTimer);
      isTyping = false;
      if (callback) callback();
    }
  }, 25); // typing speed
}

function skipTyping(element, text, callback) {
  clearInterval(typingTimer);
  element.textContent = text;
  isTyping = false;
  if (callback) callback();
}

// --- New Intro Flow ---
const newIntroStory = [
  "당신은 알 수 없는 소용돌이에 휩쓸려\n낯선 마을에 떨어졌습니다...",
  "이 낯선 마을의 주민들은 모두 마음속에\n저마다의 '틈'을 안고 살아갑니다.",
  "이 마을에는 모두 각자 '틈'이 하나씩 있고\n이곳에 온 모든 이는 '틈'을 가지게 됩니다.",
  "이제 당신의 내면에\n어떤 틈이 숨겨져 있는지 알아볼 시간입니다."
];
let newStoryIndex = 0;

function startStorySequence() {
  const screenIntro = document.getElementById('screen-intro');
  const introText = document.getElementById('intro-text');
  const screenLoading = document.getElementById('screen-loading');
  
  if(screenIntro) {
    screenIntro.addEventListener('click', () => {
      sound.playConfirm();
      document.getElementById('loading-text').innerHTML = '틈의 세계로 접속중<span class="dots-anim"></span>';
      transitionScreen(screenIntro, screenLoading);
      setTimeout(() => {
        transitionScreen(screenLoading, screenStory);
        newStoryIndex = 0;
        playStorySequence();
      }, 3000);
    }, { once: true });
  } else {
    playStorySequence();
  }
}

function playCustomStory(storyArray, onComplete) {
  let currentIndex = 0;
  
  // Re-fetch in case it was cloned before
  let currentBox = document.getElementById('story-system-box');
  const clone = currentBox.cloneNode(true);
  currentBox.parentNode.replaceChild(clone, currentBox);
  
  const newSystemBox = clone;
  const newSystemText = newSystemBox.querySelector('.system-text');
  
  function playStep() {
    if (currentIndex >= storyArray.length) {
      if (onComplete) onComplete();
      return;
    }
    
    const storyText = storyArray[currentIndex];
    
    const clickHandler = () => {
      if (isTyping) {
        skipTyping(newSystemText, storyText, () => {});
      } else {
        sound.playClick();
        newSystemBox.removeEventListener('click', clickHandler);
        currentIndex++;
        playStep();
      }
    };
    
    newSystemBox.addEventListener('click', clickHandler);
    typeText(newSystemText, storyText, () => {});
  }
  
  playStep();
}

function playStorySequence() {
  playCustomStory(newIntroStory, () => {
    transitionToLoading();
  });
}

function transitionToLoading() {
  sound.playConfirm();
  const screenLoading = document.getElementById('screen-loading');
  document.getElementById('loading-text').innerHTML = '접속중<span class="dots-anim"></span>';
  transitionScreen(screenStory, screenLoading);
  
  // Wait 3 seconds for fake loading, then go to form
  setTimeout(() => {
    transitionScreen(screenLoading, screenForm);
  }, 3000);
}

// Helper to transition screens cleanly
function transitionScreen(from, to) {
  if (!from) {
    from = document.querySelector('.screen.active');
  }
  if (from === to) return;
  
  if (from) {
    from.style.display = 'block'; // Keep display block explicitly so it fades out
    from.classList.remove('active');
    setTimeout(() => {
      from.style.display = 'none';
      showTo();
    }, 400);
  } else {
    showTo();
  }

  function showTo() {
    to.style.display = 'block';
    setTimeout(() => {
      to.classList.add('active');
    }, 50);
  }
}

// --- 1. Form validation sheet ---
function setupFormValidation() {
  const fields = [betaName, betaAge, betaJob, betaContact];
  const validate = () => {
    const allFilled = fields.every(input => input.value.trim() !== '');
    const agreed = betaAgree.checked;
    
    if (allFilled && agreed) {
      btnStartQuiz.disabled = false;
      btnStartQuiz.classList.remove('btn-disabled');
    } else {
      btnStartQuiz.disabled = true;
      btnStartQuiz.classList.add('btn-disabled');
    }
  };

  fields.forEach(f => f.addEventListener('input', validate));
  betaAgree.addEventListener('change', validate);

  btnStartQuiz.addEventListener('click', () => {
    if (btnStartQuiz.disabled) return;
    btnStartQuiz.disabled = true; // prevent double clicks
    sound.playConfirm();
    
    testerInfo = {
      name: betaName.value.trim(),
      age: betaAge.value.trim(),
      job: betaJob.value.trim(),
      contact: betaContact.value.trim()
    };
    
    startQuiz();
  });
}

// --- 2. Quiz Logic ---
let quizStepState = 'typing'; // typing -> waiting_click -> question

function startQuiz() {
  quizPageIndex = 0;
  answers = {};
  loadQuizPage();
}

function loadQuizPage() {
  btnNextPage.disabled = true;
  btnNextPage.classList.add('btn-disabled');
  
  // Progress Bar tracking (only count question pages)
  const questionPagesTotal = quizPages.filter(p => !p.isChapter).length;
  const currentQuestionPageCount = quizPages.slice(0, quizPageIndex).filter(p => !p.isChapter).length;
  
  const progressRatio = currentQuestionPageCount / questionPagesTotal;
  const percentage = progressRatio * 100;
  progressBar.style.width = `${percentage}%`;
  
  // Display current question page (e.g. 1 / 18), but cap it smoothly
  progressText.textContent = `${Math.max(1, currentQuestionPageCount + (quizPages[quizPageIndex].isChapter ? 0 : 1))} / ${questionPagesTotal}`;
  
  progressCharacter.style.left = `${percentage}%`;
  document.documentElement.style.setProperty('--progress-ratio', progressRatio);

  const currentPage = quizPages[quizPageIndex];
  const dialogWrapper = document.querySelector('#screen-quiz .dialog-wrapper');
  
  if (currentPage.isChapter) {
    // Show Chapter Screen Unfurl
    const screenChapter = document.getElementById('screen-chapter');
    const chapterTitle = document.getElementById('chapter-title');
    const chapterDesc = document.getElementById('chapter-desc');
    
    chapterTitle.textContent = currentPage.title;
    chapterDesc.textContent = currentPage.text;
    
    // Hide quiz card, show chapter screen
    quizCard.style.display = 'none';
    if (dialogWrapper) dialogWrapper.style.display = 'none';
    
    // 3-second gap before showing chapter banner
    const screenLoading = document.getElementById('screen-loading');
    document.getElementById('loading-text').innerHTML = '접속중<span class="dots-anim"></span>';
    transitionScreen(null, screenLoading);
    
    const scrollContainer = document.getElementById('chapter-scroll');
    scrollContainer.style.animation = 'none'; // reset while hidden
    
    setTimeout(() => {
      scrollContainer.offsetHeight; // trigger reflow
      scrollContainer.style.animation = 'unfurlScroll 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards';
      transitionScreen(screenLoading, screenChapter);
    }, 3000);
    
    const proceedClick = () => {
      scrollContainer.removeEventListener('click', proceedClick);
      sound.playClick();
      
      progressCharacter.classList.add('walking');
      setTimeout(() => {
        progressCharacter.classList.remove('walking');
      }, 450);

      if (currentPage.story) {
        transitionScreen(screenChapter, screenStory);
        playCustomStory(currentPage.story, () => {
          quizPageIndex++;
          transitionScreen(null, screenQuiz);
          loadQuizPage();
        });
      } else {
        quizPageIndex++;
        transitionScreen(null, screenQuiz);
        loadQuizPage();
      }
    };
    
    scrollContainer.addEventListener('click', proceedClick);
    
  } else {
    // Hide the dialog completely and show questions immediately
    if (dialogWrapper) {
      dialogWrapper.style.display = 'none';
    }

    quizStepState = 'question';
    renderQuestions();
    quizCard.style.display = 'block';
  }
}

function renderQuestions() {
  questionsContainer.innerHTML = '';
  const currentQuestions = quizPages[quizPageIndex].questions;
  
  currentQuestions.forEach((q, idx) => {
    const qIndex = q.localNum;
    const block = document.createElement('div');
    block.className = 'question-block';
    block.innerHTML = `
      <div class="question-text">
        <strong>Q${qIndex}.</strong> ${q.text}
      </div>
      <div class="options-row" id="options-row-${q.id}">
        <label class="option-label" data-value="1" data-qid="${q.id}">
          <input type="radio" name="q-${q.id}" value="1">
          <span class="pixel-font">전혀 그렇지 않다</span>
        </label>
        <label class="option-label" data-value="2" data-qid="${q.id}">
          <input type="radio" name="q-${q.id}" value="2">
          <span class="pixel-font">약간 그렇지 않다</span>
        </label>
        <label class="option-label" data-value="3" data-qid="${q.id}">
          <input type="radio" name="q-${q.id}" value="3">
          <span class="pixel-font">약간 그렇다</span>
        </label>
        <label class="option-label" data-value="4" data-qid="${q.id}">
          <input type="radio" name="q-${q.id}" value="4">
          <span class="pixel-font">매우 그렇다</span>
        </label>
      </div>
    `;

    // Radio click listener
    const labels = block.querySelectorAll('.option-label');
    labels.forEach(label => {
      label.addEventListener('click', () => {
        sound.playClick();
        
        // Remove selection highlights
        labels.forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
        
        const qid = label.dataset.qid;
        const val = parseInt(label.dataset.value);
        answers[qid] = val;
        
        checkPageCompletion();
      });
    });

    questionsContainer.appendChild(block);
  });
}

function checkPageCompletion() {
  const currentQuestions = quizPages[quizPageIndex].questions;
  const allAnswered = currentQuestions.every(q => answers[q.id] !== undefined);
  
  if (allAnswered) {
    btnNextPage.disabled = false;
    btnNextPage.classList.remove('btn-disabled');
  }
}

// Next Page action
btnNextPage.addEventListener('click', () => {
  if (btnNextPage.disabled) return;
  
  sound.playConfirm();
  
  // Character walk bounce styling
  progressCharacter.classList.add('walking');
  setTimeout(() => {
    progressCharacter.classList.remove('walking');
  }, 450);

  quizPageIndex++;
  if (quizPageIndex < quizPages.length) {
    window.scrollTo(0,0);
    loadQuizPage();
  } else {
    // Complete test, show results
    calculateResults();
  }
});

// --- 3. Results Calculation & Rendering ---
function mapScore(rating) {
  if (rating === 1) return 1;
  if (rating === 2) return 2;
  if (rating === 3) return 4; // 加算 (3->4)
  if (rating === 4) return 5; // 加算 (4->5)
  return 0;
}

function calculateResults() {
  sound.playSuccess();

  // 1. Calculate raw score sums for each of the 9 types
  let typeScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  
  Object.keys(answers).forEach(qid => {
    const type = parseInt(qid.split('-')[0]);
    const scoreVal = mapScore(answers[qid]);
    typeScores[type] += scoreVal;
  });

  // 2. Normalization for Type 9 (Type 9 has 8 questions, others have 10)
  const originalType9Raw = typeScores[9];
  typeScores[9] = Math.round(originalType9Raw * 1.25 * 10) / 10; // Multiply by 1.25, round to 1 decimal place

  // 3. Scale scores out of 100 for better chart display (max possible normalized score is 50)
  // Max score for types is 50. Convert to percentage: score * 2
  let percentages = {};
  for (let t = 1; t <= 9; t++) {
    percentages[t] = Math.min(100, Math.round((typeScores[t] / 50) * 100));
  }

  // 4. Sort and find Top 3 types
  const sortedTypes = Object.keys(typeScores)
    .map(type => ({ type: parseInt(type), score: typeScores[type] }))
    .sort((a, b) => b.score - a.score);

  finalSortedTypes = sortedTypes;
  finalPercentages = percentages;
  finalTypeScores = typeScores;

  const top1 = sortedTypes[0].type;
  const top2 = sortedTypes[1].type;
  const top3 = sortedTypes[2].type;

  // 5. Render result DOM elements
  const primaryNPC = archetypes[top1];
  
  // 1. 맨 위 에니어 캐릭터 사진 (파란색 박스에서 글씨 제외된 깨끗한 사진)
  const resultTopImage = document.getElementById('result-top-image');
  if (resultTopImage) {
    resultTopImage.src = `assets/char_top_clean_${top1}.jpg`;
  }

  // 2. Name & 3. Tagline
  const resultNpcName = document.getElementById('result-npc-name');
  const resultTagline = document.getElementById('result-tagline');
  resultNpcName.textContent = primaryNPC.name;
  resultTagline.textContent = primaryNPC.tagline;

  // 4. Representative Message
  const resultMessage = document.getElementById('result-message');
  resultMessage.textContent = `"${primaryNPC.message}"`;

  // 5. Rift Title & Narrative & Features
  const resultRiftTitle = document.getElementById('result-rift-title');
  const resultNarrativeBody = document.getElementById('result-narrative-body');
  const resultFeaturesContent = document.getElementById('result-features-content');

  resultRiftTitle.textContent = primaryNPC.riftTitle;

  // Render narrative paragraphs
  if (Array.isArray(primaryNPC.narrative)) {
    resultNarrativeBody.innerHTML = primaryNPC.narrative
      .map(p => `<p style="margin-bottom: 14px;">${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
  } else {
    resultNarrativeBody.innerHTML = `<p>${primaryNPC.narrative}</p>`;
  }

  // Render features list
  if (primaryNPC.features) {
    const f = primaryNPC.features;
    let featuresHTML = `<ul style="list-style: none; padding: 0; margin: 0; line-height: 1.7; font-size: 15px;">`;
    if (f.personality) featuresHTML += `<li style="margin-bottom: 6px;">• <strong>성격:</strong> ${f.personality}</li>`;
    if (f.likes) featuresHTML += `<li style="margin-bottom: 6px;">• <strong>좋아하는 것:</strong> ${f.likes}</li>`;
    if (f.characteristics) featuresHTML += `<li style="margin-bottom: 6px;">• <strong>특징:</strong> ${f.characteristics}</li>`;
    if (f.keywords && f.keywords.length > 0) featuresHTML += `<li style="margin-bottom: 6px;">• <strong>키워드:</strong> ${f.keywords.join(', ')}</li>`;
    featuresHTML += `</ul>`;
    resultFeaturesContent.innerHTML = featuresHTML;
  }

  // 6. 삼면도 선딴 cutout 이미지 3종 (정면, 측면, 후면)
  const frontImg = document.getElementById('turnaround-front-img');
  const sideImg = document.getElementById('turnaround-side-img');
  const backImg = document.getElementById('turnaround-back-img');
  
  if (frontImg) frontImg.src = `assets/turnaround_front_${top1}.png`;
  if (sideImg) sideImg.src = `assets/turnaround_side_${top1}.png`;
  if (backImg) backImg.src = `assets/turnaround_back_${top1}.png`;

  // 7. 삼면도 밑 선딴 대표 아이템 렌더링 (동적 아이템 목록 + 설명)
  const itemsContainer = document.getElementById('items-cutout-container');
  if (itemsContainer) {
    itemsContainer.innerHTML = '';
    const itemsList = primaryNPC.representativeItems || [
      { img: `assets/item_${top1}_1.png`, name: '대표 아이템 1', desc: '' },
      { img: `assets/item_${top1}_2.png`, name: '대표 아이템 2', desc: '' }
    ];
    
    itemsList.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'item-cutout-box';
      itemEl.innerHTML = `
        <div class="item-img-wrap">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="item-name pixel-font">${item.name}</div>
        ${item.desc ? `<div class="item-desc pixel-font">${item.desc}</div>` : ''}
      `;
      itemsContainer.appendChild(itemEl);
    });
  }

  // 8. 4-Grid Blocks
  document.getElementById('grid-item-healing').textContent = primaryNPC.healingItem;
  document.getElementById('color-name').textContent = primaryNPC.color;
  document.getElementById('color-dot').style.backgroundColor = primaryNPC.colorHex || '#c084fc';
  document.getElementById('grid-item-good').textContent = primaryNPC.goodMatch;
  document.getElementById('grid-item-bad').textContent = primaryNPC.badMatch;

  // Move Character and Bar to 100%
  progressBar.style.width = '100%';
  progressText.textContent = `${quizPages.length} / ${quizPages.length}`;
  progressCharacter.style.left = '100%';
  document.documentElement.style.setProperty('--progress-ratio', 1);

  transitionScreen(screenQuiz, screenResult);
}

// --- Submit form event (Database 저장) ---
if (btnSubmit) {
  btnSubmit.addEventListener('click', () => {
    sound.playSuccess();
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '데이터베이스에 저장 중...';
    btnSubmit.style.background = '#4b5563';
    btnSubmit.style.boxShadow = 'none';

    // Build result record payload
    const record = {
      id: 'result_' + Date.now(),
      tester: testerInfo || { name: '방랑자', age: '', job: '', contact: '' },
      primaryType: finalSortedTypes[0] ? {
        number: finalSortedTypes[0].type,
        name: archetypes[finalSortedTypes[0].type].name
      } : null,
      top3: finalSortedTypes.slice(0, 3).map(item => ({
        type: item.type,
        name: archetypes[item.type].name,
        score: finalTypeScores[item.type],
        percentage: finalPercentages[item.type]
      })),
      scores: finalTypeScores,
      percentages: finalPercentages,
      answers: answers,
      createdAt: new Date().toISOString()
    };

    // 1. Save to localStorage database
    try {
      const existingDb = JSON.parse(localStorage.getItem('enneagram_results_db') || '[]');
      existingDb.push(record);
      localStorage.setItem('enneagram_results_db', JSON.stringify(existingDb));
    } catch (err) {
      console.error('LocalStorage save error:', err);
    }

    // 2. Simulated DB latency for smooth feedback
    setTimeout(() => {
      btnSubmit.innerHTML = '✓ 데이터베이스 제출 완료';
      btnSubmit.style.background = '#15803d'; // Rich green
      btnSubmit.style.color = '#fff';
      btnSubmit.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.4)';
      
      alert(`[기록 보관 완료]\n방랑자 ${record.tester.name}님의 검사 결과가 데이터베이스에 안전하게 저장되었습니다.`);
    }, 600);
  });
}

// --- Details Event (Optional fallback) ---
if (btnDetails) {
  btnDetails.addEventListener('click', () => {
    sound.playConfirm();
    
    if (detailsStatBarsContainer) {
      detailsStatBarsContainer.innerHTML = '';
      finalSortedTypes.forEach((item) => {
        const t = item.type;
        const scoreVal = finalTypeScores[t];
        const pct = finalPercentages[t];
        const isDominant = (t === finalSortedTypes[0].type);
        const labelName = archetypes[t].name;
        const barItem = document.createElement('div');
        barItem.className = `stat-item ${isDominant ? 'dominant' : ''}`;
        
        barItem.innerHTML = `
          <div class="stat-header">
            <span class="stat-label-text">${t}번. ${labelName}</span>
            <span class="stat-value">${scoreVal}점</span>
          </div>
          <div class="stat-bar-outer">
            <div class="stat-bar-inner" style="width: 0%;"></div>
          </div>
        `;
        
        detailsStatBarsContainer.appendChild(barItem);
        
        setTimeout(() => {
          const innerBar = barItem.querySelector('.stat-bar-inner');
          if (innerBar) innerBar.style.width = `${pct}%`;
        }, 150);
      });
    }
    
    transitionScreen(screenResult, screenDetails);
  });
}

// --- Close Details Event ---
const btnClose = document.getElementById('btn-close');
if (btnClose) {
  btnClose.addEventListener('click', () => {
    sound.playClick();
    transitionScreen(screenDetails, screenResult);
  });
}

// --- Restart Event (처음 start 화면으로 복귀) ---
if (btnRestart) {
  btnRestart.addEventListener('click', () => {
    sound.playConfirm();
    
    // Clear inputs
    if (betaName) betaName.value = '';
    if (betaAge) betaAge.value = '';
    if (betaJob) betaJob.value = '';
    if (betaContact) betaContact.value = '';
    if (betaAgree) betaAgree.checked = false;
    if (btnStartQuiz) {
      btnStartQuiz.disabled = true;
      btnStartQuiz.classList.add('btn-disabled');
    }

    // Reset test state
    answers = {};
    quizPageIndex = 0;
    storyPageIndex = 0;
    testerInfo = null;

    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '제출하기';
      btnSubmit.style.background = '';
      btnSubmit.style.boxShadow = '';
      btnSubmit.style.color = '';
    }

    // Reset progress bar
    if (progressBar) progressBar.style.width = '0%';
    if (progressCharacter) progressCharacter.style.left = '0%';
    document.documentElement.style.setProperty('--progress-ratio', 0);

    // Return to screen-intro (Start Screen)
    const screenIntro = document.getElementById('screen-intro');
    if (screenIntro) {
      transitionScreen(screenResult, screenIntro);
      startStorySequence();
    } else {
      transitionScreen(screenResult, screenStory);
      startStorySequence();
    }
  });
}
