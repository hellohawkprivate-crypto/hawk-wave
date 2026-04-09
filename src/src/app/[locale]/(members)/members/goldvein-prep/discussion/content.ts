export type TodoContent = {
  heading: string
  verifyLabel: string
  verifyTag: string
  verifyItems: string[]
  discussLabel: string
  discussTag: string
  discussItems: string[]
}

const contents: Record<string, TodoContent> = {
  ja: {
    heading: 'ToDo',
    verifyLabel: 'たしかめること',
    verifyTag: '確認',
    verifyItems: [
      'ルールの漏れを確認する',
      '2W前半に逃げても問題ないかを数値計算する',
    ],
    discussLabel: '話し合いたいこと',
    discussTag: '議論',
    discussItems: [
      '当日までのアナウンス内容',
      '勝てる組み合わせのマッチアップ',
      '簡単に指示を出す / 連携をとる方法',
    ],
  },
  en: {
    heading: 'ToDo',
    verifyLabel: 'Verify',
    verifyTag: 'Check',
    verifyItems: [
      'Check for missing rules',
      'Calculate if retreating in 2W first half is viable',
    ],
    discussLabel: 'Discussion Topics',
    discussTag: 'Discuss',
    discussItems: [
      'Announcements before the event',
      'Winning matchup combinations',
      'Simple ways to give orders / coordinate',
    ],
  },
  ko: {
    heading: 'ToDo',
    verifyLabel: '확인할 것',
    verifyTag: '확인',
    verifyItems: [
      '규칙 누락 여부 확인',
      '2W 전반에 후퇴해도 괜찮은지 수치 계산',
    ],
    discussLabel: '논의할 것',
    discussTag: '논의',
    discussItems: [
      '당일까지의 공지 내용',
      '승리할 수 있는 매치업 조합',
      '간단하게 지시 / 연계하는 방법',
    ],
  },
  'zh-TW': {
    heading: 'ToDo',
    verifyLabel: '需要確認的事項',
    verifyTag: '確認',
    verifyItems: [
      '確認規則是否有遺漏',
      '計算2W前半撤退是否可行',
    ],
    discussLabel: '需要討論的事項',
    discussTag: '討論',
    discussItems: [
      '活動當天前的公告內容',
      '能夠獲勝的組合搭配',
      '簡單下達指令／協調的方法',
    ],
  },
  'zh-CN': {
    heading: 'ToDo',
    verifyLabel: '需要确认的事项',
    verifyTag: '确认',
    verifyItems: [
      '确认规则是否有遗漏',
      '计算2W前半撤退是否可行',
    ],
    discussLabel: '需要讨论的事项',
    discussTag: '讨论',
    discussItems: [
      '活动当天前的公告内容',
      '能够获胜的组合搭配',
      '简单下达指令／协调的方法',
    ],
  },
  ar: {
    heading: 'ToDo',
    verifyLabel: 'للتحقق',
    verifyTag: 'تحقق',
    verifyItems: [
      'التحقق من القواعد المفقودة',
      'حساب ما إذا كان الانسحاب في النصف الأول من الأسبوع 2 مجدياً',
    ],
    discussLabel: 'للنقاش',
    discussTag: 'نقاش',
    discussItems: [
      'محتوى الإعلانات قبل الحدث',
      'تركيبات المواجهة الفائزة',
      'طرق بسيطة لإعطاء الأوامر / التنسيق',
    ],
  },
}

export function getTodoContent(locale: string): TodoContent {
  return contents[locale] ?? contents['en']
}
