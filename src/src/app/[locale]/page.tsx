import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

const facilities = [
  { key: 'smallBase', points: 40 },
  { key: 'metropolis', points: 175 },
  { key: 'mediumBase', points: 251 },
  { key: 'militaryFortress', points: 496 },
  { key: 'goldenPalace', points: 3505 },
] as const

const scheduleWeeks = ['week2', 'week3', 'week4'] as const

export default function Home() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* 言語切替 */}
        <div className="flex justify-end gap-2 text-sm">
          <Link href="/" locale="ja" className="text-gray-500 hover:text-gray-900">日本語</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" locale="en" className="text-gray-500 hover:text-gray-900">English</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" locale="ko" className="text-gray-500 hover:text-gray-900">한국어</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" locale="zh-TW" className="text-gray-500 hover:text-gray-900">繁體中文</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" locale="zh-CN" className="text-gray-500 hover:text-gray-900">简体中文</Link>
          <span className="text-gray-300">|</span>
          <Link href="/" locale="ar" className="text-gray-500 hover:text-gray-900">العربية</Link>
        </div>

        {/* タイトル */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-1 text-gray-500 text-sm">{t('subtitle')}</p>
        </div>

        {/* ゲーム概要 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('overview.heading')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-xs text-blue-500 font-medium mb-1">{t('overview.defense')}</p>
              <p className="text-2xl font-bold text-blue-700">3</p>
              <p className="text-sm text-blue-600">{t('overview.servers')}</p>
              <p className="text-xs text-gray-500 mt-2">#606 · #625 · #676</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-xs text-red-500 font-medium mb-1">{t('overview.attack')}</p>
              <p className="text-2xl font-bold text-red-700">5</p>
              <p className="text-sm text-red-600">{t('overview.servers')}</p>
            </div>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-sm text-yellow-700">
              {t('overview.winCondition', { points: '5,000' })}
            </p>
          </div>
        </section>

        {/* 施設の種類と破壊値 */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('facilities.heading')}</h2>
          <div className="divide-y divide-gray-100">
            {facilities.map((f) => (
              <div key={f.key} className="flex items-center justify-between py-3">
                <span className="text-gray-700">{t(`facilities.${f.key}`)}</span>
                <span className="font-semibold text-gray-900 tabular-nums">
                  {f.points.toLocaleString()} pt
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 戦闘スケジュール */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('schedule.heading')}</h2>
          <div className="space-y-3">
            {scheduleWeeks.map((week, i) => (
              <div key={week} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
                <span className="text-xs font-semibold text-gray-500 w-14">Week {i + 2}</span>
                <span className="text-gray-800 font-medium">{t(`schedule.${week}`)}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
