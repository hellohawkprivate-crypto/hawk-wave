export type GuideContent = {
  title: string
  defense: string
  attack: string
  bubble_intro: string
  schedule_label: string
  schedule_desc: string
  bubble_schedule: string
  victory_label: string
  victory_desc: string
  bubble_victory: string
  role_label: string
  role_inner: string
  role_outer: string
  bubble_role: string
  point_label: string
  point_phase1: string
  point_phase2: string
  bubble_point: string
}

const contents: Record<string, GuideContent> = {
  ja: {
    title: '金脈攻防戦',
    defense: '防衛 (3)',
    attack: '攻撃 (5)',
    bubble_intro: '633は「攻撃」です！',
    schedule_label: 'スケジュール',
    schedule_desc: '3週間かけて 41個の施設を争う。',
    bubble_schedule: '毎週、新しい施設がオープン！',
    victory_label: '勝利条件：≧ 5,001 pt',
    victory_desc: '全施設の合計は 10,001 pt。内側の施設ほど高ポイント！',
    bubble_victory: '半分のPtを取れば勝ち！ 敵の高火力は中心にくるぞ〜！',
    role_label: 'すべての人に、大事な役割がある！',
    role_inner: '内側：火力組が強敵を引きつける',
    role_outer: '外側：みんなで施設を大量占拠！',
    bubble_role: '計算した！外側をシッカリとれば勝てる！ 戦力不問！ 5人でも動ける部隊がいるだけで戦況が大きく変わる！ 来たれ戦士！',
    point_label: 'ポイント（前半は敵を選ぶ / 逃げる）',
    point_phase1: '0〜20 min：北側エリア',
    point_phase2: '20〜60 min：北側 + 南側',
    bubble_point: '攻撃側は「数の有利」を活かせば勝ち！ 前半は敵兵士を減らす / 強敵から逃げる。 後半の施設数が増えたタイミングで勝負だ！',
  },
  en: {
    title: 'Goldvein War',
    defense: 'Defense (3)',
    attack: 'Attack (5)',
    bubble_intro: '633 is on the Attack side!',
    schedule_label: 'Schedule',
    schedule_desc: '41 facilities contested over 3 weeks.',
    bubble_schedule: 'New facilities unlock every week!',
    victory_label: 'Victory Condition: ≧ 5,001 pt',
    victory_desc: 'Total across all facilities: 10,001 pt. Inner facilities = higher points!',
    bubble_victory: 'Grab half the points and we win! Enemy elites will focus on the center!',
    role_label: 'Everyone has a vital role!',
    role_inner: 'Inner zone: Elites draw enemy fire',
    role_outer: 'Outer zone: Everyone captures facilities!',
    bubble_role: "We did the math — if we secure the outer zone, we win! Power level doesn't matter! Even 5 troops that can move will change the battle! Warriors, assemble!",
    point_label: 'Key Tactics (Pick your fights / Retreat)',
    point_phase1: '0–20 min: North area only',
    point_phase2: '20–60 min: North + South area',
    bubble_point: "Use our numbers advantage to win! First half: weaken their troops / avoid elites. Second half: strike when more facilities open!",
  },
  ko: {
    title: '금맥 공방전',
    defense: '방어 (3)',
    attack: '공격 (5)',
    bubble_intro: '633은 "공격"입니다!',
    schedule_label: '일정',
    schedule_desc: '3주에 걸쳐 41개 시설을 놓고 싸웁니다.',
    bubble_schedule: '매주 새로운 시설이 열립니다!',
    victory_label: '승리 조건: ≧ 5,001 pt',
    victory_desc: '전체 시설 합계: 10,001 pt. 안쪽 시설일수록 높은 포인트!',
    bubble_victory: '절반의 포인트만 얻으면 승리! 적의 정예는 중심에 집결합니다!',
    role_label: '모든 사람에게 중요한 역할이 있다!',
    role_inner: '안쪽: 화력조가 강적을 끌어당긴다',
    role_outer: '바깥쪽: 모두 함께 시설을 대량 점령!',
    bubble_role: '계산했다! 바깥쪽을 확실히 잡으면 이긴다! 전력 불문! 5명이라도 움직이는 부대가 있으면 전황이 크게 달라진다! 전사들이여, 모여라!',
    point_label: '포인트 (전반은 적을 고르자 / 피하자)',
    point_phase1: '0~20분: 북쪽 에어리어',
    point_phase2: '20~60분: 북쪽 + 남쪽 에어리어',
    bubble_point: '공격측은 "수적 우위"를 살리면 승리! 전반에는 적 병사를 줄이고 / 강적은 피한다. 후반에 시설이 늘어나는 타이밍에 승부하자!',
  },
  'zh-TW': {
    title: '金脈攻防戰',
    defense: '防守 (3)',
    attack: '進攻 (5)',
    bubble_intro: '633是「進攻方」！',
    schedule_label: '時程表',
    schedule_desc: '歷時3週，爭奪41座設施。',
    bubble_schedule: '每週都有新設施開放！',
    victory_label: '勝利條件：≧ 5,001 pt',
    victory_desc: '全部設施合計 10,001 pt。越靠內側的設施分數越高！',
    bubble_victory: '拿下一半分數就贏了！敵方精銳會集中在中心！',
    role_label: '每個人都有重要的角色！',
    role_inner: '內側：火力組吸引強敵',
    role_outer: '外側：大家一起大量佔領設施！',
    bubble_role: '算過了！確實拿下外側就能贏！不看戰力！哪怕只有5人能動的部隊，也能大幅改變戰局！戰士們，集合！',
    point_label: '要點（前半選擇敵人／撤退）',
    point_phase1: '0〜20分鐘：北側區域',
    point_phase2: '20〜60分鐘：北側＋南側區域',
    bubble_point: '進攻方善用「人數優勢」就能贏！前半減少敵方士兵／避開強敵。後半設施增加時決一勝負！',
  },
  'zh-CN': {
    title: '金脉攻防战',
    defense: '防守 (3)',
    attack: '进攻 (5)',
    bubble_intro: '633是「进攻方」！',
    schedule_label: '时间表',
    schedule_desc: '历时3周，争夺41座设施。',
    bubble_schedule: '每周都有新设施开放！',
    victory_label: '胜利条件：≧ 5,001 pt',
    victory_desc: '全部设施合计 10,001 pt。越靠内侧的设施分数越高！',
    bubble_victory: '拿下一半分数就赢了！敌方精锐会集中在中心！',
    role_label: '每个人都有重要的角色！',
    role_inner: '内侧：火力组吸引强敌',
    role_outer: '外侧：大家一起大量占领设施！',
    bubble_role: '算过了！确实拿下外侧就能赢！不看战力！哪怕只有5人能动的部队，也能大幅改变战局！战士们，集合！',
    point_label: '要点（前半选择敌人／撤退）',
    point_phase1: '0〜20分钟：北侧区域',
    point_phase2: '20〜60分钟：北侧＋南侧区域',
    bubble_point: '进攻方善用「人数优势」就能赢！前半减少敌方士兵／避开强敌。后半设施增加时决一胜负！',
  },
  ar: {
    title: 'حرب منجم الذهب',
    defense: '(3) الدفاع',
    attack: '(5) الهجوم',
    bubble_intro: '!633 في فريق الهجوم',
    schedule_label: 'الجدول الزمني',
    schedule_desc: 'التنافس على 41 منشأة على مدار 3 أسابيع.',
    bubble_schedule: '!كل أسبوع تُفتح منشآت جديدة',
    victory_label: 'شرط الفوز: ≧ 5,001 نقطة',
    victory_desc: 'مجموع جميع المنشآت: 10,001 نقطة. المنشآت الداخلية = نقاط أعلى!',
    bubble_victory: '!احصل على نصف النقاط وسنفوز! نخبة العدو ستتمركز في الوسط',
    role_label: '!لكل شخص دور مهم',
    role_inner: 'المنطقة الداخلية: النخبة تستقطب نيران العدو',
    role_outer: '!المنطقة الخارجية: الجميع يحتل المنشآت',
    bubble_role: 'حسبناها! إذا أمّنّا المنطقة الخارجية سنفوز! القوة لا تهم! حتى 5 فرق متحركة ستغيّر مجرى المعركة! يا محاربين، تجمّعوا!',
    point_label: 'التكتيكات (اختر معاركك / انسحب)',
    point_phase1: 'دقيقة 0-20: المنطقة الشمالية فقط',
    point_phase2: 'دقيقة 20-60: الشمالية + الجنوبية',
    bubble_point: 'استغل التفوق العددي للفوز! النصف الأول: أضعف قواتهم / تجنب الأقوياء. النصف الثاني: اضرب عند فتح المزيد من المنشآت!',
  },
}

export function getGuideContent(locale: string): GuideContent {
  return contents[locale] ?? contents['en']
}
