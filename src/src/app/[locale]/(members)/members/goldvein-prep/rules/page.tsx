export default function RulesPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900">金脈攻防戦 ルール</h2>

      {/* 基礎情報 */}
      <Section title="基礎情報">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-blue-500 mb-1">防衛側（3サーバー）</p>
            <p className="text-lg font-bold text-blue-800">#606 · #625 · #676</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-red-500 mb-1">攻撃側（5サーバー）</p>
            <p className="text-lg font-bold text-red-800">#549 · #566 · #600 · #621 · #633</p>
          </div>
        </div>
      </Section>

      {/* 戦闘スケジュール */}
      <Section title="戦闘スケジュール">
        <p className="text-sm text-gray-600 mb-3">3回 × 60分の戦闘</p>
        <div className="space-y-2">
          {[
            { week: 'Week 2', date: '4月11日', time: 'SVT 12:00 - 13:00' },
            { week: 'Week 3', date: '4月18日', time: 'SVT 12:00 - 13:00' },
            { week: 'Week 4', date: '4月25日', time: 'SVT 12:00 - 13:00' },
          ].map((s) => (
            <div key={s.week} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
              <span className="text-xs font-semibold text-gray-500 w-16">{s.week}</span>
              <span className="text-gray-800 font-medium">{s.date}</span>
              <span className="text-gray-500 text-sm">{s.time}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 勝利条件 */}
      <Section title="勝利条件">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Week4終了後に、攻撃側の<strong>「破壊値」が5,001 Pt</strong>を超えていたら<strong>攻撃側の勝利</strong>、
            下回ったら<strong>防衛側の勝利</strong>。
          </p>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          攻撃側は施設を破壊したときに、施設カテゴリに応じた「破壊値」を獲得する。
        </p>
      </Section>

      {/* 施設のステータス */}
      <Section title="施設のステータス">
        <p className="text-sm text-gray-600 mb-3">
          施設には「爆弾設置の進行度」というパラメータがあり、進行度が最大値（100,000 = 100%）になると施設が「破壊」と判定される。
        </p>
        <div className="space-y-2">
          {[
            { status: '未占領', desc: 'だれも占領していない', color: 'bg-gray-100 text-gray-700' },
            { status: '爆弾設置', desc: '攻撃側が占領 → 進行度が上がる', color: 'bg-red-50 text-red-700' },
            { status: '爆弾解除', desc: '防御側が占領 → 進行度が下がる', color: 'bg-blue-50 text-blue-700' },
          ].map((s) => (
            <div key={s.status} className={`flex items-center gap-4 rounded-lg px-4 py-3 ${s.color}`}>
              <span className="font-semibold text-sm w-20">{s.status}</span>
              <span className="text-sm">{s.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 施設一覧 */}
      <Section title="施設一覧（5種類 合計41個）">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">施設</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">個数</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">破壊値</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">占領可能週</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">砲塔</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">攻城強化装置</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: '小型拠点', count: 20, pt: 40, weeks: 'Week2〜4', turret: 0, siege: 0 },
                { name: '大都市', count: 4, pt: 175, weeks: 'Week2〜4', turret: 2, siege: 0 },
                { name: '中型拠点', count: 12, pt: 251, weeks: 'Week3〜4', turret: 0, siege: 0 },
                { name: '軍事要塞', count: 4, pt: 496, weeks: 'Week3〜4', turret: 2, siege: 1 },
                { name: 'ゴールデンパレス', count: 1, pt: 3505, weeks: 'Week4', turret: 4, siege: 2 },
              ].map((f) => (
                <tr key={f.name} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">{f.name}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{f.count}</td>
                  <td className="px-4 py-2 text-right tabular-nums font-semibold">{f.pt.toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-600">{f.weeks}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{f.turret}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{f.siege}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 爆弾設置/解除の速度 */}
      <Section title="爆弾設置/解除の速度">
        <p className="text-sm text-gray-600 mb-3">
          占領開始からの<strong>駐留時間のみ</strong>に依存する。駐留部隊数は関係ない。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">経過時間</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">速度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2 text-gray-700">占領開始から120秒まで</td>
                <td className="px-4 py-2 text-right font-semibold tabular-nums">93 / sec</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700">占領開始から121秒以降</td>
                <td className="px-4 py-2 text-right font-semibold tabular-nums">37 / sec</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 砲塔・攻城強化装置 */}
      <Section title="砲塔・攻城強化装置">
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">砲塔</p>
            <p className="text-sm text-gray-600">
              砲塔占領中は、1つにつき爆弾設置/解除の速度 <strong>+5%</strong>
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">攻城強化装置</p>
            <p className="text-sm text-gray-600">
              占領中は、1つにつき爆弾設置/解除の速度 <strong>+5%</strong>。
              さらに占領直後から60秒間は「爆弾の進行度」が <strong>+2,200</strong> 増加。
            </p>
          </div>
        </div>
      </Section>

      {/* マップ配置 */}
      <Section title="マップ配置">
        <div className="space-y-4 text-sm text-gray-600">
          <p>4種類の施設（小型拠点・大都市・中型拠点・軍事要塞）の配置は以下参照。</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>開始から20分</strong>：北側エリア（+ ゴールデンパレス）が占領可能<br />
              <strong>20分から60分</strong>：全ての施設が占領可能
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/goldvein-map.png"
            alt="金脈攻防戦 マップ配置図"
            className="w-4/5 mx-auto rounded-lg border border-gray-200"
          />
        </div>
      </Section>

      {/* 爆弾の進行度 */}
      <Section title="爆弾の進行度の引き継ぎ">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            すべての施設には「爆弾の進行度」の初期状態が決まっている
          </li>
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            破壊された施設は、以降の占領・破壊の対象外となる
          </li>
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            Week2終了後の進行度・破壊状態は<strong>Week3に引き継がれる</strong>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            Week3終了後の進行度・破壊状態は<strong>Week4に引き継がれる</strong>
          </li>
          <li className="flex gap-2">
            <span className="text-gray-400">•</span>
            ゴールデンパレスは「進行度0%」になると即保護状態になり、攻撃不可能になる
          </li>
        </ul>
      </Section>

      {/* バフ効果 */}
      <Section title="バフ効果">
        <p className="text-sm text-gray-500 mb-4">破壊値に応じて効果が付与される（効果は積み重ね）</p>

        {/* 防衛側 */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-blue-700 mb-2">防衛側バフ</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left px-4 py-2 text-blue-500 font-medium">条件</th>
                  <th className="text-left px-4 py-2 text-blue-500 font-medium">効果</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { condition: 'デフォルト', effect: '行軍速度 +20%' },
                  { condition: 'Week3開始前の破壊値 > 1,010', effect: '爆弾解除速度 +7.5%、兵士戦死率 -15%' },
                  { condition: 'Week3開始前の破壊値 > 1,250', effect: '爆弾解除速度 +7.5%' },
                  { condition: 'Week4開始前の破壊値 > 1,840', effect: '兵士戦死率 -5%' },
                  { condition: 'Week4開始前の破壊値 > 3,500', effect: '爆弾解除速度 +7.5%、兵士戦死率 -15%' },
                ].map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{b.condition}</td>
                    <td className="px-4 py-2 text-gray-900 font-medium">{b.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 攻撃側 */}
        <div>
          <h4 className="text-sm font-semibold text-red-700 mb-2">攻撃側バフ</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="text-left px-4 py-2 text-red-500 font-medium">条件</th>
                  <th className="text-left px-4 py-2 text-red-500 font-medium">効果</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { condition: 'デフォルト', effect: '爆弾設置速度 +30%' },
                  { condition: 'Week3開始前の破壊値 < 260', effect: '爆弾設置速度 +7.5%、行軍速度 +10%' },
                  { condition: 'Week3開始前の破壊値 < 500', effect: '爆弾設置速度 +7.5%、兵士戦死率 -15%' },
                  { condition: 'Week4開始前の破壊値 < 1,740', effect: '爆弾設置速度 +7.5%、兵士戦死率 -15%' },
                  { condition: 'Week4開始前の破壊値 < 4,660', effect: '兵士戦死率 -5%' },
                ].map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{b.condition}</td>
                    <td className="px-4 py-2 text-gray-900 font-medium">{b.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </div>
  )
}

// セクションコンポーネント
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </section>
  )
}
