const facilities = [
  { name: "小型拠点", points: 40 },
  { name: "大都市", points: 175 },
  { name: "中型拠点", points: 251 },
  { name: "軍事要塞", points: 496 },
  { name: "ゴールデンパレス", points: 3505 },
];

const schedule = [
  { week: "Week 2", date: "4月11日（金）" },
  { week: "Week 3", date: "4月18日（金）" },
  { week: "Week 4", date: "4月25日（金）" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* タイトル */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">金脈攻防戦</h1>
          <p className="mt-1 text-gray-500 text-sm">ゲームルール解説</p>
        </div>

        {/* ゲーム概要 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">ゲーム概要</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-xs text-blue-500 font-medium mb-1">防衛側</p>
              <p className="text-2xl font-bold text-blue-700">3</p>
              <p className="text-sm text-blue-600">サーバー</p>
              <p className="text-xs text-gray-500 mt-2">#606 · #625 · #676</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-xs text-red-500 font-medium mb-1">攻撃側</p>
              <p className="text-2xl font-bold text-red-700">5</p>
              <p className="text-sm text-red-600">サーバー</p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-700">
              攻撃側が合計破壊値 <span className="font-bold text-yellow-900 text-lg">5,000 pt</span> に達すると攻撃側勝利
            </p>
          </div>
        </section>

        {/* 施設の種類と破壊値 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">施設の種類と破壊値</h2>
          <div className="divide-y divide-gray-100">
            {facilities.map((f) => (
              <div key={f.name} className="flex items-center justify-between py-3">
                <span className="text-gray-700">{f.name}</span>
                <span className="font-semibold text-gray-900 tabular-nums">
                  {f.points.toLocaleString()} pt
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 戦闘スケジュール */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">戦闘スケジュール</h2>
          <div className="space-y-3">
            {schedule.map((s) => (
              <div key={s.week} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
                <span className="text-xs font-semibold text-gray-500 w-14">{s.week}</span>
                <span className="text-gray-800 font-medium">{s.date}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
