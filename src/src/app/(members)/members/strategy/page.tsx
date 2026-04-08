export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        <div>
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">Members Only</p>
          <h1 className="text-2xl font-bold text-gray-900">作戦ページ</h1>
          <p className="text-sm text-gray-500 mt-1">同盟員のみ閲覧できるページです</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-3">今週の作戦</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            ここに作戦内容が入ります。パスワード認証が正常に動作しています。
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          パスワード認証により保護されたページです。
          未認証の場合は <code className="font-mono">/login</code> にリダイレクトされます。
        </div>

      </div>
    </div>
  )
}
