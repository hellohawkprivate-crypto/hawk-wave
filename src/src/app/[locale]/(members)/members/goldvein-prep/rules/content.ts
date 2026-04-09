export type RulesContent = {
  heading: string
  // 基礎情報
  basicInfo: string
  defenseSide: string
  attackSide: string
  // スケジュール
  scheduleTitle: string
  scheduleDesc: string
  scheduleDate: string[]
  // 勝利条件
  victoryTitle: string
  victoryDesc: string
  victoryNote: string
  // 施設ステータス
  statusTitle: string
  statusDesc: string
  statusItems: { status: string; desc: string }[]
  // 施設一覧
  facilityTitle: string
  facilityHeaders: string[]
  facilityNames: string[]
  // 速度
  speedTitle: string
  speedDesc: string
  speedTimeLabel: string
  speedRateLabel: string
  speedRows: { time: string; rate: string }[]
  // 砲塔・攻城
  towerTitle: string
  cannonName: string
  cannonDesc: string
  siegeName: string
  siegeDesc: string
  // マップ
  mapTitle: string
  mapDesc: string
  mapPhase1: string
  mapPhase2: string
  mapAlt: string
  // 進行度引き継ぎ
  carryoverTitle: string
  carryoverItems: string[]
  // バフ
  buffTitle: string
  buffDesc: string
  defenseBuffLabel: string
  attackBuffLabel: string
  buffCondition: string
  buffEffect: string
  defaultLabel: string
  marchSpeed: string
  defuseSpeed: string
  plantSpeed: string
  deathRate: string
  defenseBuffs: { condition: string; effect: string }[]
  attackBuffs: { condition: string; effect: string }[]
}

const ja: RulesContent = {
  heading: '金脈攻防戦 ルール',
  basicInfo: '基礎情報',
  defenseSide: '防衛側（3サーバー）',
  attackSide: '攻撃側（5サーバー）',
  scheduleTitle: '戦闘スケジュール',
  scheduleDesc: '3回 × 60分の戦闘',
  scheduleDate: ['4月11日', '4月18日', '4月25日'],
  victoryTitle: '勝利条件',
  victoryDesc: 'Week4終了後に、攻撃側の「破壊値」が5,001 Ptを超えていたら攻撃側の勝利、下回ったら防衛側の勝利。',
  victoryNote: '攻撃側は施設を破壊したときに、施設カテゴリに応じた「破壊値」を獲得する。',
  statusTitle: '施設のステータス',
  statusDesc: '施設には「爆弾設置の進行度」というパラメータがあり、進行度が最大値（100,000 = 100%）になると施設が「破壊」と判定される。',
  statusItems: [
    { status: '未占領', desc: 'だれも占領していない' },
    { status: '爆弾設置', desc: '攻撃側が占領 → 進行度が上がる' },
    { status: '爆弾解除', desc: '防御側が占領 → 進行度が下がる' },
  ],
  facilityTitle: '施設一覧（5種類 合計41個）',
  facilityHeaders: ['施設', '個数', '破壊値', '占領可能週', '砲塔', '攻城強化装置'],
  facilityNames: ['小型拠点', '大都市', '中型拠点', '軍事要塞', 'ゴールデンパレス'],
  speedTitle: '爆弾設置/解除の速度',
  speedDesc: '占領開始からの駐留時間のみに依存する。駐留部隊数は関係ない。',
  speedTimeLabel: '経過時間',
  speedRateLabel: '速度',
  speedRows: [
    { time: '占領開始から120秒まで', rate: '93 / sec' },
    { time: '占領開始から121秒以降', rate: '37 / sec' },
  ],
  towerTitle: '砲塔・攻城強化装置',
  cannonName: '砲塔',
  cannonDesc: '砲塔占領中は、1つにつき爆弾設置/解除の速度 +5%',
  siegeName: '攻城強化装置',
  siegeDesc: '占領中は、1つにつき爆弾設置/解除の速度 +5%。さらに占領直後から60秒間は「爆弾の進行度」が +2,200 増加。',
  mapTitle: 'マップ配置',
  mapDesc: '4種類の施設（小型拠点・大都市・中型拠点・軍事要塞）の配置は以下参照。',
  mapPhase1: '開始から20分：北側エリア（+ ゴールデンパレス）が占領可能',
  mapPhase2: '20分から60分：全ての施設が占領可能',
  mapAlt: '金脈攻防戦 マップ配置図',
  carryoverTitle: '爆弾の進行度の引き継ぎ',
  carryoverItems: [
    'すべての施設には「爆弾の進行度」の初期状態が決まっている',
    '破壊された施設は、以降の占領・破壊の対象外となる',
    'Week2終了後の進行度・破壊状態はWeek3に引き継がれる',
    'Week3終了後の進行度・破壊状態はWeek4に引き継がれる',
    'ゴールデンパレスは「進行度0%」になると即保護状態になり、攻撃不可能になる',
  ],
  buffTitle: 'バフ効果',
  buffDesc: '破壊値に応じて効果が付与される（効果は積み重ね）',
  defenseBuffLabel: '防衛側バフ',
  attackBuffLabel: '攻撃側バフ',
  buffCondition: '条件',
  buffEffect: '効果',
  defaultLabel: 'デフォルト',
  marchSpeed: '行軍速度',
  defuseSpeed: '爆弾解除速度',
  plantSpeed: '爆弾設置速度',
  deathRate: '兵士戦死率',
  defenseBuffs: [
    { condition: 'デフォルト', effect: '行軍速度 +20%' },
    { condition: 'Week3開始前の破壊値 > 1,010', effect: '爆弾解除速度 +7.5%、兵士戦死率 -15%' },
    { condition: 'Week3開始前の破壊値 > 1,250', effect: '爆弾解除速度 +7.5%' },
    { condition: 'Week4開始前の破壊値 > 1,840', effect: '兵士戦死率 -5%' },
    { condition: 'Week4開始前の破壊値 > 3,500', effect: '爆弾解除速度 +7.5%、兵士戦死率 -15%' },
  ],
  attackBuffs: [
    { condition: 'デフォルト', effect: '爆弾設置速度 +30%' },
    { condition: 'Week3開始前の破壊値 < 260', effect: '爆弾設置速度 +7.5%、行軍速度 +10%' },
    { condition: 'Week3開始前の破壊値 < 500', effect: '爆弾設置速度 +7.5%、兵士戦死率 -15%' },
    { condition: 'Week4開始前の破壊値 < 1,740', effect: '爆弾設置速度 +7.5%、兵士戦死率 -15%' },
    { condition: 'Week4開始前の破壊値 < 4,660', effect: '兵士戦死率 -5%' },
  ],
}

const en: RulesContent = {
  heading: 'Goldvein War Rules',
  basicInfo: 'Basic Info',
  defenseSide: 'Defense (3 Servers)',
  attackSide: 'Attack (5 Servers)',
  scheduleTitle: 'Battle Schedule',
  scheduleDesc: '3 battles × 60 minutes each',
  scheduleDate: ['Apr 11', 'Apr 18', 'Apr 25'],
  victoryTitle: 'Victory Condition',
  victoryDesc: 'If the Attack side\'s total Destruction Points exceed 5,001 Pt after Week 4, the Attack side wins. Otherwise, the Defense side wins.',
  victoryNote: 'The Attack side earns Destruction Points when they destroy a facility, based on the facility type.',
  statusTitle: 'Facility Status',
  statusDesc: 'Each facility has a "Bomb Progress" parameter. When it reaches max (100,000 = 100%), the facility is "Destroyed".',
  statusItems: [
    { status: 'Unoccupied', desc: 'No one is occupying' },
    { status: 'Bomb Plant', desc: 'Attack occupies → progress increases' },
    { status: 'Bomb Defuse', desc: 'Defense occupies → progress decreases' },
  ],
  facilityTitle: 'Facilities (5 types, 41 total)',
  facilityHeaders: ['Facility', 'Count', 'Dest. Pt', 'Available', 'Cannon', 'Siege Booster'],
  facilityNames: ['Small Stronghold', 'Large City', 'Medium Stronghold', 'Military Fortress', 'Golden Palace'],
  speedTitle: 'Bomb Plant/Defuse Speed',
  speedDesc: 'Depends only on garrison duration. Number of troops does not matter.',
  speedTimeLabel: 'Elapsed Time',
  speedRateLabel: 'Speed',
  speedRows: [
    { time: 'First 120 seconds', rate: '93 / sec' },
    { time: 'After 120 seconds', rate: '37 / sec' },
  ],
  towerTitle: 'Cannons & Siege Boosters',
  cannonName: 'Cannon',
  cannonDesc: 'While holding a Cannon: bomb plant/defuse speed +5% per Cannon',
  siegeName: 'Siege Booster',
  siegeDesc: 'While holding: speed +5% per unit. Also, +2,200 bomb progress during the first 60 seconds.',
  mapTitle: 'Map Layout',
  mapDesc: 'See below for the placement of all 4 facility types.',
  mapPhase1: 'First 20 min: North area (+ Golden Palace) can be occupied',
  mapPhase2: '20–60 min: All facilities can be occupied',
  mapAlt: 'Goldvein War Map',
  carryoverTitle: 'Bomb Progress Carryover',
  carryoverItems: [
    'Every facility has a preset initial bomb progress',
    'Destroyed facilities are excluded from further occupation',
    'Progress and destruction status carry over from Week 2 to Week 3',
    'Progress and destruction status carry over from Week 3 to Week 4',
    'Golden Palace enters protection mode when progress drops to 0% and becomes unattackable',
  ],
  buffTitle: 'Buff Effects',
  buffDesc: 'Buffs are granted based on Destruction Points (effects stack)',
  defenseBuffLabel: 'Defense Buffs',
  attackBuffLabel: 'Attack Buffs',
  buffCondition: 'Condition',
  buffEffect: 'Effect',
  defaultLabel: 'Default',
  marchSpeed: 'March speed',
  defuseSpeed: 'Defuse speed',
  plantSpeed: 'Plant speed',
  deathRate: 'Troop death rate',
  defenseBuffs: [
    { condition: 'Default', effect: 'March speed +20%' },
    { condition: 'Dest. Pt > 1,010 before Week 3', effect: 'Defuse speed +7.5%, Death rate -15%' },
    { condition: 'Dest. Pt > 1,250 before Week 3', effect: 'Defuse speed +7.5%' },
    { condition: 'Dest. Pt > 1,840 before Week 4', effect: 'Death rate -5%' },
    { condition: 'Dest. Pt > 3,500 before Week 4', effect: 'Defuse speed +7.5%, Death rate -15%' },
  ],
  attackBuffs: [
    { condition: 'Default', effect: 'Plant speed +30%' },
    { condition: 'Dest. Pt < 260 before Week 3', effect: 'Plant speed +7.5%, March speed +10%' },
    { condition: 'Dest. Pt < 500 before Week 3', effect: 'Plant speed +7.5%, Death rate -15%' },
    { condition: 'Dest. Pt < 1,740 before Week 4', effect: 'Plant speed +7.5%, Death rate -15%' },
    { condition: 'Dest. Pt < 4,660 before Week 4', effect: 'Death rate -5%' },
  ],
}

const ko: RulesContent = {
  heading: '금맥 공방전 규칙',
  basicInfo: '기본 정보',
  defenseSide: '방어측 (3서버)',
  attackSide: '공격측 (5서버)',
  scheduleTitle: '전투 일정',
  scheduleDesc: '3회 × 60분 전투',
  scheduleDate: ['4월 11일', '4월 18일', '4월 25일'],
  victoryTitle: '승리 조건',
  victoryDesc: 'Week 4 종료 후, 공격측의 "파괴 점수"가 5,001 Pt를 초과하면 공격측 승리, 미만이면 방어측 승리.',
  victoryNote: '공격측은 시설을 파괴할 때 시설 유형에 따른 "파괴 점수"를 획득합니다.',
  statusTitle: '시설 상태',
  statusDesc: '시설에는 "폭탄 설치 진행도" 파라미터가 있으며, 최대치(100,000 = 100%)에 도달하면 "파괴"로 판정됩니다.',
  statusItems: [
    { status: '미점령', desc: '아무도 점령하지 않음' },
    { status: '폭탄 설치', desc: '공격측 점령 → 진행도 상승' },
    { status: '폭탄 해제', desc: '방어측 점령 → 진행도 하락' },
  ],
  facilityTitle: '시설 목록 (5종류, 총 41개)',
  facilityHeaders: ['시설', '수량', '파괴 점수', '점령 가능 주', '포탑', '공성 강화 장치'],
  facilityNames: ['소형 요새', '대형 도시', '중형 요새', '군사 요새', '황금 궁전'],
  speedTitle: '폭탄 설치/해제 속도',
  speedDesc: '점령 시작 후 주둔 시간에만 의존합니다. 주둔 부대 수는 관계 없습니다.',
  speedTimeLabel: '경과 시간',
  speedRateLabel: '속도',
  speedRows: [
    { time: '점령 시작부터 120초까지', rate: '93 / sec' },
    { time: '점령 시작 121초 이후', rate: '37 / sec' },
  ],
  towerTitle: '포탑 · 공성 강화 장치',
  cannonName: '포탑',
  cannonDesc: '포탑 점령 중: 폭탄 설치/해제 속도 +5% (1개당)',
  siegeName: '공성 강화 장치',
  siegeDesc: '점령 중: 속도 +5% (1개당). 또한 점령 직후 60초간 "폭탄 진행도"가 +2,200 증가.',
  mapTitle: '맵 배치',
  mapDesc: '4종류 시설 배치는 아래를 참조하세요.',
  mapPhase1: '시작 후 20분: 북쪽 에어리어 (+ 황금 궁전) 점령 가능',
  mapPhase2: '20분~60분: 모든 시설 점령 가능',
  mapAlt: '금맥 공방전 맵',
  carryoverTitle: '폭탄 진행도 이월',
  carryoverItems: [
    '모든 시설에는 "폭탄 진행도"의 초기 상태가 정해져 있음',
    '파괴된 시설은 이후 점령/파괴 대상에서 제외',
    'Week 2 종료 후 진행도/파괴 상태는 Week 3으로 이월',
    'Week 3 종료 후 진행도/파괴 상태는 Week 4로 이월',
    '황금 궁전은 "진행도 0%"가 되면 즉시 보호 상태가 되어 공격 불가',
  ],
  buffTitle: '버프 효과',
  buffDesc: '파괴 점수에 따라 효과가 부여됩니다 (효과는 중첩)',
  defenseBuffLabel: '방어측 버프',
  attackBuffLabel: '공격측 버프',
  buffCondition: '조건',
  buffEffect: '효과',
  defaultLabel: '기본',
  marchSpeed: '행군 속도',
  defuseSpeed: '해제 속도',
  plantSpeed: '설치 속도',
  deathRate: '전사율',
  defenseBuffs: [
    { condition: '기본', effect: '행군 속도 +20%' },
    { condition: 'Week 3 전 파괴 점수 > 1,010', effect: '해제 속도 +7.5%, 전사율 -15%' },
    { condition: 'Week 3 전 파괴 점수 > 1,250', effect: '해제 속도 +7.5%' },
    { condition: 'Week 4 전 파괴 점수 > 1,840', effect: '전사율 -5%' },
    { condition: 'Week 4 전 파괴 점수 > 3,500', effect: '해제 속도 +7.5%, 전사율 -15%' },
  ],
  attackBuffs: [
    { condition: '기본', effect: '설치 속도 +30%' },
    { condition: 'Week 3 전 파괴 점수 < 260', effect: '설치 속도 +7.5%, 행군 속도 +10%' },
    { condition: 'Week 3 전 파괴 점수 < 500', effect: '설치 속도 +7.5%, 전사율 -15%' },
    { condition: 'Week 4 전 파괴 점수 < 1,740', effect: '설치 속도 +7.5%, 전사율 -15%' },
    { condition: 'Week 4 전 파괴 점수 < 4,660', effect: '전사율 -5%' },
  ],
}

const zhTW: RulesContent = {
  heading: '金脈攻防戰 規則',
  basicInfo: '基礎資訊',
  defenseSide: '防守方（3伺服器）',
  attackSide: '進攻方（5伺服器）',
  scheduleTitle: '戰鬥日程',
  scheduleDesc: '3場 × 60分鐘',
  scheduleDate: ['4月11日', '4月18日', '4月25日'],
  victoryTitle: '勝利條件',
  victoryDesc: 'Week 4結束後，進攻方的「破壞值」超過5,001 Pt即為進攻方勝利，未達則防守方勝利。',
  victoryNote: '進攻方破壞設施時，根據設施類別獲得「破壞值」。',
  statusTitle: '設施狀態',
  statusDesc: '設施有「炸彈設置進度」參數，進度達到最大值（100,000 = 100%）時判定為「破壞」。',
  statusItems: [
    { status: '未佔領', desc: '無人佔領' },
    { status: '炸彈設置', desc: '進攻方佔領 → 進度上升' },
    { status: '炸彈拆除', desc: '防守方佔領 → 進度下降' },
  ],
  facilityTitle: '設施一覽（5種，共41個）',
  facilityHeaders: ['設施', '數量', '破壞值', '可佔領週', '巨砲', '攻城強化裝置'],
  facilityNames: ['小型據點', '大型城市', '中型據點', '軍事要塞', '掘金城'],
  speedTitle: '炸彈設置/拆除速度',
  speedDesc: '僅取決於佔領後的駐留時間。駐留部隊數量無關。',
  speedTimeLabel: '經過時間',
  speedRateLabel: '速度',
  speedRows: [
    { time: '佔領開始後120秒內', rate: '93 / sec' },
    { time: '佔領開始121秒後', rate: '37 / sec' },
  ],
  towerTitle: '巨砲・攻城強化裝置',
  cannonName: '巨砲',
  cannonDesc: '佔領巨砲期間，每個巨砲使炸彈設置/拆除速度 +5%',
  siegeName: '攻城強化裝置',
  siegeDesc: '佔領期間，每個裝置使速度 +5%。另外佔領後60秒內「炸彈進度」+2,200。',
  mapTitle: '地圖配置',
  mapDesc: '4種設施的配置請參照下圖。',
  mapPhase1: '開始後20分鐘：北側區域（＋掘金城）可佔領',
  mapPhase2: '20分鐘至60分鐘：所有設施均可佔領',
  mapAlt: '金脈攻防戰 地圖',
  carryoverTitle: '炸彈進度延續',
  carryoverItems: [
    '所有設施都有預設的「炸彈進度」初始狀態',
    '被破壞的設施將排除在後續佔領/破壞之外',
    'Week 2結束後的進度和破壞狀態延續至Week 3',
    'Week 3結束後的進度和破壞狀態延續至Week 4',
    '掘金城進度降至0%時立即進入保護狀態，無法攻擊',
  ],
  buffTitle: '增益效果',
  buffDesc: '根據破壞值授予效果（效果可疊加）',
  defenseBuffLabel: '防守方增益',
  attackBuffLabel: '進攻方增益',
  buffCondition: '條件',
  buffEffect: '效果',
  defaultLabel: '預設',
  marchSpeed: '行軍速度',
  defuseSpeed: '拆除速度',
  plantSpeed: '設置速度',
  deathRate: '士兵陣亡率',
  defenseBuffs: [
    { condition: '預設', effect: '行軍速度 +20%' },
    { condition: 'Week 3前破壞值 > 1,010', effect: '拆除速度 +7.5%、陣亡率 -15%' },
    { condition: 'Week 3前破壞值 > 1,250', effect: '拆除速度 +7.5%' },
    { condition: 'Week 4前破壞值 > 1,840', effect: '陣亡率 -5%' },
    { condition: 'Week 4前破壞值 > 3,500', effect: '拆除速度 +7.5%、陣亡率 -15%' },
  ],
  attackBuffs: [
    { condition: '預設', effect: '設置速度 +30%' },
    { condition: 'Week 3前破壞值 < 260', effect: '設置速度 +7.5%、行軍速度 +10%' },
    { condition: 'Week 3前破壞值 < 500', effect: '設置速度 +7.5%、陣亡率 -15%' },
    { condition: 'Week 4前破壞值 < 1,740', effect: '設置速度 +7.5%、陣亡率 -15%' },
    { condition: 'Week 4前破壞值 < 4,660', effect: '陣亡率 -5%' },
  ],
}

const zhCN: RulesContent = {
  ...zhTW,
  heading: '金脉攻防战 规则',
  basicInfo: '基础信息',
  defenseSide: '防守方（3服务器）',
  attackSide: '进攻方（5服务器）',
  scheduleTitle: '战斗日程',
  scheduleDesc: '3场 × 60分钟',
  victoryTitle: '胜利条件',
  victoryDesc: 'Week 4结束后，进攻方的「破坏值」超过5,001 Pt即为进攻方胜利，未达则防守方胜利。',
  victoryNote: '进攻方破坏设施时，根据设施类别获得「破坏值」。',
  statusTitle: '设施状态',
  statusDesc: '设施有「炸弹设置进度」参数，进度达到最大值（100,000 = 100%）时判定为「破坏」。',
  statusItems: [
    { status: '未占领', desc: '无人占领' },
    { status: '炸弹设置', desc: '进攻方占领 → 进度上升' },
    { status: '炸弹拆除', desc: '防守方占领 → 进度下降' },
  ],
  facilityTitle: '设施一览（5种，共41个）',
  facilityHeaders: ['设施', '数量', '破坏值', '可占领周', '巨炮', '攻城强化装置'],
  facilityNames: ['小型据点', '大型城市', '中型据点', '军事要塞', '掘金城'],
  speedTitle: '炸弹设置/拆除速度',
  speedDesc: '仅取决于占领后的驻留时间。驻留部队数量无关。',
  towerTitle: '巨炮·攻城强化装置',
  cannonName: '巨炮',
  cannonDesc: '占领巨炮期间，每个巨炮使炸弹设置/拆除速度 +5%',
  siegeName: '攻城强化装置',
  siegeDesc: '占领期间，每个装置使速度 +5%。另外占领后60秒内「炸弹进度」+2,200。',
  mapTitle: '地图配置',
  mapDesc: '4种设施的配置请参照下图。',
  mapPhase1: '开始后20分钟：北侧区域（＋掘金城）可占领',
  mapPhase2: '20分钟至60分钟：所有设施均可占领',
  mapAlt: '金脉攻防战 地图',
  carryoverTitle: '炸弹进度延续',
  carryoverItems: [
    '所有设施都有预设的「炸弹进度」初始状态',
    '被破坏的设施将排除在后续占领/破坏之外',
    'Week 2结束后的进度和破坏状态延续至Week 3',
    'Week 3结束后的进度和破坏状态延续至Week 4',
    '掘金城进度降至0%时立即进入保护状态，无法攻击',
  ],
  buffTitle: '增益效果',
  buffDesc: '根据破坏值授予效果（效果可叠加）',
  defenseBuffLabel: '防守方增益',
  attackBuffLabel: '进攻方增益',
  buffCondition: '条件',
  buffEffect: '效果',
  defenseBuffs: [
    { condition: '默认', effect: '行军速度 +20%' },
    { condition: 'Week 3前破坏值 > 1,010', effect: '拆除速度 +7.5%、阵亡率 -15%' },
    { condition: 'Week 3前破坏值 > 1,250', effect: '拆除速度 +7.5%' },
    { condition: 'Week 4前破坏值 > 1,840', effect: '阵亡率 -5%' },
    { condition: 'Week 4前破坏值 > 3,500', effect: '拆除速度 +7.5%、阵亡率 -15%' },
  ],
  attackBuffs: [
    { condition: '默认', effect: '设置速度 +30%' },
    { condition: 'Week 3前破坏值 < 260', effect: '设置速度 +7.5%、行军速度 +10%' },
    { condition: 'Week 3前破坏值 < 500', effect: '设置速度 +7.5%、阵亡率 -15%' },
    { condition: 'Week 4前破坏值 < 1,740', effect: '设置速度 +7.5%、阵亡率 -15%' },
    { condition: 'Week 4前破坏值 < 4,660', effect: '阵亡率 -5%' },
  ],
}

const ar: RulesContent = {
  heading: 'قواعد حرب منجم الذهب',
  basicInfo: 'معلومات أساسية',
  defenseSide: '(خوادم 3) الدفاع',
  attackSide: '(خوادم 5) الهجوم',
  scheduleTitle: 'جدول المعارك',
  scheduleDesc: 'دقيقة 60 × معارك 3',
  scheduleDate: ['11 أبريل', '18 أبريل', '25 أبريل'],
  victoryTitle: 'شرط الفوز',
  victoryDesc: 'إذا تجاوزت نقاط التدمير لفريق الهجوم 5,001 نقطة بعد الأسبوع 4، يفوز الهجوم. خلاف ذلك يفوز الدفاع.',
  victoryNote: 'يحصل فريق الهجوم على نقاط التدمير عند تدمير منشأة حسب نوعها.',
  statusTitle: 'حالة المنشأة',
  statusDesc: 'لكل منشأة معامل "تقدم القنبلة". عند وصوله للحد الأقصى (100,000 = 100%) تُدمر المنشأة.',
  statusItems: [
    { status: 'غير محتلة', desc: 'لا أحد يحتلها' },
    { status: 'زرع قنبلة', desc: 'الهجوم يحتل ← التقدم يزداد' },
    { status: 'إبطال قنبلة', desc: 'الدفاع يحتل ← التقدم ينخفض' },
  ],
  facilityTitle: 'المنشآت (5 أنواع، 41 إجمالي)',
  facilityHeaders: ['المنشأة', 'العدد', 'نقاط التدمير', 'متاح من', 'مدفع', 'معزز حصار'],
  facilityNames: ['قاعدة صغيرة', 'مدينة كبرى', 'قاعدة متوسطة', 'حصن عسكري', 'القصر الذهبي'],
  speedTitle: 'سرعة الزرع/الإبطال',
  speedDesc: 'تعتمد فقط على مدة التواجد. عدد القوات لا يؤثر.',
  speedTimeLabel: 'الوقت المنقضي',
  speedRateLabel: 'السرعة',
  speedRows: [
    { time: 'أول 120 ثانية', rate: '93 / sec' },
    { time: 'بعد 120 ثانية', rate: '37 / sec' },
  ],
  towerTitle: 'المدافع ومعززات الحصار',
  cannonName: 'مدفع',
  cannonDesc: 'أثناء احتلال المدفع: سرعة الزرع/الإبطال +5% لكل مدفع',
  siegeName: 'معزز الحصار',
  siegeDesc: 'أثناء الاحتلال: سرعة +5% لكل معزز. كما يزداد تقدم القنبلة +2,200 خلال أول 60 ثانية.',
  mapTitle: 'تخطيط الخريطة',
  mapDesc: 'انظر أدناه لتوزيع المنشآت الأربعة.',
  mapPhase1: 'أول 20 دقيقة: المنطقة الشمالية (+ القصر الذهبي) قابلة للاحتلال',
  mapPhase2: '20-60 دقيقة: جميع المنشآت قابلة للاحتلال',
  mapAlt: 'خريطة حرب منجم الذهب',
  carryoverTitle: 'استمرار تقدم القنبلة',
  carryoverItems: [
    'لكل منشأة حالة أولية محددة لتقدم القنبلة',
    'المنشآت المدمرة تُستبعد من الاحتلال لاحقاً',
    'التقدم وحالة التدمير تنتقل من الأسبوع 2 إلى الأسبوع 3',
    'التقدم وحالة التدمير تنتقل من الأسبوع 3 إلى الأسبوع 4',
    'القصر الذهبي يدخل وضع الحماية فوراً عند وصول التقدم إلى 0%',
  ],
  buffTitle: 'تأثيرات التعزيز',
  buffDesc: 'تُمنح تأثيرات حسب نقاط التدمير (التأثيرات تتراكم)',
  defenseBuffLabel: 'تعزيزات الدفاع',
  attackBuffLabel: 'تعزيزات الهجوم',
  buffCondition: 'الشرط',
  buffEffect: 'التأثير',
  defaultLabel: 'افتراضي',
  marchSpeed: 'سرعة المسيرة',
  defuseSpeed: 'سرعة الإبطال',
  plantSpeed: 'سرعة الزرع',
  deathRate: 'معدل الوفيات',
  defenseBuffs: [
    { condition: 'افتراضي', effect: 'سرعة المسيرة +20%' },
    { condition: 'نقاط التدمير > 1,010 قبل الأسبوع 3', effect: 'سرعة الإبطال +7.5%، الوفيات -15%' },
    { condition: 'نقاط التدمير > 1,250 قبل الأسبوع 3', effect: 'سرعة الإبطال +7.5%' },
    { condition: 'نقاط التدمير > 1,840 قبل الأسبوع 4', effect: 'الوفيات -5%' },
    { condition: 'نقاط التدمير > 3,500 قبل الأسبوع 4', effect: 'سرعة الإبطال +7.5%، الوفيات -15%' },
  ],
  attackBuffs: [
    { condition: 'افتراضي', effect: 'سرعة الزرع +30%' },
    { condition: 'نقاط التدمير < 260 قبل الأسبوع 3', effect: 'سرعة الزرع +7.5%، سرعة المسيرة +10%' },
    { condition: 'نقاط التدمير < 500 قبل الأسبوع 3', effect: 'سرعة الزرع +7.5%، الوفيات -15%' },
    { condition: 'نقاط التدمير < 1,740 قبل الأسبوع 4', effect: 'سرعة الزرع +7.5%، الوفيات -15%' },
    { condition: 'نقاط التدمير < 4,660 قبل الأسبوع 4', effect: 'الوفيات -5%' },
  ],
}

const contents: Record<string, RulesContent> = { ja, en, ko, 'zh-TW': zhTW, 'zh-CN': zhCN, ar }

export function getRulesContent(locale: string): RulesContent {
  return contents[locale] ?? contents['en']
}
