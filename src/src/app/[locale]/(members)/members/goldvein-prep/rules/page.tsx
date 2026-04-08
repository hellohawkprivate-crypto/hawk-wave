import { useTranslations } from 'next-intl'

export default function RulesPage() {
  const t = useTranslations('prep')
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('rules.heading')}</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-gray-500 text-sm">
        コンテンツを追加予定
      </div>
    </div>
  )
}
