import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  // 有効なロケールでなければデフォルトにフォールバック
  if (!locale || !routing.locales.includes(locale as 'ja' | 'en' | 'ko' | 'zh-TW' | 'zh-CN' | 'ar')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  }
})
