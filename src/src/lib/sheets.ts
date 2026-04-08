// --- スタッフ許可リスト ---

type StaffMember = {
  discord_id: string
  server: string
  alliance: string
  name: string
  memo: string
}

export async function fetchStaffAllowlist(): Promise<StaffMember[]> {
  const url = process.env.STAFF_ALLOWLIST_SHEET_URL
  if (!url) return []

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return []

  const csv = await res.text()
  const lines = csv.trim().split('\n')

  return lines.slice(1).map((line) => {
    const [discord_id, server, alliance, name, memo] = line.split(',').map((v) => v.trim())
    return { discord_id, server, alliance, name, memo }
  })
}

export async function fetchAllowedDiscordIds(): Promise<string[]> {
  const members = await fetchStaffAllowlist()
  return members.map((m) => m.discord_id).filter(Boolean)
}

// --- スプレッドシートURL構築 ---

const pubId = () => process.env.PREP_SPREADSHEET_PUB_ID ?? ''
const fileId = () => process.env.PREP_SPREADSHEET_FILE_ID ?? ''

// iframe 埋め込みURL
export function embedUrl(gid: string): string {
  return `https://docs.google.com/spreadsheets/d/e/${pubId()}/pubhtml?gid=${gid}&single=true&widget=true&headers=false`
}

// Excel ダウンロードURL
export function excelDownloadUrl(gid: string): string {
  return `https://docs.google.com/spreadsheets/d/${fileId()}/export?format=xlsx&gid=${gid}`
}

// CSV 取得URL
export function csvUrl(gid: string): string {
  return `https://docs.google.com/spreadsheets/d/e/${pubId()}/pub?gid=${gid}&single=true&output=csv`
}

// --- CSVパース・汎用フェッチ ---

// CSVからカンマ区切りをパースする（引用符対応）
function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

export async function fetchCsvRows(gid: string): Promise<string[][]> {
  const url = csvUrl(gid)
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return []

  const csv = await res.text()
  const lines = csv.trim().split('\n')

  return lines.map((line) => parseCsvLine(line))
}

// --- 戦力分析データ ---

export type PowerEntry = {
  camp: string
  server: string
  rank: string
  tag: string
  name: string
  powerValue: string
  power: string
}

export async function fetchPowerData(gid: string): Promise<PowerEntry[]> {
  const url = csvUrl(gid)
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) return []

  const csv = await res.text()
  const lines = csv.trim().split('\n')

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line)
    return {
      camp: cols[0] ?? '',
      server: cols[1] ?? '',
      rank: cols[2] ?? '',
      tag: cols[3] ?? '',
      name: cols[4] ?? '',
      powerValue: cols[5] ?? '',
      power: cols[6] ?? '',
    }
  }).filter((e) => e.name)
}
