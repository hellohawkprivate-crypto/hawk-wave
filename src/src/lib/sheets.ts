type StaffMember = {
  discord_id: string
  server: string
  alliance: string
  name: string
  memo: string
}

// Google Sheets の公開CSVからスタッフ許可リストを取得する
export async function fetchStaffAllowlist(): Promise<StaffMember[]> {
  const url = process.env.STAFF_ALLOWLIST_SHEET_URL
  if (!url) return []

  const res = await fetch(url, { next: { revalidate: 60 } }) // 60秒キャッシュ
  if (!res.ok) return []

  const csv = await res.text()
  const lines = csv.trim().split('\n')

  // 1行目はヘッダーなのでスキップ
  return lines.slice(1).map((line) => {
    const [discord_id, server, alliance, name, memo] = line.split(',').map((v) => v.trim())
    return { discord_id, server, alliance, name, memo }
  })
}

// 許可されたDiscord IDの一覧を返す
export async function fetchAllowedDiscordIds(): Promise<string[]> {
  const members = await fetchStaffAllowlist()
  return members.map((m) => m.discord_id).filter(Boolean)
}
