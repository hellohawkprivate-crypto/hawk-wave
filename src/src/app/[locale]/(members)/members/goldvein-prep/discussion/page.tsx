export default function TodoPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">ToDo</h2>

      {/* たしかめること */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">確認</span>
          たしかめること
        </h3>
        <div className="space-y-2">
          <TodoItem>ルールの漏れを確認する</TodoItem>
          <TodoItem>2W前半に逃げても問題ないかを数値計算する</TodoItem>
        </div>
      </section>

      {/* 話し合いたいこと */}
      <section className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">議論</span>
          話し合いたいこと
        </h3>
        <div className="space-y-2">
          <TodoItem>当日までのアナウンス内容</TodoItem>
          <TodoItem>勝てる組み合わせのマッチアップ</TodoItem>
          <TodoItem>簡単に指示を出す / 連携をとる方法</TodoItem>
        </div>
      </section>

    </div>
  )
}

function TodoItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
      <div className="w-4 h-4 border-2 border-gray-300 rounded shrink-0" />
      <span className="text-sm text-gray-700">{children}</span>
    </div>
  )
}
