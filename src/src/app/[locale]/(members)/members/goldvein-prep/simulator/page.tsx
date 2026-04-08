'use client'

import { useState, useMemo } from 'react'

// 占領時間を計算（秒）
// 攻城強化装置の+2200は60秒後に取り消される（実質Phase2で-2200）
function calcTime(
  remaining: number,
  turrets: number,
  siege: number,
  buffPercent: number,
) {
  if (remaining <= 0) return 0

  const multiplier = 1 + turrets * 0.05 + siege * 0.05 + buffPercent
  const siegeBonus = siege * 2200
  const rate1 = 93 * multiplier + siegeBonus / 60  // Phase1: 0-60s（+2200加算中）
  const rate2 = 93 * multiplier - siegeBonus / 60  // Phase2: 60-120s（+2200取り消し）
  const rate3 = 37 * multiplier                    // Phase3: 120s+

  const progress1 = rate1 * 60
  const progress2 = Math.max(rate2, 0) * 60

  if (remaining <= progress1) {
    return remaining / rate1
  }
  if (remaining <= progress1 + progress2) {
    return 60 + (remaining - progress1) / Math.max(rate2, 0.01)
  }
  return 120 + (remaining - progress1 - progress2) / rate3
}

// 秒をx分x秒に変換
function formatTime(seconds: number): string {
  if (seconds <= 0) return '0秒'
  const min = Math.floor(seconds / 60)
  const sec = Math.round(seconds % 60)
  if (min === 0) return `${sec}秒`
  return `${min}分${sec}秒`
}

// バフプリセット
const buffPresets = {
  attack: [
    { label: 'デフォルト（+30%）', value: 0.30 },
    { label: '+バフ1段（+37.5%）', value: 0.375 },
    { label: '+バフ2段（+45%）', value: 0.45 },
    { label: '+バフ3段（+52.5%）', value: 0.525 },
  ],
  defense: [
    { label: 'デフォルト（+0%）', value: 0 },
    { label: '+バフ1段（+7.5%）', value: 0.075 },
    { label: '+バフ2段（+15%）', value: 0.15 },
    { label: '+バフ3段（+22.5%）', value: 0.225 },
  ],
}

// 施設プリセット
const facilityPresets = [
  { label: '小型拠点', turrets: 0, siege: 0 },
  { label: '大都市', turrets: 2, siege: 0 },
  { label: '中型拠点', turrets: 0, siege: 0 },
  { label: '軍事要塞', turrets: 2, siege: 1 },
  { label: 'ゴールデンパレス', turrets: 4, siege: 2 },
]

export default function SimulatorPage() {
  const [side, setSide] = useState<'attack' | 'defense'>('attack')
  const [turrets, setTurrets] = useState(0)
  const [siege, setSiege] = useState(0)
  const [buffIndex, setBuffIndex] = useState(0)

  const presets = buffPresets[side]
  const buffPercent = presets[buffIndex]?.value ?? 0

  // 進行度ごとの占領時間テーブル
  const rows = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => {
      const progress = 100 - i * 10 // 100%, 90%, ..., 0%
      const remaining = (100 - progress) * 1000 // 残りPt
      const time = calcTime(remaining, turrets, siege, buffPercent)
      return { progress, remaining, time }
    })
  }, [turrets, siege, buffPercent])

  // 施設プリセット適用
  function applyPreset(preset: typeof facilityPresets[number]) {
    setTurrets(preset.turrets)
    setSiege(preset.siege)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">占領時間シミュレーター</h2>

      {/* 陣営 */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">陣営</p>
          <div className="flex gap-2">
            {(['attack', 'defense'] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setSide(s); setBuffIndex(0) }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  side === s
                    ? s === 'attack' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
              >
                {s === 'attack' ? '攻撃側' : '防衛側'}
              </button>
            ))}
          </div>
        </div>

        {/* 施設プリセット */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">施設プリセット</p>
          <div className="flex gap-2 flex-wrap">
            {facilityPresets.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  turrets === p.turrets && siege === p.siege
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 詳細設定 */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">砲塔（0〜4）</label>
            <input
              type="number"
              min={0}
              max={4}
              value={turrets}
              onChange={(e) => setTurrets(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">攻城強化装置（0〜2）</label>
            <input
              type="number"
              min={0}
              max={2}
              value={siege}
              onChange={(e) => setSiege(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">バフ</label>
            <select
              value={buffIndex}
              onChange={(e) => setBuffIndex(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {presets.map((p, i) => (
                <option key={i} value={i}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 速度倍率の表示 */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700">
          <span className="font-semibold">速度倍率：</span>
          <span className="text-lg font-bold text-gray-900 ml-1">
            ×{(1 + turrets * 0.05 + siege * 0.05 + buffPercent).toFixed(2)}
          </span>
          {siege > 0 && (
            <span className="ml-3 text-amber-600 font-medium">
              + 攻城強化 {(siege * 2200).toLocaleString()}/60秒
            </span>
          )}
        </div>
      </div>

      {/* 結果テーブル */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">進行度</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">残りPt</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">占領時間（秒）</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">占領時間</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <tr
                key={r.progress}
                className={`hover:bg-gray-50 ${r.progress === 0 ? 'bg-yellow-50 font-semibold' : ''}`}
              >
                <td className="px-4 py-2.5 text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${side === 'attack' ? 'bg-red-400' : 'bg-blue-400'}`}
                        style={{ width: `${100 - r.progress}%` }}
                      />
                    </div>
                    <span className="tabular-nums">{r.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">
                  {r.remaining.toLocaleString()}
                </td>
                <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">
                  {r.time.toFixed(1)}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-gray-900 tabular-nums">
                  {formatTime(r.time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
