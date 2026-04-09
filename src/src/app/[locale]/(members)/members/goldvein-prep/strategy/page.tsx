import { getLocale } from 'next-intl/server'
import { getStrategyContent } from './content'

export default async function StrategyPage() {
  const locale = await getLocale()
  const c = getStrategyContent(locale)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">{c.heading}</h2>
      <p className="text-sm text-gray-500">{c.subtitle}</p>

      {/* 前提 */}
      <Section title={c.premiseTitle} sub={c.premiseSub}>
        <div className="space-y-2">
          {c.premises.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <span className="bg-gray-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-gray-700">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3週間の流れ */}
      <Section title={c.flowTitle}>
        <div className="mb-5">
          <p className="font-semibold text-gray-800 mb-2">{c.gpYes}</p>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1">
            <p>{c.gpYesDesc}</p>
            <p>{c.gpYesCondition}</p>
          </div>
          <Tip>{c.gpYesTip}</Tip>
        </div>
        <p className="font-semibold text-gray-800 mb-3">{c.gpNo}</p>
        <div className="space-y-3">
          {[c.scenarioA, c.scenarioB, c.scenarioC].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0">{String.fromCharCode(65 + i)}</span>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">{s.title}</p>
                  <p className="text-gray-600 mt-1">{s.desc}</p>
                  <p className="text-gray-500 mt-1">{c.conditionLabel}：{s.condition}</p>
                  {s.tip && <Tip>{s.tip}</Tip>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ① */}
      <Section title={c.section1Title}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-sm">
              <p className="font-semibold text-blue-700">{c.firstHalf}</p>
              <p className="text-blue-600 mt-1">{c.firstHalfAdv}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-sm">
              <p className="font-semibold text-red-700">{c.secondHalf}</p>
              <p className="text-red-600 mt-1">{c.secondHalfAdv}</p>
            </div>
          </div>
          <div className="space-y-1">
            <Tip>{c.tip1}</Tip>
            <Tip>{c.tip2}</Tip>
          </div>
          <p className="font-semibold text-gray-800 mt-2 text-sm">{c.weeklyFacilities}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">{c.timing}</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">{c.facilities}</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {c.weeklyRows.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">{r.timing}</td>
                    <td className="px-3 py-2">{r.facilities}</td>
                    <td className="px-3 py-2 text-gray-500">{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-semibold text-gray-800 text-sm">{c.weeklyTarget}</p>
          <div className="space-y-2">
            {c.weekTargets.map((wt, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5">
                <span className="text-xs font-bold text-gray-500 w-8">{wt.week}</span>
                <span className="text-sm text-gray-700">{wt.items}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ② */}
      <Section title={c.section2Title}>
        <p className="text-sm text-gray-600 mb-3">{c.section2Desc}</p>
        <p className="font-semibold text-gray-800 text-sm mb-2">{c.victoryLine}</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {c.fn.map((n, i) => (<th key={i} className="text-left px-3 py-2 text-gray-500 font-medium">{n}</th>))}
                <th className="text-right px-3 py-2 text-gray-500 font-medium">{c.total}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="px-3 py-2">40 x 20/20</td><td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 12/12</td><td className="px-3 py-2 font-semibold">496 x 1/4</td>
                <td className="px-3 py-2 text-right font-bold text-green-700">5,008</td>
              </tr>
              <tr>
                <td className="px-3 py-2">40 x 20/20</td><td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 10/12</td><td className="px-3 py-2 font-semibold">496 x 2/4</td>
                <td className="px-3 py-2 text-right font-bold text-green-700">5,002</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="font-semibold text-gray-800 text-sm mb-2">{c.weeklyGoal}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 text-gray-500 font-medium">{c.week}</th>
                {c.fn.map((n, i) => (<th key={i} className="text-left px-3 py-2 text-gray-500 font-medium">{n}</th>))}
                <th className="text-right px-3 py-2 text-gray-500 font-medium">{c.total}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="px-3 py-2 font-medium">2W</td>
                <td className="px-3 py-2">40 x 15/20</td><td className="px-3 py-2">175 x 1/4</td>
                <td className="px-3 py-2 text-gray-400">0/12</td><td className="px-3 py-2 text-gray-400">0/4</td>
                <td className="px-3 py-2 text-right font-bold">775</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium" rowSpan={2}>3W</td>
                <td className="px-3 py-2">40 x 20/20</td><td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 8/12</td><td className="px-3 py-2 text-gray-400">0/4</td>
                <td className="px-3 py-2 text-right font-bold">3,508</td>
              </tr>
              <tr>
                <td className="px-3 py-2">40 x 20/20</td><td className="px-3 py-2">175 x 4/4</td>
                <td className="px-3 py-2 font-semibold">251 x 6/12</td><td className="px-3 py-2 font-semibold">496 x 1/4</td>
                <td className="px-3 py-2 text-right font-bold">3,502</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ③ */}
      <Section title={c.section3Title} color="blue">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-blue-500 font-semibold mb-1">{c.defStrategy}</p>
              <p className="text-sm text-blue-800 font-semibold whitespace-pre-line">{c.defStrategyDesc}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-blue-500 font-semibold mb-1">{c.defVictory}</p>
              <p className="text-sm text-blue-800 font-semibold">{c.defVictoryDesc}</p>
            </div>
          </div>
          <p className="font-semibold text-gray-800 text-sm">{c.defConditionsTitle}</p>
          <div className="space-y-1.5">
            {c.defConditions.map((cond, i) => (
              <div key={i} className="bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-700">{cond}</div>
            ))}
          </div>
          <p className="font-semibold text-gray-800 text-sm">{c.defSimTitle}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>{c.defSimHeaders.map((h, i) => (<th key={i} className="text-left px-3 py-2 text-blue-500 font-medium">{h}</th>))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {c.defSimRows.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">{r.timing}</td><td className="px-3 py-2">{r.count}</td>
                    <td className="px-3 py-2">{r.defend}</td><td className="px-3 py-2 font-semibold">{r.lost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-semibold text-gray-800 text-sm">{c.defResultTitle}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{c.defResultHeaders.map((h, i) => (<th key={i} className={`${i === 2 ? 'text-right' : 'text-left'} px-3 py-2 text-gray-500 font-medium`}>{h}</th>))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {c.defResultRows.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">{r.caseName}</td><td className="px-3 py-2">{r.breakdown}</td>
                    <td className="px-3 py-2 text-right font-bold">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip>{c.defTip}</Tip>
        </div>
      </Section>

      {/* ④ */}
      <Section title={c.section4Title} color="red">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{c.atkDesc}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-xs text-red-500 font-semibold mb-1">{c.atkStrategy}</p>
              <p className="text-sm text-red-800 font-semibold whitespace-pre-line">{c.atkStrategyDesc}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-xs text-red-500 font-semibold mb-1">{c.atkVictory}</p>
              <p className="text-sm text-red-800 font-semibold">{c.atkVictoryDesc}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 準備 */}
      <Section title={c.prepTitle}>
        <div className="space-y-2">
          {c.prepItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <span className="bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-amber-800">{item}</p>
            </div>
          ))}
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

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-amber-700 mt-2">
      <span className="font-bold mr-1">👉</span>{children}
    </p>
  )
}
