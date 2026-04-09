'use client'

import type { GuideContent } from './content'

export function GuideClient({ content: c }: { content: GuideContent }) {
  return (
    <div className="space-y-3">

      {/* タイトル */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl px-5 py-4 text-white flex items-center justify-between">
        <div>
          <p className="font-bold">{c.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-blue-500/80 px-3 py-0.5 rounded-full text-sm">{c.defense}</span>
            <span className="text-sm">vs</span>
            <span className="bg-red-500/80 px-3 py-0.5 rounded-full text-sm">{c.attack}</span>
          </div>
        </div>
        <Bubble white>{c.bubble_intro}</Bubble>
      </div>

      {/* スケジュール */}
      <Row>
        <Info>
          <Label>{c.schedule_label}</Label>
          <p>{c.schedule_desc}</p>
          <div className="flex gap-2 mt-2">
            {[
              { week: '2W', count: 24 },
              { week: '3W', count: 40 },
              { week: '4W', count: 41 },
            ].map((w) => (
              <span key={w.week} className="bg-gray-100 rounded-lg px-3 py-1 text-sm font-bold text-gray-700">
                {w.week}: <span className="text-amber-600">{w.count}</span>
              </span>
            ))}
          </div>
        </Info>
        <Bubble>{c.bubble_schedule}</Bubble>
      </Row>

      {/* 勝利条件 */}
      <Row>
        <Info>
          <Label>{c.victory_label}</Label>
          <p>{c.victory_desc}</p>
        </Info>
        <Bubble>{c.bubble_victory}</Bubble>
      </Row>

      {/* 大事な役割 */}
      <Row>
        <Info>
          <Label>{c.role_label}</Label>
          <div className="space-y-1.5 mt-1">
            <div className="bg-purple-50 text-purple-700 rounded-lg px-3 py-2 text-sm font-semibold">{c.role_inner}</div>
            <div className="bg-green-50 text-green-700 rounded-lg px-3 py-2 text-sm font-semibold">{c.role_outer}</div>
          </div>
        </Info>
        <Bubble>{c.bubble_role}</Bubble>
      </Row>

      {/* ポイント */}
      <Row>
        <Info>
          <Label>{c.point_label}</Label>
          <div className="space-y-1.5 mt-1">
            <div className="bg-sky-50 text-sky-700 rounded-lg px-3 py-2 text-sm font-semibold">{c.point_phase1}</div>
            <div className="bg-orange-50 text-orange-700 rounded-lg px-3 py-2 text-sm font-semibold">{c.point_phase2}</div>
          </div>
        </Info>
        <Bubble>{c.bubble_point}</Bubble>
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
