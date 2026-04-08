import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'ja' | 'en' | 'ko' | 'zh-TW' | 'zh-CN' | 'ar')) {
    notFound()
  }

  const messages = await getMessages()
  // アラビア語はRTL（右から左）
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={dir}>
        {children}
      </div>
    </NextIntlClientProvider>
  )
}
