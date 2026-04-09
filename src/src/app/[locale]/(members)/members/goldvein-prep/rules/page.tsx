import { getLocale } from 'next-intl/server'
import { getRulesContent } from './content'

const facilityData = [
  { count: 20, pt: 40, weeks: '2W-4W', turret: 0, siege: 0 },
  { count: 4, pt: 175, weeks: '2W-4W', turret: 2, siege: 0 },
  { count: 12, pt: 251, weeks: '3W-4W', turret: 0, siege: 0 },
  { count: 4, pt: 496, weeks: '3W-4W', turret: 2, siege: 1 },
  { count: 1, pt: 3505, weeks: '4W', turret: 4, siege: 2 },
]

export default async function RulesPage() {
  const locale = await getLocale()
  const c = getRulesContent(locale)

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900">{c.heading}</h2>

      <Section title={c.basicInfo}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-blue-500 mb-1">{c.defenseSide}</p>
            <p className="text-lg font-bold text-blue-800">#606 · #625 · #676</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-red-500 mb-1">{c.attackSide}</p>
            <p className="text-lg font-bold text-red-800">#549 · #566 · #600 · #621 · #633</p>
          </div>
        </div>
      </Section>

      <Section title={c.scheduleTitle}>
        <p className="text-sm text-gray-600 mb-3">{c.scheduleDesc}</p>
        <div className="space-y-2">
          {['2W', '3W', '4W'].map((week, i) => (
            <div key={week} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
              <span className="text-xs font-semibold text-gray-500 w-16">{week}</span>
              <span className="text-gray-800 font-medium">{c.scheduleDate[i]}</span>
              <span className="text-gray-500 text-sm">SVT 12:00 - 13:00</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={c.victoryTitle}>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">{c.victoryDesc}</p>
        </div>
        <p className="text-sm text-gray-600 mt-3">{c.victoryNote}</p>
      </Section>

      <Section title={c.statusTitle}>
        <p className="text-sm text-gray-600 mb-3">{c.statusDesc}</p>
        <div className="space-y-2">
          {c.statusItems.map((s, i) => {
            const colors = ['bg-gray-100 text-gray-700', 'bg-red-50 text-red-700', 'bg-blue-50 text-blue-700']
            return (
              <div key={i} className={`flex items-center gap-4 rounded-lg px-4 py-3 ${colors[i]}`}>
                <span className="font-semibold text-sm w-24">{s.status}</span>
                <span className="text-sm">{s.desc}</span>
              </div>
            )
          })}
        </div>
      </Section>

      <Section title={c.facilityTitle}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {c.facilityHeaders.map((h, i) => (
                  <th key={i} className={`${i <= 0 || i >= 3 ? 'text-left' : 'text-right'} px-4 py-2 text-gray-500 font-medium`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {facilityData.map((f, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">{c.facilityNames[i]}</td>
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

      <Section title={c.speedTitle}>
        <p className="text-sm text-gray-600 mb-3">{c.speedDesc}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 text-gray-500 font-medium">{c.speedTimeLabel}</th>
                <th className="text-right px-4 py-2 text-gray-500 font-medium">{c.speedRateLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {c.speedRows.map((r, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-gray-700">{r.time}</td>
                  <td className="px-4 py-2 text-right font-semibold tabular-nums">{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={c.towerTitle}>
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">{c.cannonName}</p>
            <p className="text-sm text-gray-600">{c.cannonDesc}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800 mb-1">{c.siegeName}</p>
            <p className="text-sm text-gray-600">{c.siegeDesc}</p>
          </div>
        </div>
      </Section>

      <Section title={c.mapTitle}>
        <div className="space-y-4 text-sm text-gray-600">
          <p>{c.mapDesc}</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>{c.mapPhase1}</strong><br />
              <strong>{c.mapPhase2}</strong>
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/goldvein-map.png" alt={c.mapAlt} className="w-4/5 mx-auto rounded-lg border border-gray-200" />
        </div>
      </Section>

      <Section title={c.carryoverTitle}>
        <ul className="space-y-2 text-sm text-gray-600">
          {c.carryoverItems.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-gray-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={c.buffTitle}>
        <p className="text-sm text-gray-500 mb-4">{c.buffDesc}</p>
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-blue-700 mb-2">{c.defenseBuffLabel}</h4>
          <BuffTable headers={[c.buffCondition, c.buffEffect]} rows={c.defenseBuffs} color="blue" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-red-700 mb-2">{c.attackBuffLabel}</h4>
          <BuffTable headers={[c.buffCondition, c.buffEffect]} rows={c.attackBuffs} color="red" />
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </section>
  )
}

function BuffTable({ headers, rows, color }: { headers: string[]; rows: { condition: string; effect: string }[]; color: 'blue' | 'red' }) {
  const bgClass = color === 'blue' ? 'bg-blue-50' : 'bg-red-50'
  const textClass = color === 'blue' ? 'text-blue-500' : 'text-red-500'
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className={bgClass}>
          <tr>
            <th className={`text-left px-4 py-2 ${textClass} font-medium`}>{headers[0]}</th>
            <th className={`text-left px-4 py-2 ${textClass} font-medium`}>{headers[1]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((b, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-700">{b.condition}</td>
              <td className="px-4 py-2 text-gray-900 font-medium">{b.effect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
