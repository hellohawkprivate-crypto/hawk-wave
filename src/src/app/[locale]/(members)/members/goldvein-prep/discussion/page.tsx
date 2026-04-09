import { getLocale } from 'next-intl/server'
import { getTodoContent } from './content'

export default async function TodoPage() {
  const locale = await getLocale()
  const c = getTodoContent(locale)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">{c.heading}</h2>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">{c.verifyTag}</span>
          {c.verifyLabel}
        </h3>
        <div className="space-y-2">
          {c.verifyItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <div className="w-4 h-4 border-2 border-gray-300 rounded shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">{c.discussTag}</span>
          {c.discussLabel}
        </h3>
        <div className="space-y-2">
          {c.discussItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <div className="w-4 h-4 border-2 border-gray-300 rounded shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
