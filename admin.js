// --- Archetypes Metadata ---
const archetypesMeta = {
  1: { number: 1, name: "시간을 멈춘 시계공", center: "장(본능) 중심", img: "assets/char_top_clean_1.jpg", color: "#8e6c43", keywords: ["원칙", "수리", "기억", "질서"] },
  2: { number: 2, name: "화살 잃은 큐피드", center: "가슴(감정) 중심", img: "assets/char_top_clean_2.jpg", color: "#e879f9", keywords: ["다정함", "섬세함", "외로움", "진심"] },
  3: { number: 3, name: "끝없이 달리는 소녀", center: "가슴(감정) 중심", img: "assets/char_top_clean_3.jpg", color: "#f97316", keywords: ["도전", "인내", "희망", "성취"] },
  4: { number: 4, name: "거울 수집가", center: "가슴(감정) 중심", img: "assets/char_top_clean_4.jpg", color: "#8b5cf6", keywords: ["개성", "통찰", "탐구", "자아"] },
  5: { number: 5, name: "세상을 저장하는 방랑자", center: "머리(사고) 중심", img: "assets/char_top_clean_5.jpg", color: "#312e81", keywords: ["과묵", "사색", "관찰", "지혜"] },
  6: { number: 6, name: "답을 기다리는 예언자", center: "머리(사고) 중심", img: "assets/char_top_clean_6.jpg", color: "#1e1b4b", keywords: ["신중함", "기다림", "징조", "신뢰"] },
  7: { number: 7, name: "웃지 않는 광대", center: "머리(사고) 중심", img: "assets/char_top_clean_7.jpg", color: "#eab308", keywords: ["열정", "모험", "즐거움", "위로"] },
  8: { number: 8, name: "갑옷을 벗지 않는 기사", center: "장(본능) 중심", img: "assets/char_top_clean_8.jpg", color: "#b91c1c", keywords: ["강인함", "보호", "용기", "신념"] },
  9: { number: 9, name: "잠든 거인", center: "장(본능) 중심", img: "assets/char_top_clean_9.jpg", color: "#059669", keywords: ["평화", "고요", "조화", "소망"] }
};

// --- Wing Descriptions Dictionary ---
const wingDescriptions = {
  "1w9": { title: "이상주의자 (The Idealist)", desc: "차분하고 원칙적이며, 객관적인 통찰과 내면의 평온을 중시합니다. 분노를 겉으로 드러내지 않고 사색적으로 문제를 해결합니다." },
  "1w2": { title: "변호인 (The Advocate)", desc: "정의롭고 따뜻한 온기를 품고 있으며, 타인의 아픔을 직접 도와주고 바로잡는 데 헌신적인 열정을 발휘합니다." },
  "2w1": { title: "봉사자 (The Servant)", desc: "도덕성과 원칙을 바탕으로 조용히 헌신하며, 자신이 올바르고 가치 있는 사람으로 기억되길 바랍니다." },
  "2w3": { title: "주최자 (The Host)", desc: "활기차고 사교적이며 매력적입니다. 사람들의 마음을 열고 관계를 주도하는 데 뛰어난 능력을 발휘합니다." },
  "3w2": { title: "매력적인 조력자 (The Charmer)", desc: "목표 지향적이면서도 친화력이 뛰어나며, 사람들에게 인정받고 영감을 주는 뛰어난 리더십을 보입니다." },
  "3w4": { title: "전문가 (The Professional)", desc: "자신만의 고유한 스타일과 탁월한 전문성을 추구하며, 일의 완성도와 심미적인 성공에 깊이 몰입합니다." },
  "4w3": { title: "귀족 (The Aristocrat)", desc: "세련된 감수성과 야망을 결합하여, 세상에 자신만의 독창적인 예술적 가치와 특별함을 표현합니다." },
  "4w5": { title: "보헤미안 (The Bohemian)", desc: "깊은 내면의 사색과 철학적 탐구에 몰두하며, 이국적이고 신비로운 시선으로 세상을 관찰합니다." },
  "5w4": { title: "도상파 (The Iconoclast)", desc: "직관적 통찰과 지적 분석이 어우러져, 세상의 보이지 않는 심오한 원리를 독창적으로 연구합니다." },
  "5w6": { title: "문제 해결자 (The Problem Solver)", desc: "체계적이고 분석적이며, 현실적인 데이터와 검증된 지식을 기반으로 안정적인 솔루션을 만듭니다." },
  "6w5": { title: "수호자 (The Defender)", desc: "신중하고 철저하며, 위기와 위험을 사전에 방어하기 위해 지식과 규칙을 충실히 활용합니다." },
  "6w7": { title: "동반자 (The Buddy)", desc: "유쾌하고 정이 많으며, 사람들과의 신뢰 깊은 우정과 안전한 유대를 형성하는 데 뛰어납니다." },
  "7w6": { title: "엔터테이너 (The Entertainer)", desc: "밝고 따뜻하며 다정합니다. 주변 사람들에게 유쾌한 에너지를 전하고 함께 행복을 누리고자 합니다." },
  "7w8": { title: "현실주의자 (The Realist)", desc: "대담하고 추진력이 강하며, 새로운 기회와 모험을 직접 행동으로 개척해 나가는 개척자입니다." },
  "8w7": { title: "독립자 (The Nonconformist)", desc: "에너지가 넘치고 모험적이며, 자신의 신념을 관철하기 위해 거침없이 전진하고 도전합니다." },
  "8w9": { title: "곰 (The Bear)", desc: "묵묵하고 든든한 바위 같습니다. 평화로운 온화함 속에 강력한 수호의 힘을 품고 있습니다." },
  "9w8": { title: "중재자 (The Referee)", desc: "포용력과 평화를 사랑하면서도, 갈등 상황에서 굳건한 결단력과 실질적인 조율 능력을 발휘합니다." },
  "9w1": { title: "몽상가 (The Dreamer)", desc: "순수하고 이상적인 조화를 꿈꾸며, 도덕적이고 질서 있는 평화로운 세상을 만들기 원합니다." }
};

// Global chart instances
let barChartInstance = null;
let radarChartInstance = null;

// DOM Elements
const searchNameInput = document.getElementById('search-name');
const searchLast4Input = document.getElementById('search-last4');
const btnSearch = document.getElementById('btn-search');
const btnShowAll = document.getElementById('btn-show-all');
const searchStatus = document.getElementById('search-status');

const participantsSection = document.getElementById('participants-section');
const participantsTbody = document.getElementById('participants-tbody');
const participantCount = document.getElementById('participant-count');
const btnSeedSample = document.getElementById('btn-seed-sample');
const btnExportAllCsv = document.getElementById('btn-export-all-csv');

const reportCard = document.getElementById('report-card');
const btnCloseReport = document.getElementById('btn-close-report');
const btnPrintReport = document.getElementById('btn-print-report');
const btnExportSingleCsv = document.getElementById('btn-export-single-csv');

let currentActiveRecord = null;

// --- Load Database Records ---
function getStoredRecords() {
  try {
    const raw = localStorage.getItem('enneagram_results_db');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading records:', e);
    return [];
  }
}

function saveStoredRecords(records) {
  try {
    localStorage.setItem('enneagram_results_db', JSON.stringify(records));
  } catch (e) {
    console.error('Error saving records:', e);
  }
}

// --- Initialize Page ---
document.addEventListener('DOMContentLoaded', () => {
  renderParticipantsTable();
  setupEventListeners();
});

function setupEventListeners() {
  btnSearch.addEventListener('click', handleSearch);
  searchNameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
  searchLast4Input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSearch(); });
  
  btnShowAll.addEventListener('click', () => {
    searchNameInput.value = '';
    searchLast4Input.value = '';
    showStatus('', '');
    renderParticipantsTable();
    reportCard.style.display = 'none';
  });

  if (btnSeedSample) {
    btnSeedSample.addEventListener('click', seedSampleData);
  }

  if (btnCloseReport) {
    btnCloseReport.addEventListener('click', () => {
      reportCard.style.display = 'none';
      participantsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnPrintReport) {
    btnPrintReport.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnExportSingleCsv) {
    btnExportSingleCsv.addEventListener('click', () => {
      if (currentActiveRecord) exportRecordsToCSV([currentActiveRecord], `enneagram_report_${currentActiveRecord.tester.name}.csv`);
    });
  }

  if (btnExportAllCsv) {
    btnExportAllCsv.addEventListener('click', () => {
      const records = getStoredRecords();
      if (records.length === 0) {
        alert('저장된 제출 데이터가 없습니다.');
        return;
      }
      exportRecordsToCSV(records, `enneagram_all_results_${Date.now()}.csv`);
    });
  }
}

// --- Search Handler (이름 + 전화번호 끝자리 4자리) ---
function handleSearch() {
  const queryName = (searchNameInput.value || '').trim();
  const queryLast4 = (searchLast4Input.value || '').trim().replace(/\D/g, '');

  if (!queryName && !queryLast4) {
    showStatus('검색할 이름 또는 전화번호 뒷 4자리를 입력해주세요.', 'error');
    return;
  }

  const records = getStoredRecords();
  const filtered = records.filter(r => {
    const nameMatch = queryName ? (r.tester && r.tester.name && r.tester.name.includes(queryName)) : true;
    
    let contactDigits = '';
    if (r.contactLast4) {
      contactDigits = r.contactLast4;
    } else if (r.tester && r.tester.contact) {
      contactDigits = String(r.tester.contact).replace(/\D/g, '').slice(-4);
    }
    const last4Match = queryLast4 ? (contactDigits.endsWith(queryLast4)) : true;

    return nameMatch && last4Match;
  });

  if (filtered.length === 0) {
    showStatus(`일치하는 참가자 기록을 찾을 수 없습니다. (검색어: ${queryName || '-'} / ${queryLast4 || '-'})`, 'error');
    reportCard.style.display = 'none';
    renderParticipantsTable([]);
  } else if (filtered.length === 1) {
    showStatus(`검색 완료: 1건의 기록을 찾았습니다.`, 'info');
    renderParticipantsTable(filtered);
    displayDetailedReport(filtered[0]);
  } else {
    showStatus(`검색 완료: ${filtered.length}건의 일치하는 기록이 있습니다. 목록에서 선택해 주세요.`, 'info');
    renderParticipantsTable(filtered);
    reportCard.style.display = 'none';
  }
}

function showStatus(text, type) {
  if (!text) {
    searchStatus.style.display = 'none';
    return;
  }
  searchStatus.className = `status-msg pixel-font ${type}`;
  searchStatus.textContent = text;
  searchStatus.style.display = 'block';
}

// --- Render Table of Participants ---
function renderParticipantsTable(recordsToRender = null) {
  const records = recordsToRender !== null ? recordsToRender : getStoredRecords();
  participantCount.textContent = records.length;
  participantsTbody.innerHTML = '';

  if (records.length === 0) {
    participantsTbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: #64748b; padding: 24px;">
          등록된 검사 결과 데이터가 없습니다. 메인 검사 사이트에서 [제출하기]를 누르면 여기에 등록됩니다.
        </td>
      </tr>
    `;
    return;
  }

  records.slice().reverse().forEach((record) => {
    const tr = document.createElement('tr');
    const dateStr = record.submittedAtFormatted || (record.createdAt ? new Date(record.createdAt).toLocaleDateString('ko-KR') : '-');
    const name = (record.tester && record.tester.name) || '익명 방랑자';
    
    const contactRaw = (record.tester && record.tester.contact) || '';
    const last4 = record.contactLast4 || (contactRaw.replace(/\D/g, '').slice(-4)) || '----';
    const contactDisplay = contactRaw ? `${contactRaw} (끝: ${last4})` : `(끝: ${last4})`;

    const pTypeNum = record.primaryType ? record.primaryType.number : (record.top3 && record.top3[0] ? record.top3[0].type : 1);
    const pTypeName = archetypesMeta[pTypeNum] ? archetypesMeta[pTypeNum].name : '시계공';
    const wingCode = record.wing ? record.wing.code : `${pTypeNum}w${pTypeNum === 1 ? 9 : pTypeNum - 1}`;

    // Compact 1~9 scores summary chips
    const scores = record.scores || {};
    let scoresChipsHTML = '<div class="table-scores-summary">';
    for (let i = 1; i <= 9; i++) {
      const isTop = (i === pTypeNum);
      const val = scores[i] !== undefined ? scores[i] : '-';
      scoresChipsHTML += `<span class="score-chip ${isTop ? 'top' : ''}">${i}번:${val}점</span>`;
    }
    scoresChipsHTML += '</div>';

    tr.innerHTML = `
      <td style="color: #94a3b8;">${dateStr}</td>
      <td style="font-weight: bold; color: var(--gold);">${name}</td>
      <td>${contactDisplay}</td>
      <td><span class="badge badge-gold">${pTypeNum}번. ${pTypeName}</span></td>
      <td><span class="badge badge-purple">${wingCode}</span></td>
      <td>${scoresChipsHTML}</td>
      <td>
        <button class="btn btn-secondary btn-view-report" style="font-size: 12px; padding: 4px 10px;">상세 분석</button>
      </td>
    `;

    tr.querySelector('.btn-view-report').addEventListener('click', () => {
      displayDetailedReport(record);
    });

    participantsTbody.appendChild(tr);
  });
}

// --- Display Full Detailed Report ---
function displayDetailedReport(record) {
  currentActiveRecord = record;
  reportCard.style.display = 'block';
  reportCard.scrollIntoView({ behavior: 'smooth' });

  // 1. Profile Data
  const tester = record.tester || {};
  document.getElementById('report-name').textContent = `${tester.name || '방랑자'} 님의 내면 정밀 분석`;
  document.getElementById('report-age').textContent = `연령: ${tester.age || '미기재'}`;
  document.getElementById('report-job').textContent = `직업: ${tester.job || '미기재'}`;
  document.getElementById('report-contact').textContent = `연락처: ${tester.contact || '미기재'}`;
  document.getElementById('report-date').textContent = `검사일시: ${record.submittedAtFormatted || (record.createdAt ? new Date(record.createdAt).toLocaleString('ko-KR') : '-')}`;

  const primaryNum = record.primaryType ? record.primaryType.number : (record.top3 && record.top3[0] ? record.top3[0].type : 1);
  const primaryMeta = archetypesMeta[primaryNum] || archetypesMeta[1];
  document.getElementById('report-primary-badge').textContent = `주유형: ${primaryNum}번 ${primaryMeta.name}`;

  // 2. Top 3 Cards
  const top3Container = document.getElementById('top3-container');
  top3Container.innerHTML = '';
  const top3List = record.top3 || [
    { type: primaryNum, score: record.scores ? record.scores[primaryNum] : 30, percentage: 80 }
  ];

  top3List.forEach((item, index) => {
    const meta = archetypesMeta[item.type] || archetypesMeta[1];
    const rankNum = index + 1;
    const card = document.createElement('div');
    card.className = `top3-card rank-${rankNum}`;
    card.innerHTML = `
      <div class="top3-rank-tag">${rankNum}순위</div>
      <div class="top3-img-wrap">
        <img src="${meta.img}" alt="${meta.name}">
      </div>
      <div class="top3-name pixel-font">${item.type}번. ${meta.name}</div>
      <div class="top3-score pixel-font">${item.score || 0}점 (${item.percentage || 0}%)</div>
      <div class="top3-keywords pixel-font">${meta.keywords.join(' · ')}</div>
    `;
    top3Container.appendChild(card);
  });

  // 3. 1~9 All Types Detailed Score Grid & Table (NEW)
  const allScoresContainer = document.getElementById('all-scores-container');
  allScoresContainer.innerHTML = '';
  const scores = record.scores || {};
  const percentages = record.percentages || {};

  // Sort scores to determine rank for each of 1..9
  const scoreEntries = [];
  for (let i = 1; i <= 9; i++) {
    scoreEntries.push({ type: i, score: scores[i] || 0 });
  }
  scoreEntries.sort((a, b) => b.score - a.score);
  const rankMap = {};
  scoreEntries.forEach((entry, idx) => {
    rankMap[entry.type] = idx + 1;
  });

  for (let i = 1; i <= 9; i++) {
    const meta = archetypesMeta[i];
    const scoreVal = scores[i] !== undefined ? scores[i] : 0;
    const pctVal = percentages[i] !== undefined ? percentages[i] : Math.round((scoreVal / 40) * 100);
    const rank = rankMap[i];
    const isDominant = (i === primaryNum);

    let rankBadgeText = `${rank}순위`;
    if (rank === 1) rankBadgeText = '🥇 1순위 (주유형)';
    else if (rank === 2) rankBadgeText = '🥈 2순위';
    else if (rank === 3) rankBadgeText = '🥉 3순위';

    const card = document.createElement('div');
    card.className = `score-card ${isDominant ? 'dominant' : ''}`;
    card.innerHTML = `
      <div class="score-card-header">
        <span class="score-card-type-name pixel-font">${i}번. ${meta.name}</span>
        <span class="score-card-rank-badge pixel-font">${rankBadgeText}</span>
      </div>
      <div style="font-size: 12px; color: ${meta.color};" class="pixel-font">${meta.center}</div>
      <div class="score-card-body">
        <span class="score-card-main-score pixel-font">${scoreVal}점</span>
        <span class="score-card-pct pixel-font">백분위 ${pctVal}%</span>
      </div>
      <div class="score-card-bar-track">
        <div class="score-card-bar-fill" style="width: ${pctVal}%; background: ${meta.color};"></div>
      </div>
    `;
    allScoresContainer.appendChild(card);
  }

  // 4. Wing (날개) Analysis
  const wingContainer = document.getElementById('wing-container');
  let wing = record.wing;
  if (!wing) {
    const leftNum = primaryNum === 1 ? 9 : primaryNum - 1;
    const rightNum = primaryNum === 9 ? 1 : primaryNum + 1;
    const leftScore = (record.scores && record.scores[leftNum]) || 0;
    const rightScore = (record.scores && record.scores[rightNum]) || 0;
    const domNum = leftScore >= rightScore ? leftNum : rightNum;
    wing = {
      code: `${primaryNum}w${domNum}`,
      primaryNum: primaryNum,
      dominantWingNum: domNum,
      leftWingNum: leftNum,
      leftWingScore: leftScore,
      rightWingNum: rightNum,
      rightWingScore: rightScore
    };
  }

  const wingInfo = wingDescriptions[wing.code] || {
    title: `${wing.code} 유형`,
    desc: "주유형의 잠재력과 이웃한 날개 유형의 에너지가 결합하여 고유한 성향을 이룹니다."
  };

  wingContainer.innerHTML = `
    <div class="wing-header">
      <div class="wing-code-badge pixel-font">🪽 판별된 날개: ${wing.code} [${wingInfo.title}]</div>
      <div style="font-size: 13px; color: #94a3b8;" class="pixel-font">
        좌측 날개(${wing.leftWingNum}번): ${wing.leftWingScore}점 | 우측 날개(${wing.rightWingNum}번): ${wing.rightWingScore}점
      </div>
    </div>
    <p class="wing-desc pixel-font">${wingInfo.desc}</p>
  `;

  // 5. Triad 3 Core Energies
  const triadContainer = document.getElementById('triad-container');
  const heartScore = (scores[2] || 0) + (scores[3] || 0) + (scores[4] || 0);
  const headScore = (scores[5] || 0) + (scores[6] || 0) + (scores[7] || 0);
  const gutScore = (scores[8] || 0) + (scores[9] || 0) + (scores[1] || 0);
  const totalTriad = (heartScore + headScore + gutScore) || 1;

  const heartPct = Math.round((heartScore / totalTriad) * 100);
  const headPct = Math.round((headScore / totalTriad) * 100);
  const gutPct = Math.round((gutScore / totalTriad) * 100);

  triadContainer.innerHTML = `
    <div class="triad-card heart">
      <div class="triad-card-title pixel-font">
        <span>💖 가슴(감정) 중심</span>
        <span>2, 3, 4번</span>
      </div>
      <div class="triad-score-val pixel-font">${heartScore}점 <span style="font-size: 15px; color: var(--rose); font-weight: normal;">(${heartPct}%)</span></div>
      <div class="triad-bar-track">
        <div class="triad-bar-fill" style="width: ${heartPct}%;"></div>
      </div>
      <div class="triad-detail-text pixel-font">관계, 타인의 인정, 감정적 연결과 수치심 조절을 동기로 행동합니다.</div>
    </div>

    <div class="triad-card head">
      <div class="triad-card-title pixel-font">
        <span>🧠 머리(사고) 중심</span>
        <span>5, 6, 7번</span>
      </div>
      <div class="triad-score-val pixel-font">${headScore}점 <span style="font-size: 15px; color: var(--blue); font-weight: normal;">(${headPct}%)</span></div>
      <div class="triad-bar-track">
        <div class="triad-bar-fill" style="width: ${headPct}%;"></div>
      </div>
      <div class="triad-detail-text pixel-font">지적 탐구, 미래의 안전과 예측, 불안을 줄이기 위한 전략을 추구합니다.</div>
    </div>

    <div class="triad-card gut">
      <div class="triad-card-title pixel-font">
        <span>🛡️ 장(본능) 중심</span>
        <span>8, 9, 1번</span>
      </div>
      <div class="triad-score-val pixel-font">${gutScore}점 <span style="font-size: 15px; color: var(--emerald); font-weight: normal;">(${gutPct}%)</span></div>
      <div class="triad-bar-track">
        <div class="triad-bar-fill" style="width: ${gutPct}%;"></div>
      </div>
      <div class="triad-detail-text pixel-font">생존과 주도권, 내면의 정의감과 자율성을 지키기 위해 에너지를 씁니다.</div>
    </div>
  `;

  // 6. Render Charts
  renderCharts(scores);
}

// --- Chart.js Rendering ---
function renderCharts(scores) {
  const labels = [
    '1번 시계공', '2번 큐피드', '3번 달리는소녀',
    '4번 거울수집가', '5번 방랑자', '6번 예언자',
    '7번 광대', '8번 기사', '9번 거인'
  ];

  const scoreData = [
    scores[1] || 0, scores[2] || 0, scores[3] || 0,
    scores[4] || 0, scores[5] || 0, scores[6] || 0,
    scores[7] || 0, scores[8] || 0, scores[9] || 0
  ];

  const colors = [
    '#8e6c43', '#e879f9', '#f97316',
    '#8b5cf6', '#312e81', '#1e1b4b',
    '#eab308', '#b91c1c', '#059669'
  ];

  // 1. Bar Chart (1~9 Distribution)
  const barCanvas = document.getElementById('scoresBarChart');
  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(barCanvas, {
    type: 'bar',
    data: {
      labels: ['1번', '2번', '3번', '4번', '5번', '6번', '7번', '8번', '9번'],
      datasets: [{
        label: '유형별 점수',
        data: scoreData,
        backgroundColor: colors.map(c => c + 'cc'),
        borderColor: colors,
        borderWidth: 1.5,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.08)' },
          ticks: { color: '#94a3b8', font: { family: 'NeoDunggeunmoPro-Regular' } }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#e2e8f0', font: { family: 'NeoDunggeunmoPro-Regular' } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => labels[items[0].dataIndex],
            label: (item) => `점수: ${item.raw}점`
          }
        }
      }
    }
  });

  // 2. Radar Chart (9 Archetypes Balance)
  const radarCanvas = document.getElementById('triadRadarChart');
  if (radarChartInstance) radarChartInstance.destroy();

  radarCanvas = new Chart(radarCanvas, {
    type: 'radar',
    data: {
      labels: ['1.시계공', '2.큐피드', '3.소녀', '4.거울', '5.방랑자', '6.예언자', '7.광대', '8.기사', '9.거인'],
      datasets: [{
        label: '에니어그램 다면 분포',
        data: scoreData,
        backgroundColor: 'rgba(251, 191, 36, 0.25)',
        borderColor: '#fbbf24',
        borderWidth: 2,
        pointBackgroundColor: '#fbbf24',
        pointBorderColor: '#fff',
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255,255,255,0.1)' },
          grid: { color: 'rgba(255,255,255,0.1)' },
          pointLabels: { color: '#e2e8f0', font: { family: 'NeoDunggeunmoPro-Regular', size: 11 } },
          ticks: { backdropColor: 'transparent', color: '#94a3b8', showLabelBackdrop: false }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// --- CSV Export Helper ---
function exportRecordsToCSV(records, filename = 'enneagram_export.csv') {
  const headers = [
    '등록ID', '검사일시', '이름', '나이', '직업', '연락처', '연락처뒷4자리',
    '주유형_번호', '주유형_이름', '날개_코드',
    '1번_점수', '2번_점수', '3번_점수', '4번_점수', '5번_점수',
    '6번_점수', '7번_점수', '8번_점수', '9번_점수',
    '가슴중심(234)_점수', '머리중심(567)_점수', '장중심(891)_점수'
  ];

  const rows = records.map(r => {
    const t = r.tester || {};
    const s = r.scores || {};
    const pNum = r.primaryType ? r.primaryType.number : (r.top3 && r.top3[0] ? r.top3[0].type : 1);
    const pName = archetypesMeta[pNum] ? archetypesMeta[pNum].name : '시계공';
    const wCode = r.wing ? r.wing.code : `${pNum}w${pNum === 1 ? 9 : pNum - 1}`;
    
    const hScore = (s[2] || 0) + (s[3] || 0) + (s[4] || 0);
    const headScore = (s[5] || 0) + (s[6] || 0) + (s[7] || 0);
    const gScore = (s[8] || 0) + (s[9] || 0) + (s[1] || 0);

    return [
      `"${r.id || ''}"`,
      `"${r.submittedAtFormatted || r.createdAt || ''}"`,
      `"${t.name || ''}"`,
      `"${t.age || ''}"`,
      `"${t.job || ''}"`,
      `"${t.contact || ''}"`,
      `"${r.contactLast4 || (String(t.contact || '').replace(/\D/g, '').slice(-4))}"`,
      pNum,
      `"${pName}"`,
      `"${wCode}"`,
      s[1] || 0, s[2] || 0, s[3] || 0, s[4] || 0, s[5] || 0,
      s[6] || 0, s[7] || 0, s[8] || 0, s[9] || 0,
      hScore, headScore, gScore
    ].join(',');
  });

  const csvContent = '﻿' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- Seed Sample Data ---
function seedSampleData() {
  const existing = getStoredRecords();
  const sample1 = {
    id: 'sample_' + Date.now(),
    tester: { name: '김민수', age: '28', job: '개발자', contact: '010-1234-5678' },
    contactLast4: '5678',
    primaryType: { number: 1, name: '시간을 멈춘 시계공' },
    top3: [
      { type: 1, name: '시간을 멈춘 시계공', score: 38, percentage: 95 },
      { type: 9, name: '잠든 거인', score: 32, percentage: 80 },
      { type: 5, name: '세상을 저장하는 방랑자', score: 29, percentage: 72 }
    ],
    wing: {
      code: '1w9',
      primaryNum: 1,
      dominantWingNum: 9,
      leftWingNum: 9,
      leftWingScore: 32,
      rightWingNum: 2,
      rightWingScore: 18
    },
    scores: { 1: 38, 2: 18, 3: 20, 4: 15, 5: 29, 6: 24, 7: 16, 8: 22, 9: 32 },
    percentages: { 1: 95, 2: 45, 3: 50, 4: 37, 5: 72, 6: 60, 7: 40, 8: 55, 9: 80 },
    createdAt: new Date().toISOString(),
    submittedAtFormatted: new Date().toLocaleString('ko-KR')
  };

  const sample2 = {
    id: 'sample_' + (Date.now() + 1),
    tester: { name: '이서연', age: '25', job: '디자이너', contact: '010-9876-4321' },
    contactLast4: '4321',
    primaryType: { number: 4, name: '거울 수집가' },
    top3: [
      { type: 4, name: '거울 수집가', score: 39, percentage: 98 },
      { type: 5, name: '세상을 저장하는 방랑자', score: 34, percentage: 85 },
      { type: 7, name: '웃지 않는 광대', score: 28, percentage: 70 }
    ],
    wing: {
      code: '4w5',
      primaryNum: 4,
      dominantWingNum: 5,
      leftWingNum: 3,
      leftWingScore: 22,
      rightWingNum: 5,
      rightWingScore: 34
    },
    scores: { 1: 14, 2: 24, 3: 22, 4: 39, 5: 34, 6: 20, 7: 28, 8: 16, 9: 25 },
    percentages: { 1: 35, 2: 60, 3: 55, 4: 98, 5: 85, 6: 50, 7: 70, 8: 40, 9: 62 },
    createdAt: new Date().toISOString(),
    submittedAtFormatted: new Date().toLocaleString('ko-KR')
  };

  existing.push(sample1, sample2);
  saveStoredRecords(existing);
  renderParticipantsTable();
  showStatus('테스트 샘플 참가자 2명이 추가되었습니다. (김민수 / 5678, 이서연 / 4321)', 'info');
}
