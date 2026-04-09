'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getSimContent, type SimContent } from './content'

function calcTime(remaining: number, turrets: number, siege: number, buffPercent: number) {
  if (remaining <= 0) return 0
  const multiplier = 1 + turrets * 0.05 + siege * 0.05 + buffPercent
  const siegeBonus = siege * 2200
  const rate1 = 93 * multiplier + siegeBonus / 60
  const rate2 = 93 * multiplier - siegeBonus / 60
  const rate3 = 37 * multiplier
  const progress1 = rate1 * 60
  const progress2 = Math.max(rate2, 0) * 60
  if (remaining <= progress1) return remaining / rate1
  if (remaining <= progress1 + progress2) return 60 + (remaining - progress1) / Math.max(rate2, 0.01)
  return 120 + (remaining - progress1 - progress2) / rate3
}

function formatTime(seconds: number, c: SimContent): string {
  if (seconds <= 0) return `0${c.sec}`
  const min = Math.floor(seconds / 60)
  const sec = Math.round(seconds % 60)
  if (min === 0) return `${sec}${c.sec}`
  return `${min}${c.min}${sec}${c.sec}`
}

const facilityPresets = [
  { turrets: 0, siege: 0 },
  { turrets: 2, siege: 0 },
  { turrets: 0, siege: 0 },
  { turrets: 2, siege: 1 },
  { turrets: 4, siege: 2 },
]

export default function SimulatorPage() {
  const params = useParams()
  const c = getSimContent(params.locale as string)

  const [side, setSide] = useState<'attack' | 'defense'>('attack')
  const [turrets, setTurrets] = useState(0)
  const [siege, setSiege] = useState(0)
  const [buffIndex, setBuffIndex] = useState(0)

  const buffs = side === 'attack' ? c.attackBuffs : c.defenseBuffs
  const buffValues = side === 'attack'
    ? [0.30, 0.375, 0.45, 0.525]
    : [0, 0.075, 0.15, 0.225]
  const buffPercent = buffValues[buffIndex] ?? 0

  const rows = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => {
      const progress = 100 - i * 10
      const remaining = (100 - progress) * 1000
      const time = calcTime(remaining, turrets, siege, buffPercent)
      return { progress, remaining, time }
    })
  }, [turrets, siege, buffPercent])

  function applyPreset(index: number) {
    setTurrets(facilityPresets[index].turrets)
    setSiege(facilityPresets[index].siege)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">{c.heading}</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">{c.side}</p>
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
                {s === 'attack' ? c.attack : c.defense}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">{c.preset}</p>
          <div className="flex gap-2 flex-wrap">
            {c.facilityNames.map((name, i) => (
              <button
                key={name}
                onClick={() => applyPreset(i)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  turrets === facilityPresets[i].turrets && siege === facilityPresets[i].siege
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{c.turretLabel}</label>
            <input type="number" min={0} max={4} value={turrets} onChange={(e) => setTurrets(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{c.siegeLabel}</label>
            <input type="number" min={0} max={2} value={siege} onChange={(e) => setSiege(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{c.buffLabel}</label>
            <select value={buffIndex} onChange={(e) => setBuffIndex(Number(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              {buffs.map((label, i) => (
                <option key={i} value={i}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700">
          <span className="font-semibold">{c.multiplierLabel}：</span>
          <span className="text-lg font-bold text-gray-900 ml-1">
            ×{(1 + turrets * 0.05 + siege * 0.05 + buffPercent).toFixed(2)}
          </span>
          {siege > 0 && (
            <span className="ml-3 text-amber-600 font-medium">
              + {c.siegeBonus} {(siege * 2200).toLocaleString()}/60{c.sec}
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">{c.progress}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">{c.remainingPt}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">{c.timeSec}</th>
              <th className="text-right px-4 py-3 text-gray-500 font-medium">{c.timeFormatted}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={r.progress} className={`hover:bg-gray-50 ${r.progress === 0 ? 'bg-yellow-50 font-semibold' : ''}`}>
                <td className="px-4 py-2.5 text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${side === 'attack' ? 'bg-red-400' : 'bg-blue-400'}`} style={{ width: `${100 - r.progress}%` }} />
                    </div>
                    <span className="tabular-nums">{r.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{r.remaining.toLocaleString()}</td>
                <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{r.time.toFixed(1)}</td>
                <td className="px-4 py-2.5 text-right font-medium text-gray-900 tabular-nums">{formatTime(r.time, c)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
