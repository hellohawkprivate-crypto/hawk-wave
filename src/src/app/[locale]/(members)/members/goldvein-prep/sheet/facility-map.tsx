'use client'

type Facility = {
  tag: string
  name: string
  pt: string
  initial: string
}

// 各施設のマップ上の位置（%指定）
const positions: Record<string, { top: number; left: number }> = {
  // NW - A区画（小型拠点）
  A2: { top: 3, left: 3 },
  A3: { top: 3, left: 12 },
  A4: { top: 3, left: 22 },
  A5: { top: 14, left: 3 },
  A6: { top: 27, left: 3 },
  // NW - A1（大都市）
  A1: { top: 14, left: 12 },
  // NW - C区画（中型拠点）
  C2: { top: 27, left: 15 },
  C3: { top: 18, left: 26 },
  C4: { top: 39, left: 15 },
  // NW - C1（軍事要塞）
  C1: { top: 35, left: 27 },

  // NE - B区画（小型拠点）
  B2: { top: 3, left: 62 },
  B3: { top: 3, left: 72 },
  B4: { top: 3, left: 82 },
  B5: { top: 14, left: 82 },
  B6: { top: 27, left: 88 },
  // NE - B1（大都市）
  B1: { top: 14, left: 73 },
  // NE - D区画（中型拠点）
  D2: { top: 18, left: 60 },
  D3: { top: 27, left: 70 },
  D4: { top: 39, left: 70 },
  // NE - D1（軍事要塞）
  D1: { top: 35, left: 58 },

  // Center - GP
  GP: { top: 44, left: 45 },

  // SW - G区画（小型拠点）
  G2: { top: 66, left: 3 },
  G3: { top: 76, left: 3 },
  G4: { top: 87, left: 3 },
  G5: { top: 87, left: 12 },
  G6: { top: 87, left: 22 },
  // SW - G1（大都市）
  G1: { top: 76, left: 12 },
  // SW - E区画（中型拠点）
  E2: { top: 56, left: 17 },
  E3: { top: 66, left: 17 },
  E4: { top: 66, left: 27 },
  // SW - E1（軍事要塞）
  E1: { top: 56, left: 28 },

  // SE - H区画（小型拠点）
  H2: { top: 66, left: 88 },
  H3: { top: 76, left: 88 },
  H4: { top: 87, left: 62 },
  H5: { top: 87, left: 72 },
  H6: { top: 87, left: 88 },
  // SE - H1（大都市）
  H1: { top: 76, left: 76 },
  // SE - F区画（中型拠点）
  F2: { top: 56, left: 70 },
  F3: { top: 66, left: 60 },
  F4: { top: 66, left: 70 },
  // SE - F1（軍事要塞）
  F1: { top: 56, left: 58 },
}

// 施設タイプに応じた色
function getColor(name: string) {
  if (name.includes('パレス') || name.includes('GP')) return { bg: 'rgba(99,102,241,0.85)', text: 'white' }
  if (name.includes('軍事') || name.includes('要塞')) return { bg: 'rgba(16,185,129,0.9)', text: 'white' }
  if (name.includes('大都市')) return { bg: 'rgba(220,38,38,0.85)', text: 'white' }
  if (name.includes('中型')) return { bg: 'rgba(34,139,100,0.85)', text: 'white' }
  return { bg: 'rgba(185,28,28,0.85)', text: 'white' } // 小型拠点
}

export function FacilityMap({ facilities }: { facilities: Facility[] }) {
  return (
    <div className="relative w-full">
      {/* ベース画像 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/goldvein-map.png"
        alt="金脈攻防戦 マップ"
        className="w-full rounded-xl"
      />

      {/* 施設オーバーレイ */}
      {facilities.map((f) => {
        const pos = positions[f.tag]
        if (!pos) return null
        const color = getColor(f.name)
        const isLarge = f.name.includes('パレス') || f.name.includes('GP')

        return (
          <div
            key={f.tag}
            className="absolute flex flex-col items-center pointer-events-none"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`rounded-md px-1.5 py-0.5 text-center leading-tight ${isLarge ? 'rounded-lg px-2 py-1' : ''}`}
              style={{ backgroundColor: color.bg, color: color.text }}
            >
              <p className="font-bold" style={{ fontSize: isLarge ? '11px' : '9px' }}>{f.tag}</p>
              <p className="font-extrabold" style={{ fontSize: isLarge ? '14px' : '11px' }}>{f.initial}%</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
