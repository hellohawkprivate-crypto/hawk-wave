export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        <div>
          <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide mb-1">Staff Only</p>
          <h1 className="text-2xl font-bold text-gray-900">分析ページ</h1>
          <p className="text-sm text-gray-500 mt-1">Discord認証済みスタッフのみ閲覧できるページです</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">破壊値データ</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            ここに分析データが入ります。Discord OAuth認証が正常に動作しています。
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-sm text-purple-700">
          Discord OAuthにより保護されたページです。
          未認証の場合はDiscordログイン画面にリダイレクトされます。
        </div>

      </div>
    </div>
  )
}
