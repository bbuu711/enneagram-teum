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
    name: "시간을 멈춘 시계공",
    tagline: "완벽 · 통제 · 질서 · 원칙주의",
    badge: "⏳",
    description: "당신은 어지러운 세상 속에서 한 치의 오차도 허용치 않으려 시간을 멈춘 채 시계를 조율하는 시계공입니다. 모든 톱니바퀴가 완벽하게 맞물려야만 안심하는 당신. 그러나 마음에 쌓이는 미세한 먼지조차 용납하지 못해, 스스로를 강박과 질서의 틀에 가두고 옥죄는 것은 아닌가요? 가끔은 시계가 멈추더라도 세상은 아름답게 흘러간다는 것을 인정할 때, 당신의 틈은 진정한 평안을 얻을 것입니다.",
    item: "수정 흔적이 없는 놋쇠 태엽",
    interaction: "째깍이는 초침 소리와 함께하는 긴장 해제 명상"
  },
  2: {
    name: "화살 잃은 큐피드",
    tagline: "헌신 · 보살핌 · 인정욕구 · 사랑",
    badge: "💘",
    description: "당신은 항상 타인의 마음에 사랑과 치유의 화살을 쏘아왔지만, 정작 자신에게 쏠 화살은 잃어버린 큐피드입니다. 끊임없이 남을 돕고 보살피며 다른 이들의 기쁨에서 당신의 가치를 찾습니다. 그러나 정작 스스로가 지치고 아플 때는 아무에게도 기댈 곳이 없다며 쓸쓸해하곤 합니다. 이제는 잃어버린 화살을 찾아 다른 이가 아닌, 깊은 외로움에 놓인 당신 자신에게 그 사랑을 전해야 합니다.",
    item: "부러진 사랑의 화살깃",
    interaction: "거울 앞에 마주 앉아 스스로에게 건네는 따뜻한 한마디"
  },
  3: {
    name: "끝없이 달리는 소녀",
    tagline: "성공 · 효율 · 목표 · 성취주의",
    badge: "🏃‍♀️",
    description: "당신은 오직 '성공'과 '효율'이라는 결승선을 향해 쉬지 않고 트랙을 달리는 소녀입니다. 멈춰 서서 패배하거나 쓸모없는 사람이 되면 세상으로부터 사랑과 관심을 받지 못할 것이라 믿기에, 아픔조차 참아가며 달려갑니다. 그러나 원하는 것을 성취해도 가슴속 공허함은 완전히 가시지 않습니다. 가끔은 트랙 바깥 잔디밭에 누워 헐떡이는 숨을 고르고, 무언가를 성취해내지 않아도 당신 자체로 이미 충분히 사랑스럽다는 사실을 기억해주세요.",
    item: "다 닳아버린 황금 러닝슈즈",
    interaction: "목적지나 마감 시한이 없는 여유로운 정원 산책"
  },
  4: {
    name: "거울 수집가",
    tagline: "독특함 · 예술 · 우울 · 개인주의",
    badge: "🪞",
    description: "당신은 세상 사람들과는 전혀 다른 존재가 되길 원하며, 홀로 자신만의 방 안에서 온갖 종류의 감정과 거울들을 수집하고 있습니다. 거울에 자신을 비춰보며 나의 독특함과 내면의 깊은 우울을 확인하고 위로받으려 하지만, 그럴수록 주변과 닿지 않는 외딴섬이 되어버립니다. 아무도 나를 진정으로 이해해주지 못할 것이란 서글픈 믿음이 당신의 틈새입니다. 거울을 내려놓고 고요한 방의 문을 열 때, 비로소 세상의 다채로운 따스함과 연결될 수 있습니다.",
    item: "먼지가 뿌옇게 내려앉은 은빛 손거울",
    interaction: "종이에 적어 내려가는 혼자만의 솔직하고 잔잔한 독백"
  },
  5: {
    name: "세상을 저장하는 방랑자",
    tagline: "관찰 · 지식 · 이성 · 감정단절",
    badge: "🧭",
    description: "당신은 세상 속에 부딪히는 대신, 지식과 통찰력의 렌즈를 통해 세상을 안전한 거리에서 관찰하고 분석하는 방랑자입니다. 머리로 모든 일을 규명하고 예측하려 하며, 감정에 휘둘리거나 에너지가 고갈되어버리는 것을 극도로 불안해합니다. 그러나 지식만으로는 삶의 생동감을 느낄 수 없습니다. 관찰자 카메라는 잠시 넣어두고, 흘러가는 바람 속에 몸을 맡겨 가슴의 소리에 집중할 때 당신의 마음은 진정한 안식을 찾게 됩니다.",
    item: "낡은 분석 기록용 휴대 수첩과 연필",
    interaction: "창을 열고 조용히 밤하늘의 숨결과 온도 느끼기"
  },
  6: {
    name: "답을 기다리는 예언자",
    tagline: "안전 · 충성 · 불안 · 신중함",
    badge: "⏳",
    description: "당신은 위험 가득한 세상 속에서 자신을 든든하게 지켜줄 규칙이나 믿을 만한 지침, 확실한 답을 기다리는 예언자입니다. 모든 상황을 경계하고 두려워하기에 끊임없이 신중을 기하고 준비하지만, 그 신중함 때문에 결정적인 순간에도 늘 주저하며 불안을 짊어지고 살아갑니다. 당신이 갈망하는 확실한 구원과 답은 외부 세상이나 조직이 아닌, 이미 많은 걱정을 거치며 단단하게 영글어있는 당신의 자아 안에 존재합니다.",
    item: "철제 잠금 장치가 굳게 걸린 보안 나침반",
    interaction: "마음속 걱정거리들을 하나씩 종이에 적어 불태우기"
  },
  7: {
    name: "웃지 않는 광대",
    tagline: "즐거움 · 모험 · 불안회피 · 낙천주의",
    badge: "🎭",
    description: "당신은 모두에게 어린아이처럼 활기차고 다정한 미소를 보이지만, 실제 내면은 결코 웃지 않고 상처로 물들어 있는 광대입니다. 마음속 고통과 슬픔에 갇혀버리는 것이 두려워, 끊임없이 흥미롭고 자극적인 새로운 계획이나 경험을 찾아다니며 내달립니다. 화려한 연회가 끝나고 모두가 떠난 밤, 홀로 남았을 때 찾아오는 공허한 침묵이 바로 당신의 가장 넓은 틈새입니다. 가면을 조심히 벗어두고 차오르는 아픔을 외면하지 않고 따뜻하게 끌어안을 때, 비로소 참된 웃음을 가질 수 있습니다.",
    item: "화려하게 반짝이는 축제용 오색 가면",
    interaction: "가만히 눈을 감고 소리 없는 정적 속에서 5분간 숨쉬기"
  },
  8: {
    name: "갑옷을 벗지 않는 기사",
    tagline: "강함 · 지휘 · 통제 · 취약성회피",
    badge: "🛡️",
    description: "당신은 세상에 약한 모습을 보이는 즉시 공격당하고 지배당할 것이라는 생각에, 무겁고 견고한 강철 갑옷을 밤낮으로 벗지 않는 기사입니다. 주장이 강하며 사람들을 이끌어 통제권을 정하려 하지만, 가슴속에는 여전히 보살핌을 받고 싶어 하는 연약하고 순수한 어린아이가 숨어있습니다. 늘 지키기만 하는 싸움터에서 내려와, 온전히 당신의 한계를 인정하고 눈물을 흘려보낼 때 당신의 영혼은 오히려 가장 단단한 평안함을 덧입게 됩니다.",
    item: "검게 그을리고 긁힌 무쇠 흉갑",
    interaction: "무기를 모두 내려놓고 따뜻한 찻잔의 온기 깊이 들이마시기"
  },
  9: {
    name: "잠든 거인",
    tagline: "평화 · 조화 · 갈등회피 · 자기방치",
    badge: "💤",
    description: "당신은 갈등이나 싸움이 벌어져 다른 사람과의 소중한 인연이 끊어지고 홀로 남겨질까 두려워, 스스로의 소망과 분노를 깊이 잠재운 거인입니다. 평화로운 분위기를 위해 언제나 양보하며 순탄하고 낙천적으로 살아가지만, 이것은 당신 본연의 빛을 꺼버린 채 잠들어 있는 것과 같습니다. 이제는 억눌러왔던 당신의 존재감과 명확한 목소리를 들려줘야 합니다. 긴 잠에서 깨어나 '아니오'라고 말할 때, 마침내 진짜 튼튼한 평화의 싹이 돋아납니다.",
    item: "모래가 흐르지 않는 깨진 모래시계와 모포",
    interaction: "내일 있을 타인의 요구 중 하나를 단호하게 거절해보기"
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
  
  // Progress Bar tracking
  const progressRatio = quizPageIndex / quizPages.length;
  const percentage = progressRatio * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${quizPageIndex + 1} / ${quizPages.length}`;
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
    
    // Reset animation by re-adding the element
    const scrollContainer = document.getElementById('chapter-scroll');
    scrollContainer.style.animation = 'none';
    scrollContainer.offsetHeight; // trigger reflow
    scrollContainer.style.animation = 'unfurlScroll 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards';
    
    transitionScreen(null, screenChapter);
    
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
  
  const resultImage = document.getElementById('result-image');
  if (top1 >= 1 && top1 <= 9) {
    resultBadge.style.display = 'none';
    resultImage.style.display = 'block';
    resultImage.src = `assets/type${top1}.jpg`;
  } else {
    resultBadge.style.display = 'flex';
    resultImage.style.display = 'none';
    resultBadge.textContent = primaryNPC.badge;
  }
  
  resultNpcName.textContent = primaryNPC.name;
  resultTagline.textContent = `${primaryNPC.tagline}`;
  resultDescription.textContent = primaryNPC.description;
  resultItem.textContent = primaryNPC.item;
  resultInteraction.textContent = primaryNPC.interaction;

  // Render 9 Types Radar Chart using Chart.js
  const ctx = document.getElementById('radar-chart');
  if (ctx) {
    const labels = [];
    const dataPoints = [];
    
    for (let t = 1; t <= 9; t++) {
      labels.push(`${t}번`);
      dataPoints.push(percentages[t]);
    }
    
    if (window.radarChartInstance) {
      window.radarChartInstance.destroy();
    }
    
    window.radarChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '내면의 틈',
          data: dataPoints,
          backgroundColor: 'rgba(196, 161, 255, 0.2)',
          borderColor: 'rgba(196, 161, 255, 0.8)',
          pointBackgroundColor: 'rgba(196, 161, 255, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(196, 161, 255, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: {
              color: 'rgba(255, 255, 255, 0.8)',
              font: { size: 12, family: "'Noto Sans KR', sans-serif" }
            },
            ticks: {
              display: false,
              min: 0,
              max: 100
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Move Character and Bar to 100%
  progressBar.style.width = '100%';
  progressText.textContent = `${quizPages.length} / ${quizPages.length}`;
  progressCharacter.style.left = '100%';
  document.documentElement.style.setProperty('--progress-ratio', 1);

  transitionScreen(screenQuiz, screenResult);
}

// --- Submit form event ---
btnSubmit.addEventListener('click', () => {
  sound.playConfirm();
  btnSubmit.disabled = true;
  btnSubmit.textContent = "관찰부에 등록 완료";
  btnSubmit.style.background = "#4b5563";
  btnSubmit.style.boxShadow = "none";
  alert(`기록 보관함에 방랑자 ${testerInfo.name}님의 내면 관찰 기록이 안전하게 기록되었습니다!`);
});

// --- Details Event ---
btnDetails.addEventListener('click', () => {
  sound.playConfirm();
  
  detailsStatBarsContainer.innerHTML = '';
  finalSortedTypes.forEach((item) => {
    const t = item.type;
    const scoreVal = finalTypeScores[t]; // Use raw score instead of %
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
    
    // Animate bars on load
    setTimeout(() => {
      const innerBar = barItem.querySelector('.stat-bar-inner');
      if (innerBar) innerBar.style.width = `${pct}%`;
    }, 150);
  });
  
  transitionScreen(screenResult, screenDetails);
});

// --- Close Details Event ---
const btnClose = document.getElementById('btn-close');
if (btnClose) {
  btnClose.addEventListener('click', () => {
    sound.playClick();
    transitionScreen(screenDetails, screenResult);
  });
}

// --- Restart Event ---
btnRestart.addEventListener('click', () => {
  sound.playConfirm();
  
  // Clear inputs
  betaName.value = '';
  betaAge.value = '';
  betaJob.value = '';
  betaContact.value = '';
  betaAgree.checked = false;
  btnStartQuiz.disabled = true;
  btnStartQuiz.classList.add('btn-disabled');

  btnSubmit.disabled = false;
  btnSubmit.textContent = "기록 제출 및 인연 맺기";
  btnSubmit.style.background = "";
  btnSubmit.style.boxShadow = "";

  transitionScreen(screenResult, screenStory);
  startStorySequence();
});
