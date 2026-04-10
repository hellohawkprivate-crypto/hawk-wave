export type StrategyContent = {
  heading: string
  subtitle: string
  // 前提
  premiseTitle: string
  premiseSub: string
  premises: string[]
  // 3週間の流れ
  flowTitle: string
  gpYes: string
  gpYesDesc: string
  gpYesCondition: string
  gpYesTip: string
  gpNo: string
  conditionLabel: string
  scenarioA: { title: string; desc: string; condition: string; tip: string }
  scenarioB: { title: string; desc: string; condition: string; tip: string }
  scenarioC: { title: string; desc: string; condition: string; tip: string }
  // ① 施設数
  section1Title: string
  firstHalf: string
  firstHalfAdv: string
  secondHalf: string
  secondHalfAdv: string
  tip1: string
  tip2: string
  weeklyFacilities: string
  timing: string
  facilities: string
  notes: string
  weeklyRows: { timing: string; facilities: string; notes: string }[]
  weeklyTarget: string
  weekTargets: { week: string; items: string }[]
  // ② GPなし勝利
  section2Title: string
  section2Desc: string
  victoryLine: string
  weeklyGoal: string
  week: string
  total: string
  // 施設名（テーブルヘッダー）
  fn: string[] // facilityNames short
  // ③ 防衛
  section3Title: string
  defStrategy: string
  defStrategyDesc: string
  defVictory: string
  defVictoryDesc: string
  defConditionsTitle: string
  defConditions: string[]
  defSimTitle: string
  defSimHeaders: string[]
  defSimRows: { timing: string; count: string; defend: string; lost: string }[]
  defResultTitle: string
  defResultHeaders: string[]
  defResultRows: { caseName: string; breakdown: string; total: string }[]
  defTip: string
  // ④ 攻撃
  section4Title: string
  atkDesc: string
  atkStrategy: string
  atkStrategyDesc: string
  atkVictory: string
  atkVictoryDesc: string
  // 準備
  prepTitle: string
  prepItems: string[]
}

const ja: StrategyContent = {
  heading: '戦略の考え方',
  subtitle: 'シナリオの根拠を説明するものです',
  premiseTitle: '前提',
  premiseSub: '以下が成立しないと、ゲームが成立しない',
  premises: [
    '防衛側は、強い連盟・高火力プレイヤーが、攻撃側よりも多い',
    '攻撃側は、中位連盟・中火力プレイヤーが、防衛側よりも多い',
    '攻撃側と防衛側の、総合戦力はほとんど変わらない',
  ],
  flowTitle: '3週間の流れ',
  gpYes: '3Wに、攻撃側がGPを獲得する',
  gpYesDesc: '防衛側が全員GPにいても、攻撃側が勝利する状況',
  gpYesCondition: '条件：❶か ❸の前提が崩れている（= 攻撃側が強い / 防衛側が3週目で諦めた）',
  gpYesTip: 'このパターンは想定しても意味がない',
  gpNo: '3Wに、攻撃側がGPを獲得しない',
  conditionLabel: '条件',
  scenarioA: { title: '2Wに攻撃側が抑えて、バフを獲得する', desc: '施設ごとに「爆弾の進行度」の目標を設定する状況', condition: 'わかりやすい目標（計画力）と連携（実行力）が必要', tip: '他鯖と連携が上手にできないと難しい' },
  scenarioB: { title: '2Wに攻撃側が実質勝利して、3Wにも実質勝利する', desc: '防衛側の総力（中位）が減っている状況', condition: '「勝負のタイミング」「敵との組み合わせ」を意識する', tip: 'この方針がよさそう' },
  scenarioC: { title: '2Wに攻撃側が敗北して、3Wにも勝つ', desc: '攻撃側のやる気（中位）が減っている状況', condition: '相手の計画力・指揮・連携不足', tip: '敵の油断を祈るのは最終手段。' },
  section1Title: '① 施設数が少ない → 防衛側が有利',
  firstHalf: '前半（0〜20 min）', firstHalfAdv: '防衛側有利',
  secondHalf: '後半（20〜60 min）', secondHalfAdv: '参加数が多ければ攻撃側有利',
  tip1: '2W後半戦を意識：勝てる組み合わせを優先 = 兵士を減らさない（逃げる）のが大事',
  tip2: '3W前半戦を意識：北側施設が多いほど3W前半は戦いやすい = 2W前半は逃げてもいい',
  weeklyFacilities: '週ごとの施設数と目標イメージ', timing: 'タイミング', facilities: '施設数', notes: 'ポイント',
  weeklyRows: [
    { timing: '2W 前半', facilities: '12施設', notes: '大都市の占拠は厳しい' },
    { timing: '2W 後半', facilities: '24施設 - 破壊済', notes: '大都市の占拠は厳しい' },
    { timing: '3W 前半', facilities: '20施設 - 破壊済', notes: '軍事要塞の占拠は厳しい' },
    { timing: '3W 後半', facilities: '40施設 - 破壊済', notes: '軍事要塞の占拠は厳しい' },
    { timing: '4W 前半', facilities: '20施設 + GP - 破壊済', notes: 'GP戦闘があれば軍事要塞・大都市は容易い' },
  ],
  weeklyTarget: '各週の目標目安',
  weekTargets: [
    { week: '2W', items: '大都市 1-2/4（少なめ）+ 小型拠点 12-16/20' },
    { week: '3W', items: '軍事要塞 1-2/4（少なめ）+ 中型拠点 6-9/12 + 大都市・小型拠点 MAX' },
    { week: '4W', items: 'GP狙いつつ、軍事要塞 + 中型拠点の残りを稼ぐ' },
  ],
  section2Title: '② GPをとらない勝利条件',
  section2Desc: '4W終了時点で小型拠点 + 大都市は MAX を取る前提',
  victoryLine: '勝利ラインの組み合わせ', weeklyGoal: '週ごとの目標イメージ', week: '週', total: '合計',
  fn: ['小型拠点', '大都市', '中型拠点', '軍事要塞'],
  section3Title: '③ 防衛側の勝利戦略',
  defStrategy: '戦略', defStrategyDesc: '「勝てる組み合わせ」で戦い続ける\n前半（0-20 min）に攻撃側の兵士を減らす',
  defVictory: '勝利条件', defVictoryDesc: '3W終了時点で、施設の合計破壊値を40%以下に',
  defConditionsTitle: '3つの条件',
  defConditions: ['事前に攻撃側の部隊を想定できる', '必ず勝利する組み合わせを指示できる', '常に移設して指示を実行できる'],
  defSimTitle: '12部隊で防衛した場合のシミュレーション',
  defSimHeaders: ['タイミング', '施設数', '防衛可能', '落とされる想定'],
  defSimRows: [
    { timing: '2W 前半', count: '12施設', defend: '12施設で下降', lost: '0/12' },
    { timing: '2W 後半', count: '24施設', defend: '12施設で下降', lost: '6/12（50%想定）' },
    { timing: '3W 前半', count: '20施設', defend: '12施設で下降', lost: '2/6（50%想定）' },
    { timing: '3W 後半', count: '40施設', defend: '12施設で下降', lost: '10/20（50%想定）' },
  ],
  defResultTitle: '結果：3W終了で 18/40 施設を落とされた場合の惨敗パターン',
  defResultHeaders: ['ケース', '内訳', '合計'],
  defResultRows: [
    { caseName: '小型のみ', breakdown: '小型拠点 40pt x 18', total: '720' },
    { caseName: '混合', breakdown: '小型 x 10 + 大都市 x 4 + 中型 x 4', total: '2,100' },
  ],
  defTip: '実質、攻撃側は負けていても 2,000pt くらいは取れる。5,000Ptには施設数が必要',
  section4Title: '④ 攻撃側の勝利戦略',
  atkDesc: '防衛側戦略を妨害する',
  atkStrategy: '戦略', atkStrategyDesc: '前半に勝てる相手を探して兵士を減らし続ける\n後半に安pt施設を大量にGETする',
  atkVictory: '勝利条件', atkVictoryDesc: '施設の合計破壊値を 50%以上に',
  prepTitle: '戦術にいく前の準備',
  prepItems: [
    '敵の中位連盟を、ちゃんと名前で味方陣営に共有して、「前半の標的・殲滅対象」として共有すること',
    '戦力を分析して、中位〜上位戦力のプレイヤーの殲滅方法（組み合わせ）を考えること',
    '「逃げる」を徹底するために、どこまで逃げていいか、施設ptのシミュレーションをすること',
  ],
}

const en: StrategyContent = {
  heading: 'Strategic Thinking',
  subtitle: 'Explains the rationale behind our scenarios',
  premiseTitle: 'Premises',
  premiseSub: 'The game only works if these hold true',
  premises: [
    'Defense has more strong alliances and high-power players than Attack',
    'Attack has more mid-tier alliances and mid-power players than Defense',
    'Total power is roughly equal between Attack and Defense',
  ],
  flowTitle: '3-Week Flow',
  gpYes: 'W3: Attack captures Golden Palace',
  gpYesDesc: 'Attack wins even if all Defense is at GP',
  gpYesCondition: 'Condition: Premise ❶ or ❸ has broken down (= Defense is too strong / Defense gave up by Week 3)',
  gpYesTip: 'No point planning for this scenario',
  gpNo: 'W3: Attack does NOT capture Golden Palace',
  conditionLabel: 'Condition',
  scenarioA: { title: 'W2: Attack holds back to earn buffs', desc: 'Setting bomb progress targets per facility', condition: 'Requires clear goals (planning) and coordination (execution)', tip: 'Hard without good cross-server coordination' },
  scenarioB: { title: 'W2: Attack wins effectively, repeats in W3', desc: "Defense's mid-tier forces are depleted", condition: 'Focus on timing and favorable matchups', tip: 'This approach looks most promising' },
  scenarioC: { title: 'W2: Attack loses, still wins in W3', desc: "Attack's mid-tier motivation drops", condition: "Enemy's poor planning/command/coordination", tip: "Hoping for enemy mistakes is a last resort." },
  section1Title: '① Fewer facilities → Defense advantage',
  firstHalf: 'First half (0–20 min)', firstHalfAdv: 'Defense advantage',
  secondHalf: 'Second half (20–60 min)', secondHalfAdv: 'Attack advantage with more participants',
  tip1: 'Focus on W2 second half: prioritize winnable matchups = preserve troops (retreat)',
  tip2: 'Focus on W3 first half: more northern facilities = easier W3 first half = retreating in W2 first half is OK',
  weeklyFacilities: 'Weekly facility count & targets', timing: 'Timing', facilities: 'Facilities', notes: 'Notes',
  weeklyRows: [
    { timing: 'W2 1st half', facilities: '12', notes: 'Hard to capture Large Cities' },
    { timing: 'W2 2nd half', facilities: '24 - destroyed', notes: 'Hard to capture Large Cities' },
    { timing: 'W3 1st half', facilities: '20 - destroyed', notes: 'Hard to capture Military Fortresses' },
    { timing: 'W3 2nd half', facilities: '40 - destroyed', notes: 'Hard to capture Military Fortresses' },
    { timing: 'W4 1st half', facilities: '20 + GP - destroyed', notes: 'With GP battle, Fortresses/Cities are easier' },
  ],
  weeklyTarget: 'Weekly targets',
  weekTargets: [
    { week: '2W', items: 'Large City 1-2/4 (low) + Small Stronghold 12-16/20' },
    { week: '3W', items: 'Military Fortress 1-2/4 (low) + Medium Stronghold 6-9/12 + Cities/Small MAX' },
    { week: '4W', items: 'Aim for GP while securing remaining Fortresses + Medium Strongholds' },
  ],
  section2Title: '② Victory without Golden Palace',
  section2Desc: 'Assuming Small Strongholds + Large Cities are MAX by end of W4',
  victoryLine: 'Victory line combinations', weeklyGoal: 'Weekly goal breakdown', week: 'Week', total: 'Total',
  fn: ['Small', 'Large City', 'Medium', 'Fortress'],
  section3Title: '③ Defense victory strategy',
  defStrategy: 'Strategy', defStrategyDesc: 'Fight with winning matchups\nReduce Attack troops in first half (0-20 min)',
  defVictory: 'Win condition', defVictoryDesc: 'Keep total destruction below 40% by end of W3',
  defConditionsTitle: '3 conditions needed',
  defConditions: ['Anticipate Attack compositions', 'Direct winning matchups', 'Relocate and execute orders consistently'],
  defSimTitle: 'Simulation: defending with 12 squads',
  defSimHeaders: ['Timing', 'Facilities', 'Defended', 'Expected losses'],
  defSimRows: [
    { timing: 'W2 1st', count: '12', defend: '12 decreasing', lost: '0/12' },
    { timing: 'W2 2nd', count: '24', defend: '12 decreasing', lost: '6/12 (50%)' },
    { timing: 'W3 1st', count: '20', defend: '12 decreasing', lost: '2/6 (50%)' },
    { timing: 'W3 2nd', count: '40', defend: '12 decreasing', lost: '10/20 (50%)' },
  ],
  defResultTitle: 'Result: 18/40 lost by end of W3 (worst case)',
  defResultHeaders: ['Case', 'Breakdown', 'Total'],
  defResultRows: [
    { caseName: 'Small only', breakdown: 'Small 40pt x 18', total: '720' },
    { caseName: 'Mixed', breakdown: 'Small x10 + City x4 + Medium x4', total: '2,100' },
  ],
  defTip: 'Even when losing, Attack can get ~2,000pt. Reaching 5,000pt requires facility count',
  section4Title: '④ Attack victory strategy',
  atkDesc: 'Disrupt Defense strategy',
  atkStrategy: 'Strategy', atkStrategyDesc: 'Find winnable targets to deplete their troops\nMass-capture low-pt facilities in second half',
  atkVictory: 'Win condition', atkVictoryDesc: 'Total destruction ≧ 50%',
  prepTitle: 'Pre-battle preparation',
  prepItems: [
    'Share enemy mid-tier alliance names with allies as "first-half targets"',
    'Analyze power and plan elimination methods (matchups) for mid-to-top players',
    'Simulate facility pt to determine how far we can retreat',
  ],
}

const ko: StrategyContent = {
  heading: '전략적 사고',
  subtitle: '시나리오의 근거를 설명합니다',
  premiseTitle: '전제',
  premiseSub: '이하가 성립하지 않으면 게임이 성립하지 않음',
  premises: [
    '방어측은 강한 연맹·고화력 플레이어가 공격측보다 많다',
    '공격측은 중위 연맹·중화력 플레이어가 방어측보다 많다',
    '공격측과 방어측의 총합 전력은 거의 동일하다',
  ],
  flowTitle: '3주간의 흐름',
  gpYes: '3W에 공격측이 GP를 획득',
  gpYesDesc: '방어측이 전원 GP에 있어도 공격측이 승리하는 상황',
  gpYesCondition: '조건: ❶ 또는 ❸의 전제가 무너짐 (= 방어측이 강함 / 방어측이 3주차에 포기)',
  gpYesTip: '이 패턴은 상정해도 의미 없음',
  gpNo: '3W에 공격측이 GP를 획득하지 않음',
  conditionLabel: '조건',
  scenarioA: { title: '2W에 공격측이 억제하고 버프를 획득', desc: '시설별 "폭탄 진행도" 목표를 설정하는 상황', condition: '명확한 목표(계획력)와 연계(실행력) 필요', tip: '타 서버와 연계가 어려우면 힘듦' },
  scenarioB: { title: '2W에 공격측이 실질 승리, 3W에도 실질 승리', desc: '방어측의 총력(중위)이 줄어든 상황', condition: '"승부 타이밍"과 "적과의 조합"을 의식', tip: '이 방침이 좋아 보인다' },
  scenarioC: { title: '2W에 공격측이 패배, 3W에도 이김', desc: '공격측의 의욕(중위)이 줄어든 상황', condition: '상대의 계획력·지휘·연계 부족', tip: '적의 방심을 기도하는 것은 최후의 수단.' },
  section1Title: '① 시설 수가 적다 → 방어측 유리',
  firstHalf: '전반 (0~20분)', firstHalfAdv: '방어측 유리',
  secondHalf: '후반 (20~60분)', secondHalfAdv: '참가 수가 많으면 공격측 유리',
  tip1: '2W 후반전 의식: 이길 수 있는 조합 우선 = 병사를 줄이지 않기(도망)가 중요',
  tip2: '3W 전반전 의식: 북쪽 시설이 많을수록 3W 전반이 싸우기 쉬움 = 2W 전반은 도망쳐도 OK',
  weeklyFacilities: '주별 시설 수 및 목표', timing: '타이밍', facilities: '시설 수', notes: '포인트',
  weeklyRows: [
    { timing: '2W 전반', facilities: '12시설', notes: '대형 도시 점거 어려움' },
    { timing: '2W 후반', facilities: '24시설 - 파괴', notes: '대형 도시 점거 어려움' },
    { timing: '3W 전반', facilities: '20시설 - 파괴', notes: '군사 요새 점거 어려움' },
    { timing: '3W 후반', facilities: '40시설 - 파괴', notes: '군사 요새 점거 어려움' },
    { timing: '4W 전반', facilities: '20시설 + GP - 파괴', notes: 'GP 전투 시 요새·도시 점거 용이' },
  ],
  weeklyTarget: '주별 목표 기준',
  weekTargets: [
    { week: '2W', items: '대형 도시 1-2/4(적게) + 소형 요새 12-16/20' },
    { week: '3W', items: '군사 요새 1-2/4(적게) + 중형 요새 6-9/12 + 도시·소형 MAX' },
    { week: '4W', items: 'GP 노리면서 군사 요새 + 중형 요새 나머지 확보' },
  ],
  section2Title: '② GP 없이 승리 조건',
  section2Desc: '4W 종료 시 소형 요새 + 대형 도시는 MAX 전제',
  victoryLine: '승리 라인 조합', weeklyGoal: '주별 목표 이미지', week: '주', total: '합계',
  fn: ['소형', '대도시', '중형', '요새'],
  section3Title: '③ 방어측 승리 전략',
  defStrategy: '전략', defStrategyDesc: '"이기는 조합"으로 계속 싸운다\n전반(0-20분)에 공격측 병사를 줄인다',
  defVictory: '승리 조건', defVictoryDesc: '3W 종료 시 시설 합계 파괴값을 40% 이하로',
  defConditionsTitle: '3가지 조건',
  defConditions: ['사전에 공격측 부대를 예측할 수 있다', '반드시 승리하는 조합을 지시할 수 있다', '항상 이동하여 지시를 실행할 수 있다'],
  defSimTitle: '12부대로 방어 시 시뮬레이션',
  defSimHeaders: ['타이밍', '시설 수', '방어 가능', '함락 예상'],
  defSimRows: [
    { timing: '2W 전반', count: '12시설', defend: '12시설 하강', lost: '0/12' },
    { timing: '2W 후반', count: '24시설', defend: '12시설 하강', lost: '6/12 (50%)' },
    { timing: '3W 전반', count: '20시설', defend: '12시설 하강', lost: '2/6 (50%)' },
    { timing: '3W 후반', count: '40시설', defend: '12시설 하강', lost: '10/20 (50%)' },
  ],
  defResultTitle: '결과: 3W 종료 시 18/40 함락 (최악)',
  defResultHeaders: ['케이스', '내역', '합계'],
  defResultRows: [
    { caseName: '소형만', breakdown: '소형 40pt x 18', total: '720' },
    { caseName: '혼합', breakdown: '소형 x10 + 도시 x4 + 중형 x4', total: '2,100' },
  ],
  defTip: '실질적으로 공격측은 지고 있어도 ~2,000pt 획득 가능. 5,000Pt에는 시설 수가 필요',
  section4Title: '④ 공격측 승리 전략',
  atkDesc: '방어측 전략을 방해',
  atkStrategy: '전략', atkStrategyDesc: '전반에 이길 상대를 찾아 병사를 줄인다\n후반에 저pt 시설을 대량 GET',
  atkVictory: '승리 조건', atkVictoryDesc: '시설 합계 파괴값 50% 이상',
  prepTitle: '전술 전 준비',
  prepItems: [
    '적 중위 연맹을 이름으로 아군에 공유하여 "전반 표적·섬멸 대상"으로 공유',
    '전력 분석 후 중~상위 플레이어 섬멸 방법(조합) 검토',
    '"도망"을 철저히 하기 위해 어디까지 도망쳐도 되는지 시설 pt 시뮬레이션',
  ],
}

// zh-TW, zh-CN, ar は英語ベースで翻訳
const zhTW: StrategyContent = {
  ...en,
  heading: '戰略思維',
  subtitle: '說明場景分析的依據',
  premiseTitle: '前提', premiseSub: '以下條件不成立，遊戲就無法進行',
  premises: ['防守方的強力聯盟·高火力玩家比進攻方多', '進攻方的中位聯盟·中火力玩家比防守方多', '進攻方與防守方的總戰力幾乎相同'],
  flowTitle: '3週流程', gpYes: '第3週：進攻方獲得掘金城', gpYesDesc: '即使防守方全員在GP，進攻方仍勝利', gpYesCondition: '條件：❶或❸的前提崩潰', gpYesTip: '無需預想此模式', gpNo: '第3週：進攻方未獲得掘金城', conditionLabel: '條件',
  scenarioA: { title: '2W進攻方壓制並獲得增益', desc: '為每個設施設定炸彈進度目標', condition: '需要明確目標（規劃力）和協調（執行力）', tip: '跨服協調不佳則困難' },
  scenarioB: { title: '2W進攻方實質勝利，3W再次勝利', desc: '防守方中位戰力減少', condition: '意識「勝負時機」和「敵方搭配」', tip: '這個方針看起來最好' },
  scenarioC: { title: '2W進攻方失敗，3W仍獲勝', desc: '進攻方中位士氣下降', condition: '對手規劃力·指揮·協調不足', tip: '祈禱敵人大意是最後手段。' },
  section1Title: '① 設施少 → 防守方有利', firstHalf: '前半（0~20分鐘）', firstHalfAdv: '防守方有利', secondHalf: '後半（20~60分鐘）', secondHalfAdv: '人數多則進攻方有利',
  tip1: '意識2W後半：優先可勝搭配 = 不要減少兵力（撤退）', tip2: '意識3W前半：北側設施越多3W前半越有利 = 2W前半可以撤退',
  weeklyFacilities: '每週設施數與目標', timing: '時間', facilities: '設施數', notes: '要點',
  weeklyTarget: '每週目標基準', fn: ['小型', '大城市', '中型', '要塞'],
  section2Title: '② 不拿掘金城的勝利條件', section2Desc: '4W結束時小型據點+大城市取得MAX為前提', victoryLine: '勝利線組合', weeklyGoal: '每週目標', week: '週', total: '合計',
  section3Title: '③ 防守方勝利戰略', defStrategy: '戰略', defStrategyDesc: '用「必勝搭配」持續戰鬥\n前半（0-20分鐘）減少進攻方兵力', defVictory: '勝利條件', defVictoryDesc: '3W結束時設施合計破壞值控制在40%以下',
  defConditionsTitle: '3個條件', defConditions: ['能預判進攻方部隊', '能指揮必勝搭配', '能持續遷城執行指令'],
  defSimTitle: '12部隊防守模擬', defSimHeaders: ['時間', '設施數', '可防守', '預計失守'],
  defResultTitle: '結果：3W結束被攻陷18/40設施（最慘）', defResultHeaders: ['情況', '明細', '合計'],
  defTip: '實際上進攻方即使落後也能拿到~2,000pt。達到5,000pt需要設施數量',
  section4Title: '④ 進攻方勝利戰略', atkDesc: '妨礙防守方戰略', atkStrategy: '戰略', atkStrategyDesc: '前半找可勝對手持續削減兵力\n後半大量搶佔低分設施', atkVictory: '勝利條件', atkVictoryDesc: '設施合計破壞值 ≧ 50%',
  prepTitle: '戰術前準備', prepItems: ['將敵方中位聯盟按名字分享給我方作為「前半目標」', '分析戰力，考慮中~上位玩家的殲滅方法（搭配）', '為徹底「撤退」，模擬設施pt確定可退範圍'],
}

const zhCN: StrategyContent = {
  ...zhTW,
  heading: '战略思维', subtitle: '说明场景分析的依据',
  premiseTitle: '前提', premiseSub: '以下条件不成立，游戏就无法进行',
  premises: ['防守方的强力联盟·高火力玩家比进攻方多', '进攻方的中位联盟·中火力玩家比防守方多', '进攻方与防守方的总战力几乎相同'],
  flowTitle: '3周流程', gpYes: '第3周：进攻方获得掘金城', gpYesDesc: '即使防守方全员在GP，进攻方仍胜利', gpYesCondition: '条件：❶或❸的前提崩溃', gpYesTip: '无需预想此模式', gpNo: '第3周：进攻方未获得掘金城', conditionLabel: '条件',
  scenarioA: { title: '2W进攻方压制并获得增益', desc: '为每个设施设定炸弹进度目标', condition: '需要明确目标（规划力）和协调（执行力）', tip: '跨服协调不佳则困难' },
  scenarioB: { title: '2W进攻方实质胜利，3W再次胜利', desc: '防守方中位战力减少', condition: '意识「胜负时机」和「敌方搭配」', tip: '这个方针看起来最好' },
  scenarioC: { title: '2W进攻方失败，3W仍获胜', desc: '进攻方中位士气下降', condition: '对手规划力·指挥·协调不足', tip: '祈祷敌人大意是最后手段。' },
  section1Title: '① 设施少 → 防守方有利', firstHalf: '前半（0~20分钟）', firstHalfAdv: '防守方有利', secondHalf: '后半（20~60分钟）', secondHalfAdv: '人数多则进攻方有利',
  tip1: '意识2W后半：优先可胜搭配 = 不要减少兵力（撤退）', tip2: '意识3W前半：北侧设施越多3W前半越有利 = 2W前半可以撤退',
  weeklyFacilities: '每周设施数与目标', fn: ['小型', '大城市', '中型', '要塞'],
  section2Title: '② 不拿掘金城的胜利条件', section2Desc: '4W结束时小型据点+大城市取得MAX为前提', victoryLine: '胜利线组合', weeklyGoal: '每周目标',
  section3Title: '③ 防守方胜利战略', defStrategy: '战略', defStrategyDesc: '用「必胜搭配」持续战斗\n前半（0-20分钟）减少进攻方兵力', defVictory: '胜利条件', defVictoryDesc: '3W结束时设施合计破坏值控制在40%以下',
  defConditionsTitle: '3个条件', defConditions: ['能预判进攻方部队', '能指挥必胜搭配', '能持续迁城执行指令'],
  defSimTitle: '12部队防守模拟', defSimHeaders: ['时间', '设施数', '可防守', '预计失守'],
  defResultTitle: '结果：3W结束被攻陷18/40设施（最惨）', defResultHeaders: ['情况', '明细', '合计'],
  defTip: '实际上进攻方即使落后也能拿到~2,000pt。达到5,000pt需要设施数量',
  section4Title: '④ 进攻方胜利战略', atkDesc: '妨碍防守方战略', atkStrategy: '战略', atkStrategyDesc: '前半找可胜对手持续削减兵力\n后半大量抢占低分设施', atkVictory: '胜利条件', atkVictoryDesc: '设施合计破坏值 ≧ 50%',
  prepTitle: '战术前准备', prepItems: ['将敌方中位联盟按名字分享给我方作为「前半目标」', '分析战力，考虑中~上位玩家的歼灭方法（搭配）', '为彻底「撤退」，模拟设施pt确定可退范围'],
}

const ar: StrategyContent = {
  ...en,
  heading: 'التفكير الاستراتيجي', subtitle: 'شرح أساس السيناريوهات',
  premiseTitle: 'المقدمات', premiseSub: 'اللعبة لا تعمل بدون هذه الشروط',
  premises: ['الدفاع لديه تحالفات قوية ولاعبون أقوياء أكثر', 'الهجوم لديه تحالفات ولاعبون متوسطون أكثر', 'القوة الإجمالية متساوية تقريباً'],
  flowTitle: 'مسار 3 أسابيع', gpYes: 'الأسبوع 3: الهجوم يستولي على القصر الذهبي', gpYesDesc: 'الهجوم يفوز حتى لو كل الدفاع في القصر', gpYesCondition: 'الشرط: المقدمة ❶ أو ❸ انهارت', gpYesTip: 'لا فائدة من التخطيط لهذا', gpNo: 'الأسبوع 3: الهجوم لا يستولي على القصر', conditionLabel: 'الشرط',
  section1Title: '① منشآت أقل → ميزة للدفاع', firstHalf: 'النصف الأول (0-20 دقيقة)', firstHalfAdv: 'ميزة الدفاع', secondHalf: 'النصف الثاني (20-60 دقيقة)', secondHalfAdv: 'ميزة الهجوم مع مشاركين أكثر',
  section2Title: '② الفوز بدون القصر الذهبي', section3Title: '③ استراتيجية فوز الدفاع', section4Title: '④ استراتيجية فوز الهجوم',
  atkDesc: 'تعطيل استراتيجية الدفاع', prepTitle: 'التحضير قبل التكتيكات',
  prepItems: ['مشاركة تحالفات العدو المتوسطة بالاسم كـ"أهداف النصف الأول"', 'تحليل القوة والتخطيط لطرق القضاء على اللاعبين المتوسطين-الأقوياء', 'محاكاة نقاط المنشآت لتحديد مدى إمكانية الانسحاب'],
}

const contents: Record<string, StrategyContent> = { ja, en, ko, 'zh-TW': zhTW, 'zh-CN': zhCN, ar }

export function getStrategyContent(locale: string): StrategyContent {
  return contents[locale] ?? contents['en']
}
