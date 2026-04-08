export default function GuidePage() {
  return (
    <div className="space-y-3">

      {/* タイトル */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl px-5 py-4 text-white flex items-center justify-between">
        <div>
          <p className="font-bold">金脈攻防戦</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-blue-500/80 px-3 py-0.5 rounded-full text-sm">防衛 (3)</span>
            <span className="text-sm">vs</span>
            <span className="bg-red-500/80 px-3 py-0.5 rounded-full text-sm">攻撃 (5)</span>
          </div>
        </div>
        <Bubble white>633は「攻撃」です！</Bubble>
      </div>

      {/* スケジュール */}
      <Row>
        <Info>
          <Label>スケジュール</Label>
          <p>3週間かけて 41個の施設を争う。</p>
          <div className="flex gap-2 mt-2">
            {[
              { week: '1W', count: 24 },
              { week: '2W', count: 40 },
              { week: '3W', count: 41 },
            ].map((w) => (
              <span key={w.week} className="bg-gray-100 rounded-lg px-3 py-1 text-sm font-bold text-gray-700">
                {w.week}: <span className="text-amber-600">{w.count}</span>
              </span>
            ))}
          </div>
        </Info>
        <Bubble>毎週、新しい施設がオープン！</Bubble>
      </Row>

      {/* 勝利条件 */}
      <Row>
        <Info>
          <Label>勝利条件：≧ 5,001 pt</Label>
          <p>全施設の合計は 10,001 pt。内側の施設ほど高ポイント！</p>
        </Info>
        <Bubble>半分のPtを取れば勝ち！ 敵の高火力は中心にくるぞ〜！</Bubble>
      </Row>

      {/* 大事な役割 */}
      <Row>
        <Info>
          <Label>すべての人に、大事な役割がある！</Label>
          <div className="space-y-1.5 mt-1">
            <div className="bg-purple-50 text-purple-700 rounded-lg px-3 py-2 text-sm font-semibold">内側：火力組が強敵を引きつける</div>
            <div className="bg-green-50 text-green-700 rounded-lg px-3 py-2 text-sm font-semibold">外側：みんなで施設を大量占拠！</div>
          </div>
        </Info>
        <Bubble>
          計算した！外側をシッカリとれば勝てる！
          戦力不問！ 5人でも動ける部隊がいるだけで戦況が大きく変わる！
          来たれ戦士！
        </Bubble>
      </Row>

      {/* ポイント */}
      <Row>
        <Info>
          <Label>ポイント（前半は敵を選ぶ / 逃げる）</Label>
          <div className="space-y-1.5 mt-1">
            <div className="bg-sky-50 text-sky-700 rounded-lg px-3 py-2 text-sm font-semibold">0〜20 min：北側エリア</div>
            <div className="bg-orange-50 text-orange-700 rounded-lg px-3 py-2 text-sm font-semibold">20〜60 min：北側 + 南側</div>
          </div>
        </Info>
        <Bubble>
          攻撃側は「数の有利」を活かせば勝ち！
          前半は敵兵士を減らす / 強敵から逃げる。
          後半の施設数が増えたタイミングで勝負だ！
        </Bubble>
      </Row>

    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start">
      {children}
    </div>
  )
}

function Info({ children }: { children: React.ReactNode }) {
  return <div className="w-1/2 text-sm text-gray-700 leading-relaxed">{children}</div>
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-bold text-base text-gray-900 mb-1">{children}</p>
}

function Bubble({ children, white }: { children: React.ReactNode; white?: boolean }) {
  const bgClass = white
    ? 'bg-white/90 border-white/60 text-amber-900'
    : 'bg-amber-50 border-amber-200 text-amber-800'
  const arrowClass = white
    ? 'border-r-white/60'
    : 'border-r-amber-200'

  return (
    <div className="flex items-start gap-2 w-1/2 justify-end">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/guide-avatar.png" alt="" className="w-12 h-12 rounded-full shrink-0 mt-1" />
      <div className={`relative ${bgClass} border rounded-xl px-4 py-3 text-sm leading-relaxed`}>
        <div className={`absolute left-[-6px] top-5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] ${arrowClass}`} />
        {children}
      </div>
    </div>
  )
}
