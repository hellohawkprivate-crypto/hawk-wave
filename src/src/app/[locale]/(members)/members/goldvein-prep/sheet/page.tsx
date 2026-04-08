import { embedUrl, excelDownloadUrl, fetchCsvRows } from '@/lib/sheets'
import { getLocale, getTranslations } from 'next-intl/server'
import { SheetTabs } from './sheet-tabs'

function getGids(locale: string) {
  const isJa = locale === 'ja'
  return {
    facility: isJa ? process.env.PREP_GID_JA_FACILITY! : process.env.PREP_GID_EN_FACILITY!,
    condition: isJa ? process.env.PREP_GID_JA_CONDITION! : process.env.PREP_GID_EN_CONDITION!,
    scenario: isJa ? process.env.PREP_GID_JA_SCENARIO! : process.env.PREP_GID_EN_SCENARIO!,
    initial: process.env.PREP_GID_JA_INITIAL ?? '0',
  }
}

function parseInitialData(rows: string[][]) {
  return rows.slice(1).map((cols) => ({
    tag: (cols[0] ?? '').trim(),
    name: (cols[1] ?? '').trim(),
    pt: (cols[2] ?? '').trim(),
    initial: (cols[3] ?? '').trim(),
  })).filter((f) => f.tag)
}

export default async function SheetPage() {
  const locale = await getLocale()
  const t = await getTranslations('prep.sheet')
  const gids = getGids(locale)

  const [facilityRows, conditionRows, initialRows] = await Promise.all([
    fetchCsvRows(gids.facility),
    fetchCsvRows(gids.condition),
    fetchCsvRows(gids.initial),
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
