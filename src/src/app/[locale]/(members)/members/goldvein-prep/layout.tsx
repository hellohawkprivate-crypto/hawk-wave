import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

const navItems = [
  { key: 'sheet', href: '/members/goldvein-prep/sheet' },
  { key: 'strategy', href: '/members/goldvein-prep/strategy' },
  { key: 'rules', href: '/members/goldvein-prep/rules' },
  { key: 'discussion', href: '/members/goldvein-prep/discussion' },
] as const

export default function GoldveinPrepLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('prep')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wide">Members</p>
          <h1 className="text-xl font-bold text-gray-900">{t('appName')}</h1>
        </div>
        {/* ナビゲーション */}
        <nav className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 whitespace-nowrap border-b-2 border-transparent hover:border-yellow-500 transition-colors"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* コンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
