import { embedUrl, excelDownloadUrl, fetchCsvRows } from '@/lib/sheets'
import { getLocale, getTranslations } from 'next-intl/server'
import { SheetTabs } from './sheet-tabs'

// 優先順位: 該当言語 → 英語 → 日本語
function pickGid(locale: string, jaKey: string, enKey: string): string {
  if (locale === 'ja') return process.env[jaKey] ?? ''
  return process.env[enKey] ?? process.env[jaKey] ?? ''
}

function getGids(locale: string) {
  return {
    facility: pickGid(locale, 'PREP_GID_JA_FACILITY', 'PREP_GID_EN_FACILITY'),
    condition: pickGid(locale, 'PREP_GID_JA_CONDITION', 'PREP_GID_EN_CONDITION'),
    scenario: pickGid(locale, 'PREP_GID_JA_SCENARIO', 'PREP_GID_EN_SCENARIO'),
    initial: process.env.PREP_GID_JA_INITIAL ?? '0',
  }
}

export default async function SheetPage() {
  const locale = await getLocale()
  const t = await getTranslations('prep.sheet')
  const gids = getGids(locale)

  const [facilityRows, conditionRows] = await Promise.all([
    fetchCsvRows(gids.facility),
    fetchCsvRows(gids.condition),
  ])

  const tabs: Array<
    | { key: string; label: string; type: 'data'; facilityRows: string[][]; conditionRows: string[][]; downloadUrl: string }
    | { key: string; label: string; type: 'iframe'; embedUrl: string; downloadUrl: string }
    | { key: string; label: string; type: 'map'; facilities: { tag: string; name: string; pt: string; initial: string }[]; downloadUrl: string }
  > = [
    {
      key: 'condition',
      label: t('tabs.condition'),
      type: 'data',
      facilityRows,
      conditionRows,
      downloadUrl: excelDownloadUrl(gids.condition),
    },
    {
      key: 'initial',
      label: t('tabs.initial'),
      type: 'iframe',
      embedUrl: embedUrl(gids.initial),
      downloadUrl: excelDownloadUrl(gids.initial),
    },
    {
      key: 'scenario',
      label: t('tabs.scenario'),
      type: 'iframe',
      embedUrl: embedUrl(gids.scenario),
      downloadUrl: excelDownloadUrl(gids.scenario),
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('heading')}</h2>
      <SheetTabs tabs={tabs} downloadLabel={t('download')} />
    </div>
  )
}
