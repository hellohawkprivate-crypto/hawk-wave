'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { PowerEntry } from '@/lib/sheets'

type Labels = {
  heading: string
  tabs: { hero: string; alliance: string }
  filters: { camp: string; server: string; tag: string; power: string; all: string }
  stats: { count: string; average: string }
  chart: { heading: string; xAxis: string; yAxis: string }
  download: string | undefined
}

// 戦力値を省略表示（3-4桁）
function formatPower(val: number): string {
  if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)}B`
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`
  if (val >= 1_000) return `${(val / 1_000).toFixed(0)}K`
  return val.toString()
}

// カンマ除去 → 数値化
function parsePower(val: string): number {
  return Number(val.replace(/,/g, '')) || 0
}

export function AnalysisClient({
  heroData,
  allianceData,
  heroDownloadUrl,
  allianceDownloadUrl,
  labels,
}: {
  heroData: PowerEntry[]
  allianceData: PowerEntry[]
  heroDownloadUrl: string
  allianceDownloadUrl: string
  labels: Labels
}) {
  const [activeTab, setActiveTab] = useState<'hero' | 'alliance'>('hero')
  const [campFilter, setCampFilter] = useState<string[]>([])
  const [serverFilter, setServerFilter] = useState<string[]>([])
  const [tagFilter, setTagFilter] = useState<string[]>([])
  const [powerMin, setPowerMin] = useState('')
  const [powerMax, setPowerMax] = useState('')

  const data = activeTab === 'hero' ? heroData : allianceData
  const downloadUrl = activeTab === 'hero' ? heroDownloadUrl : allianceDownloadUrl

  // Camp の候補（常に全件から取得）
  const uniqueCamps = useMemo(() => [...new Set(data.map((d) => d.camp).filter(Boolean))].sort(), [data])

  // Server の候補（Camp で絞り込み）
  const uniqueServers = useMemo(() => {
    const filtered = campFilter.length > 0 ? data.filter((d) => campFilter.includes(d.camp)) : data
    return [...new Set(filtered.map((d) => d.server).filter(Boolean))].sort()
  }, [data, campFilter])

  // Tag の候補（Camp + Server で絞り込み）
  const uniqueTags = useMemo(() => {
    let filtered = data
    if (campFilter.length > 0) filtered = filtered.filter((d) => campFilter.includes(d.camp))
    if (serverFilter.length > 0) filtered = filtered.filter((d) => serverFilter.includes(d.server))
    return [...new Set(filtered.map((d) => d.tag).filter(Boolean))].sort()
  }, [data, campFilter, serverFilter])

  // Camp が変わったら下位フィルタをリセット
  function onCampChange(vals: string[]) {
    setCampFilter(vals)
    setServerFilter([])
    setTagFilter([])
  }

  // Server が変わったら Tag をリセット
  function onServerChange(vals: string[]) {
    setServerFilter(vals)
    setTagFilter([])
  }

  // フィルタ適用
  const filtered = useMemo(() => {
    return data.filter((d) => {
      if (campFilter.length > 0 && !campFilter.includes(d.camp)) return false
      if (serverFilter.length > 0 && !serverFilter.includes(d.server)) return false
      if (tagFilter.length > 0 && !tagFilter.includes(d.tag)) return false
      const pv = parsePower(d.powerValue)
      if (powerMin && pv < Number(powerMin)) return false
      if (powerMax && pv > Number(powerMax)) return false
      return true
    })
  }, [data, campFilter, serverFilter, tagFilter, powerMin, powerMax])

  // Camp別集計
  const defenseData = filtered.filter((d) => d.camp.toLowerCase().includes('defense'))
  const attackData = filtered.filter((d) => !d.camp.toLowerCase().includes('defense'))

  const defenseCount = defenseData.length
  const attackCount = attackData.length
  const defenseAvg = defenseCount > 0
    ? Math.round(defenseData.reduce((sum, d) => sum + parsePower(d.powerValue), 0) / defenseCount)
    : 0
  const attackAvg = attackCount > 0
    ? Math.round(attackData.reduce((sum, d) => sum + parsePower(d.powerValue), 0) / attackCount)
    : 0

  // Camp別ヒストグラム
  const histogram = useMemo(() => {
    if (filtered.length === 0) return []

    const values = filtered.map((d) => parsePower(d.powerValue)).filter((v) => v > 0)
    if (values.length === 0) return []

    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min
    const binCount = Math.min(10, Math.max(3, Math.ceil(Math.sqrt(values.length))))
    const binSize = Math.ceil(range / binCount) || 1

    const bins: { range: string; defense: number; attack: number }[] = []
    for (let i = 0; i < binCount; i++) {
      const lo = min + i * binSize
      const hi = lo + binSize
      const inBin = filtered.filter((d) => {
        const v = parsePower(d.powerValue)
        return v > 0 && v >= lo && (i === binCount - 1 ? v <= hi : v < hi)
      })
      bins.push({
        range: formatPower(lo),
        defense: inBin.filter((d) => d.camp.toLowerCase().includes('defense')).length,
        attack: inBin.filter((d) => !d.camp.toLowerCase().includes('defense')).length,
      })
    }
    return bins
  }, [filtered])

  // タブ切替時にフィルタリセット
  function resetFilters() {
    setCampFilter([])
    setServerFilter([])
    setTagFilter([])
    setPowerMin('')
    setPowerMax('')
  }

  return (
    <div>
      {/* タイトル + ダウンロード */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{labels.heading}</h2>
        {labels.download && (
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {labels.download}
          </a>
        )}
      </div>

      {/* データタブ */}
      <div className="flex gap-1 mb-6">
        {(['hero', 'alliance'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); resetFilters() }}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            {labels.tabs[tab]}
          </button>
        ))}
      </div>

      {/* フィルタ */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <MultiSelect label={labels.filters.camp} selected={campFilter} onChange={onCampChange} options={uniqueCamps} allLabel={labels.filters.all} />
          <MultiSelect label={labels.filters.server} selected={serverFilter} onChange={onServerChange} options={uniqueServers} allLabel={labels.filters.all} />
          <MultiSelect label={labels.filters.tag} selected={tagFilter} onChange={setTagFilter} options={uniqueTags} allLabel={labels.filters.all} />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{labels.filters.power} (min)</label>
            <input
              type="number"
              value={powerMin}
              onChange={(e) => setPowerMin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{labels.filters.power} (max)</label>
            <input
              type="number"
              value={powerMax}
              onChange={(e) => setPowerMax(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm"
              placeholder="∞"
            />
          </div>
        </div>
      </div>

      {/* 集計（Defense / Attack別） */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl border border-blue-200 px-6 py-4">
          <p className="text-xs font-semibold text-blue-500 mb-2">Defense</p>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-blue-400">{labels.stats.count}</p>
              <p className="text-xl font-bold text-blue-800">{defenseCount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-blue-400">{labels.stats.average}</p>
              <p className="text-xl font-bold text-blue-800">{defenseAvg.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-xl border border-red-200 px-6 py-4">
          <p className="text-xs font-semibold text-red-500 mb-2">Attack</p>
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-red-400">{labels.stats.count}</p>
              <p className="text-xl font-bold text-red-800">{attackCount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-red-400">{labels.stats.average}</p>
              <p className="text-xl font-bold text-red-800">{attackAvg.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* テーブル */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">{labels.filters.camp}</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">{labels.filters.server}</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Rank</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">{labels.filters.tag}</th>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">Name</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">{labels.filters.power}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((d, i) => {
                const isDefense = d.camp.toLowerCase().includes('defense')
                const campBg = isDefense ? 'bg-blue-50 text-blue-800' : 'bg-red-50 text-red-800'
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className={`px-4 py-2 font-medium ${campBg}`}>{d.camp}</td>
                    <td className={`px-4 py-2 font-medium ${campBg}`}>{d.server}</td>
                    <td className="px-4 py-2 text-gray-700 tabular-nums">{d.rank}</td>
                    <td className="px-4 py-2 text-gray-700">{d.tag}</td>
                    <td className="px-4 py-2 text-gray-700">{d.name}</td>
                    <td className="px-4 py-2 text-gray-900 font-medium text-right tabular-nums">{d.power}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ヒストグラム */}
      {histogram.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">{labels.chart.heading}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogram}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" fontSize={12} label={{ value: labels.chart.xAxis, position: 'insideBottom', offset: -5 }} />
              <YAxis fontSize={12} label={{ value: labels.chart.yAxis, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="defense" name="Defense" fill="#93c5fd" radius={[4, 4, 0, 0]} />
              <Bar dataKey="attack" name="Attack" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

// 複数選択ドロップダウン
function MultiSelect({
  label,
  selected,
  onChange,
  options,
  allLabel,
}: {
  label: string
  selected: string[]
  onChange: (vals: string[]) => void
  options: string[]
  allLabel: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // 外側クリックで閉じる
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function toggle(val: string) {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val))
    } else {
      onChange([...selected, val])
    }
  }

  const displayText = selected.length === 0
    ? allLabel
    : selected.length <= 2
      ? selected.join(', ')
      : `${selected.length} selected`

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-left bg-white flex justify-between items-center"
      >
        <span className="truncate">{displayText}</span>
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <label key={opt} className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="mr-2 rounded"
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
