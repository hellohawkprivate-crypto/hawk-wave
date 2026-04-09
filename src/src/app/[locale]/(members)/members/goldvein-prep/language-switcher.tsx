'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'

const locales = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'EN' },
  { code: 'ko', label: '한국어' },
  { code: 'zh-TW', label: '繁體' },
  { code: 'zh-CN', label: '简体' },
  { code: 'ar', label: 'عربي' },
]

export function LanguageSwitcher() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = params.locale as string

  function switchLocale(locale: string) {
    // 現在のパスのロケール部分を差し替え
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`)
    router.push(newPath)
  }

  return (
    <div className="flex gap-1 flex-wrap">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            currentLocale === l.code
              ? 'bg-yellow-500 text-white font-semibold'
              : 'bg-gray-100 text-gray-500 hover:text-gray-700'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
