export default function StrategyPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">戦略の考え方</h2>
      <p className="text-sm text-gray-500">シナリオの根拠を説明するものです</p>

      {/* 前提 */}
      <Section title="前提" sub="以下が成立しないと、ゲームが成立しない">
        <div className="space-y-2">
          <Premise n="1">防衛側は、強い連盟・高火力プレイヤーが、攻撃側よりも多い</Premise>
          <Premise n="2">攻撃側は、中位連盟・中火力プレイヤーが、防衛側よりも多い</Premise>
          <Premise n="3">攻撃側と防衛側の、総合戦力はほとんど変わらない</Premise>
        </div>
      </Section>

      {/* 3週間の流れ */}
      <Section title="3週間の流れ">
        {/* GPを獲得する */}
        <div className="mb-5">
          <p className="font-semibold text-gray-800 mb-2">3Wに、攻撃側がGPを獲得する</p>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1">
            <p>防衛側が全員GPにいても、攻撃側が勝利する状況</p>
            <p>条件：❶か ❸の前提が崩れている（= 防衛側が強い / 防衛側が3週目で諦めた）</p>
          </div>
          <Tip>このパターンは想定しても意味がない</Tip>
        </div>

        {/* GPを獲得しない */}
        <p className="font-semibold text-gray-800 mb-3">3Wに、攻撃側がGPを獲得しない</p>
        <div className="space-y-3">
          <Scenario
            label="A"
            title="2Wに攻撃側が抑えて、バフを獲得する"
            desc="施設ごとに「爆弾の進行度」の目標を設定する状況"
            condition="わかりやすい目標（計画力）と連携（実行力）が必要"
            tip="他鯖と連携が上手にできないと難しい"
          />
          <Scenario
            label="B"
            title="2Wに攻撃側が実質勝利して、3Wにも実質勝利する"
            desc="防衛側の総力（中位）が減っている状況"
            condition="「勝負のタイミング」「敵との組み合わせ」を意識する"
            tip="この方針がよさそう"
          />
          <Scenario
            label="C"
            title="2Wに攻撃側が敗北して、3Wにも勝つ"
            desc="攻撃側のやる気（中位）が減っている状況"
            condition="相手の計画力・指揮・連携不足"
            tip="敵の油断を祈るのは最終手段。"
          />
        </div>
      </Section>

      {/* ① 施設数と有利不利 */}
      <Section title="① 施設数が少ない → 防衛側が有利">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-sm">
              <p className="font-semibold text-blue-700">前半（0〜20 min）</p>
              <p className="text-blue-600 mt-1">防衛側有利</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-sm">
              <p className="font-semibold text-red-700">後半（20〜60 min）</p>
              <p className="text-red-600 mt-1">参加数が多ければ攻撃側有利</p>
            </div>
          </div>

          <div className="space-y-1">
            <Tip>2W後半戦を意識：勝てる組み合わせを優先 = 兵士を減らさない（逃げる）のが大事</Tip>
            <Tip>3W前半戦を意識：北側施設が多いほど3W前半は戦いやすい = 2W前半は逃げてもいい</Tip>
          </div>

          <p className="font-semibold text-gray-800 mt-2 text-sm">週ごとの施設数と目標イメージ</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">タイミング</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">施設数</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">ポイント</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="px-3 py-2">2W 前半</td>
                  <td className="px-3 py-2">12施設</td>
                  <td className="px-3 py-2 text-gray-500">大都市の占拠は厳しい</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">2W 後半</td>
                  <td className="px-3 py-2">24施設 - 破壊済</td>
                  <td className="px-3 py-2 text-gray-500">大都市の占拠は厳しい</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">3W 前半</td>
                  <td className="px-3 py-2">20施設 - 破壊済</td>
                  <td className="px-3 py-2 text-gray-500">軍事要塞の占拠は厳しい</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">3W 後半</td>
                  <td className="px-3 py-2">40施設 - 破壊済</td>
                  <td className="px-3 py-2 text-gray-500">軍事要塞の占拠は厳しい</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">4W 前半</td>
                  <td className="px-3 py-2">20施設 + GP - 破壊済</td>
                  <td className="px-3 py-2 text-gray-500">GP戦闘があれば軍事要塞・大都市は容易い</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-semibold text-gray-800 text-sm">各週の目標目安</p>
          <div className="space-y-2">
            <WeekTarget week="2W" items="大都市 1-2/4（少なめ）+ 小型拠点 12-16/20" />
            <WeekTarget week="3W" items="軍事要塞 1-2/4（少なめ）+ 中型拠点 6-9/12 + 大都市・小型拠点 MAX" />
            <WeekTarget week="4W" items="GP狙いつつ、軍事要塞 + 中型拠点の残りを稼ぐ" />
          </div>
        </div>
      </Section>

      {/* ② GPをとらない勝利条件 */}
      <Section title="② GPをとらない勝利条件">
        <p className="text-sm text-gray-600 mb-3">4W終了時点で小型拠点 + 大都市は MAX を取る前提</p>

        <p className="font-semibold text-gray-800 text-sm mb-2">勝利ラインの組み合わせ</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">小型拠点</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">大都市</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">中型拠点</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">軍事要塞</th>
                <th className="text-right px-3 py-2 text-gray-500 font-medium">合計</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="px-3 py-2">40 x 20/20</td>
                <td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 12/12</td>
                <td className="px-3 py-2 font-semibold">496 x 1/4</td>
                <td className="px-3 py-2 text-right font-bold text-green-700">5,008</td>
              </tr>
              <tr>
                <td className="px-3 py-2">40 x 20/20</td>
                <td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 10/12</td>
                <td className="px-3 py-2 font-semibold">496 x 2/4</td>
                <td className="px-3 py-2 text-right font-bold text-green-700">5,002</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-semibold text-gray-800 text-sm mb-2">週ごとの目標イメージ</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">週</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">小型拠点</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">大都市</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">中型拠点</th>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">軍事要塞</th>
                <th className="text-right px-3 py-2 text-gray-500 font-medium">合計</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="px-3 py-2 font-medium">2W</td>
                <td className="px-3 py-2">40 x 15/20</td>
                <td className="px-3 py-2">175 x 1/4</td>
                <td className="px-3 py-2 text-gray-400">0/12</td>
                <td className="px-3 py-2 text-gray-400">0/4</td>
                <td className="px-3 py-2 text-right font-bold">775</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium" rowSpan={2}>3W</td>
                <td className="px-3 py-2">40 x 20/20</td>
                <td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 8/12</td>
                <td className="px-3 py-2 text-gray-400">0/4</td>
                <td className="px-3 py-2 text-right font-bold">3,508</td>
              </tr>
              <tr>
                <td className="px-3 py-2">40 x 20/20</td>
                <td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 6/12</td>
                <td className="px-3 py-2 font-semibold">496 x 1/4</td>
                <td className="px-3 py-2 text-right font-bold">3,502</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ③ 防衛側の勝利戦略 */}
      <Section title="③ 防衛側の勝利戦略" color="blue">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-blue-500 font-semibold mb-1">戦略</p>
              <p className="text-sm text-blue-800 font-semibold">「勝てる組み合わせ」で戦い続ける<br />前半（0-20 min）に攻撃側の兵士を減らす</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-blue-500 font-semibold mb-1">勝利条件</p>
              <p className="text-sm text-blue-800 font-semibold">3W終了時点で、施設の合計破壊値を40%以下に</p>
            </div>
          </div>

          <p className="font-semibold text-gray-800 text-sm">3つの条件</p>
          <div className="space-y-1.5">
            <div className="bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-700">事前に攻撃側の部隊を想定できる</div>
            <div className="bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-700">必ず勝利する組み合わせを指示できる</div>
            <div className="bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-700">常に移設して指示を実行できる</div>
          </div>

          <p className="font-semibold text-gray-800 text-sm">12部隊で防衛した場合のシミュレーション</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left px-3 py-2 text-blue-500 font-medium">タイミング</th>
                  <th className="text-left px-3 py-2 text-blue-500 font-medium">施設数</th>
                  <th className="text-left px-3 py-2 text-blue-500 font-medium">防衛可能</th>
                  <th className="text-left px-3 py-2 text-blue-500 font-medium">落とされる想定</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="px-3 py-2">2W 前半</td>
                  <td className="px-3 py-2">12施設</td>
                  <td className="px-3 py-2">12施設で下降</td>
                  <td className="px-3 py-2 font-semibold">0/12</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">2W 後半</td>
                  <td className="px-3 py-2">24施設</td>
                  <td className="px-3 py-2">12施設で下降</td>
                  <td className="px-3 py-2 font-semibold">6/12（50%想定）</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">3W 前半</td>
                  <td className="px-3 py-2">20施設</td>
                  <td className="px-3 py-2">12施設で下降</td>
                  <td className="px-3 py-2 font-semibold">2/6（50%想定）</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">3W 後半</td>
                  <td className="px-3 py-2">40施設</td>
                  <td className="px-3 py-2">12施設で下降</td>
                  <td className="px-3 py-2 font-semibold">10/20（50%想定）</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-semibold text-gray-800 text-sm">結果：3W終了で 18/40 施設を落とされた場合の惨敗パターン</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">ケース</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">内訳</th>
                  <th className="text-right px-3 py-2 text-gray-500 font-medium">合計</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="px-3 py-2">小型のみ</td>
                  <td className="px-3 py-2">小型拠点 40pt x 18</td>
                  <td className="px-3 py-2 text-right font-bold">720</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">混合</td>
                  <td className="px-3 py-2">小型 x 10 + 大都市 x 4 + 中型 x 4</td>
                  <td className="px-3 py-2 text-right font-bold">2,100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Tip>実質、攻撃側は負けていても 2,000pt くらいは取れる。5,000Ptには施設数が必要</Tip>
        </div>
      </Section>

      {/* ④ 攻撃側の勝利戦略 */}
      <Section title="④ 攻撃側の勝利戦略" color="red">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">防衛側戦略を妨害する</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-xs text-red-500 font-semibold mb-1">戦略</p>
              <p className="text-sm text-red-800 font-semibold">前半に勝てる相手を探して兵士を減らし続ける<br />後半に安pt施設を大量にGETする</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-xs text-red-500 font-semibold mb-1">勝利条件</p>
              <p className="text-sm text-red-800 font-semibold">施設の合計破壊値を 50%以上に</p>
            </div>
          </div>

        </div>
      </Section>

      {/* 戦術の準備 */}
      <Section title="戦術にいく前の準備">
        <div className="space-y-2">
          <PrepItem n="1">
            敵の中位連盟を、ちゃんと名前で味方陣営に共有して、<strong>「前半の標的・殲滅対象」</strong>として共有すること
          </PrepItem>
          <PrepItem n="2">
            戦力を分析して、中位〜上位戦力のプレイヤーの<strong>殲滅方法（組み合わせ）</strong>を考えること
          </PrepItem>
          <PrepItem n="3">
            「逃げる」を徹底するために、どこまで逃げていいか、<strong>施設ptのシミュレーション</strong>をすること
          </PrepItem>
        </div>
      </Section>

    </div>
  )
}

function Section({ title, sub, color, children }: { title: string; sub?: string; color?: 'blue' | 'red'; children: React.ReactNode }) {
  const borderClass = color === 'blue' ? 'border-l-blue-400' : color === 'red' ? 'border-l-red-400' : 'border-l-transparent'
  return (
    <section className={`bg-white rounded-xl border border-gray-200 p-6 border-l-4 ${borderClass}`}>
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      {sub && <p className="text-sm text-gray-500 mb-3">{sub}</p>}
      {!sub && <div className="mb-3" />}
      {children}
    </section>
  )
}

function Premise({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3">
      <span className="bg-gray-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{n}</span>
      <p className="text-sm text-gray-700">{children}</p>
    </div>
  )
}

function Scenario({ label, title, desc, condition, tip }: { label: string; title: string; desc: string; condition: string; tip?: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0">{label}</span>
        <div className="text-sm">
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-gray-600 mt-1">{desc}</p>
          <p className="text-gray-500 mt-1">条件：{condition}</p>
          {tip && <Tip>{tip}</Tip>}
        </div>
      </div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-amber-700 mt-2">
      <span className="font-bold mr-1">👉</span>{children}
    </p>
  )
}

function WeekTarget({ week, items }: { week: string; items: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5">
      <span className="text-xs font-bold text-gray-500 w-8">{week}</span>
      <span className="text-sm text-gray-700">{items}</span>
    </div>
  )
}

function PrepItem({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
      <span className="bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{n}</span>
      <p className="text-sm text-amber-800">{children}</p>
    </div>
  )
}
