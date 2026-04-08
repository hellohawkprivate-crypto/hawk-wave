import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['ja', 'en', 'ko', 'zh-TW', 'zh-CN', 'ar'],
  defaultLocale: 'ja',
})

// ロケール対応のナビゲーションヘルパー
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
