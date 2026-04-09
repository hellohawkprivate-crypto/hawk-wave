import { getLocale } from 'next-intl/server'
import { getGuideContent } from './content'
import { GuideClient } from './guide-client'

export default async function GuidePage() {
  const locale = await getLocale()
  const content = getGuideContent(locale)

  return <GuideClient content={content} />
}
