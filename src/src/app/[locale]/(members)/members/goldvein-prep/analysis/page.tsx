import { getTranslations } from 'next-intl/server'
import { fetchPowerData, excelDownloadUrl } from '@/lib/sheets'
import { AnalysisClient } from './analysis-client'

export default async function AnalysisPage() {
  const t = await getTranslations('prep.analysis')

  const heroGid = process.env.PREP_GID_HERO_POWER ?? ''
  const allianceGid = process.env.PREP_GID_ALLIANCE_POWER ?? ''

  const [heroData, allianceData] = await Promise.all([
    fetchPowerData(heroGid),
    fetchPowerData(allianceGid),
  ])

  const labels = {
    heading: t('heading'),
    tabs: { hero: t('tabs.hero'), alliance: t('tabs.alliance') },
    filters: {
      camp: t('filters.camp'),
      server: t('filters.server'),
      tag: t('filters.tag'),
      power: t('filters.power'),
      all: t('filters.all'),
    },
    stats: { count: t('stats.count'), average: t('stats.average') },
    chart: { heading: t('chart.heading'), xAxis: t('chart.xAxis'), yAxis: t('chart.yAxis') },
    download: t('download'),
  }

  return (
    <AnalysisClient
      heroData={heroData}
      allianceData={allianceData}
      heroDownloadUrl={excelDownloadUrl(heroGid)}
      allianceDownloadUrl={excelDownloadUrl(allianceGid)}
      labels={labels}
    />
  )
}
