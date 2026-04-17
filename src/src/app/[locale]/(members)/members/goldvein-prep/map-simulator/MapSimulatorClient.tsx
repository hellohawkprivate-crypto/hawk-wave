'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  FACILITY_DEFS,
  BUILTIN_WEEKS,
  LS_WEEK_KEYS,
  type FacilityState,
  type WeekSnapshot,
  type Control,
} from './facilityData'

// ---------- ヘルパー ----------

type Keyframes = Record<number, Partial<Record<string, Partial<FacilityState>>>>

function getStateAt(
  initial: WeekSnapshot,
  keyframes: Keyframes,
  minute: number,
  id: string
): FacilityState {
  for (let m = minute; m >= 0; m--) {
    const kf = keyframes[m]?.[id]
    if (kf) return { ...initial[id], ...kf }
  }
  return initial[id]
}

function getSnapshot(initial: WeekSnapshot, keyframes: Keyframes, minute: number): WeekSnapshot {
  const result: WeekSnapshot = {}
  for (const def of FACILITY_DEFS) {
    result[def.id] = getStateAt(initial, keyframes, minute, def.id)
  }
  return result
}

function calcPoints(snapshot: WeekSnapshot): { captured: number; total: number } {
  let captured = 0
  let total = 0
  for (const def of FACILITY_DEFS) {
    const s = snapshot[def.id]
    if (!s?.active) continue
    if (s.control === 'attack') total += def.points
    if (s.pct >= 100) captured += def.points
  }
  return { captured, total }
}

// ---------- コンポーネント ----------

const WEEK2_GOAL = 3502

export default function MapSimulatorClient() {
  const [weekKey, setWeekKey] = useState<'week2' | 'week3'>('week2')
  const [minute, setMinute] = useState(0)
  const [keyframes, setKeyframes] = useState<Keyframes>({})
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'phase' | 'detail'>('phase')
  const [week3Available, setWeek3Available] = useState(false)

  // 現在の週の初期値（localStorageから上書き可能）
  const [initialSnapshot, setInitialSnapshot] = useState<WeekSnapshot>(
    BUILTIN_WEEKS.week2.initial
  )

  // マウント時にlocalStorageからロード
  useEffect(() => {
    const w3init = localStorage.getItem(LS_WEEK_KEYS.week3Initial)
    if (w3init) setWeek3Available(true)

    const lsKey = weekKey === 'week2' ? LS_WEEK_KEYS.week2 : LS_WEEK_KEYS.week3
    try {
      const stored = localStorage.getItem(lsKey)
      if (stored) setKeyframes(JSON.parse(stored))
    } catch {}

    if (weekKey === 'week3') {
      try {
        const w3 = localStorage.getItem(LS_WEEK_KEYS.week3Initial)
        if (w3) setInitialSnapshot(JSON.parse(w3))
      } catch {}
    } else {
      setInitialSnapshot(BUILTIN_WEEKS.week2.initial)
    }
  }, [weekKey])

  // keyframes変更時にlocalStorageへ保存
  useEffect(() => {
    const lsKey = weekKey === 'week2' ? LS_WEEK_KEYS.week2 : LS_WEEK_KEYS.week3
    try {
      localStorage.setItem(lsKey, JSON.stringify(keyframes))
    } catch {}
  }, [keyframes, weekKey])

  const snapshot = getSnapshot(initialSnapshot, keyframes, minute)
  const selected = selectedId ? snapshot[selectedId] : null
  const selectedDef = selectedId ? FACILITY_DEFS.find(d => d.id === selectedId) : null

  const updateFacility = useCallback(
    (id: string, updates: Partial<FacilityState>) => {
      setKeyframes(prev => ({
        ...prev,
        [minute]: {
          ...prev[minute],
          [id]: { ...(prev[minute]?.[id] ?? {}), ...updates },
        },
      }))
    },
    [minute]
  )

  function handleReset() {
    if (!confirm('このシナリオをリセットしますか？')) return
    setKeyframes({})
    setMinute(0)
  }

  // 現在の60分時点の状態を次の週の初期値として保存
  function saveAsNextWeekInitial() {
    const finalSnapshot = getSnapshot(initialSnapshot, keyframes, 60)
    try {
      localStorage.setItem(LS_WEEK_KEYS.week3Initial, JSON.stringify(finalSnapshot))
      setWeek3Available(true)
      alert('3W初期値として保存しました')
    } catch {}
  }

  const { captured, total } = calcPoints(snapshot)
  const phaseLabel = minute < 20 ? '序盤' : minute < 40 ? '中盤' : '終盤'
  const phaseColor = minute < 20 ? 'bg-blue-100 text-blue-700' : minute < 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'

  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">マップシミュレーター</h2>
          <p className="text-sm text-gray-500">施設をクリックして状態を編集</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* 週セレクター */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => { setWeekKey('week2'); setMinute(0); setSelectedId(null) }}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${weekKey === 'week2' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              2W
            </button>
            <button
              onClick={() => { if (week3Available) { setWeekKey('week3'); setMinute(0); setSelectedId(null) } }}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                week3Available
                  ? weekKey === 'week3' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title={week3Available ? '' : '2W終了後に保存すると有効になります'}
            >
              3W
            </button>
          </div>
          <button
            onClick={() => setViewMode(v => v === 'phase' ? 'detail' : 'phase')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            {viewMode === 'phase' ? '1分単位表示' : 'フェーズ表示'}
          </button>
          <button onClick={handleReset} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
            リセット
          </button>
          {weekKey === 'week2' && (
            <button onClick={saveAsNextWeekInitial} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50">
              3W初期値として保存
            </button>
          )}
        </div>
      </div>

      {/* 時間コントロール */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900 tabular-nums w-20">{minute}分</span>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${phaseColor}`}>{phaseLabel}</span>
          {keyframes[minute] && <span className="text-xs text-yellow-600 font-medium">● 編集済</span>}
        </div>

        {viewMode === 'detail' ? (
          <>
            <input
              type="range" min={0} max={60} value={minute}
              onChange={e => setMinute(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              {[0, 10, 20, 30, 40, 50, 60].map(m => (
                <button key={m} onClick={() => setMinute(m)}
                  className={`px-1 py-0.5 rounded transition-colors ${minute === m ? 'text-gray-900 font-bold' : 'hover:text-gray-600'}`}>
                  {m}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '序盤', sub: '0分〜', m: 0 },
              { label: '中盤', sub: '20分〜', m: 20 },
              { label: '終盤', sub: '40分〜', m: 40 },
            ].map(p => (
              <button
                key={p.m}
                onClick={() => setMinute(p.m)}
                className={`py-2.5 rounded-lg border transition-colors ${
                  minute === p.m ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <p className="text-sm font-semibold">{p.label}</p>
                <p className="text-xs opacity-70">{p.sub}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* マップ */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 overflow-hidden">
        <div className="relative w-full" style={{ paddingTop: '100%' }}>
          {/* CSS マップ背景 */}
          <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ backgroundColor: '#c8b89a' }}>
            {/* 横線路 */}
            <div className="absolute" style={{
              top: '47%', left: 0, right: 0, height: '6%',
              backgroundImage: 'repeating-linear-gradient(90deg, #7a6040 0px, #7a6040 16px, #c8b89a 16px, #c8b89a 24px)',
              opacity: 0.6,
            }} />
            {/* 縦線路 */}
            <div className="absolute" style={{
              left: '47%', top: 0, bottom: 0, width: '6%',
              backgroundImage: 'repeating-linear-gradient(180deg, #7a6040 0px, #7a6040 16px, #c8b89a 16px, #c8b89a 24px)',
              opacity: 0.6,
            }} />
          </div>

          {/* 施設オーバーレイ */}
          {FACILITY_DEFS.map(def => {
            const state = snapshot[def.id]
            if (!state) return null

            const isActive = state.active
            const isSelected = selectedId === def.id
            const isCircle = def.shape === 'circle'
            const isGP = def.type === 'GP'

            let bgCss = 'rgba(150,150,150,0.7)'
            if (isActive) {
              bgCss = state.control === 'attack' ? 'rgba(22,163,74,0.9)' : 'rgba(220,38,38,0.9)'
            }
            if (isGP && !isActive) bgCss = 'rgba(99,102,241,0.6)'

            const sizeW = isGP ? 10 : isCircle ? 9 : 8
            const sizeH = isGP ? 10 : isCircle ? 9 : 8

            return (
              <button
                key={def.id}
                onClick={() => { if (isActive) setSelectedId(id => id === def.id ? null : def.id) }}
                className={`absolute flex flex-col items-center justify-center transition-all
                  ${isCircle || isGP ? 'rounded-full' : 'rounded'}
                  ${isSelected ? 'ring-2 ring-yellow-300 ring-offset-0 brightness-110 z-10' : ''}
                  ${isActive ? 'cursor-pointer hover:brightness-110' : 'cursor-default'}
                `}
                style={{
                  top: `${def.position.top}%`,
                  left: `${def.position.left}%`,
                  width: `${sizeW}%`,
                  height: `${sizeH}%`,
                  backgroundColor: bgCss,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="text-white font-bold leading-none" style={{ fontSize: 'clamp(7px, 1.2vw, 11px)' }}>
                  {def.id}
                </span>
                {isActive && (
                  <span className="text-white font-semibold leading-none" style={{ fontSize: 'clamp(6px, 1.1vw, 10px)' }}>
                    {state.pct.toFixed(0)}%
                  </span>
                )}
                {isActive && state.alliance && (
                  <span className="text-white leading-none opacity-90" style={{ fontSize: 'clamp(5px, 0.9vw, 9px)' }}>
                    {state.alliance}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 施設編集パネル */}
      {selectedId && selected && selectedDef && (
        <div className="bg-white rounded-xl border-2 border-yellow-300 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">{selectedId}</span>
              <span className="ml-2 text-sm text-gray-500">{selectedDef.name} · {selectedDef.points}pt</span>
            </div>
            <button onClick={() => setSelectedId(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
          </div>
          <p className="text-xs text-gray-400">{minute}分時点の状態を編集（以降の分に反映）</p>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">占拠%</label>
              <input
                type="number" min={0} max={100} step={0.1}
                value={selected.pct}
                onChange={e => updateFacility(selectedId, { pct: Math.min(100, Math.max(0, Number(e.target.value))) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">陣営</label>
              <div className="flex gap-1 h-[38px]">
                {(['attack', 'defense'] as Control[]).map(c => (
                  <button key={c}
                    onClick={() => updateFacility(selectedId, { control: c })}
                    className={`flex-1 text-xs font-semibold rounded-lg transition-colors ${
                      selected.control === c
                        ? c === 'attack' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {c === 'attack' ? '攻撃' : '防衛'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">連盟タグ</label>
              <input
                type="text" maxLength={6}
                placeholder="例: AMTR"
                value={selected.alliance ?? ''}
                onChange={e => updateFacility(selectedId, { alliance: e.target.value || null })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* ポイント集計 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{minute}分時点のポイント集計</h3>
        <div className="grid grid-cols-3 gap-3 text-center mb-3">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">占拠完了 (100%)</p>
            <p className="text-2xl font-bold text-green-600">{captured.toLocaleString()}<span className="text-sm font-normal text-gray-400 ml-0.5">pt</span></p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">攻撃側合計 (目標)</p>
            <p className="text-2xl font-bold text-gray-700">{total.toLocaleString()}<span className="text-sm font-normal text-gray-400 ml-0.5">pt</span></p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">2W勝利ライン</p>
            <p className="text-2xl font-bold text-yellow-600">{WEEK2_GOAL.toLocaleString()}<span className="text-sm font-normal text-gray-400 ml-0.5">pt</span></p>
          </div>
        </div>
        {/* 進捗バー */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500">
            <span>取得済み進捗</span>
            <span>{((captured / WEEK2_GOAL) * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${captured >= WEEK2_GOAL ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(100, (captured / WEEK2_GOAL) * 100)}%` }}
            />
          </div>
          {total > 0 && (
            <>
              <div className="flex justify-between text-xs text-gray-400">
                <span>攻撃側全施設取得時</span>
                <span>{((total / WEEK2_GOAL) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-300 transition-all"
                  style={{ width: `${Math.min(100, (total / WEEK2_GOAL) * 100)}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
