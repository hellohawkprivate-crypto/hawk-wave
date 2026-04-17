export type FacilityType = 'SSH' | 'LC' | 'MSH' | 'MF' | 'GP'
export type Control = 'attack' | 'defense'

export type FacilityDef = {
  id: string
  type: FacilityType
  name: string
  points: number
  position: { top: number; left: number }
  shape: 'square' | 'circle'
}

export type FacilityState = {
  pct: number
  control: Control
  alliance: string | null
  active: boolean
}

export type WeekSnapshot = Record<string, FacilityState>

// 位置設計：中心(50,50)を軸に上下左右完全対称
// A(NW角) ↔ B(NE角) ↔ G(SW角) ↔ H(SE角)、C(NW内) ↔ D(NE内) ↔ E(SW内) ↔ F(SE内)
export const FACILITY_DEFS: FacilityDef[] = [
  // NW角 - A区画 (SSH×5 + LC×1)
  { id: 'A2', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 13,  left: 8  }, shape: 'square' },
  { id: 'A3', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 13,  left: 18 }, shape: 'square' },
  { id: 'A4', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 13,  left: 28 }, shape: 'square' },
  { id: 'A5', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 26, left: 8  }, shape: 'square' },
  { id: 'A1', type: 'LC',  name: '大型都市', points: 175,  position: { top: 26, left: 18 }, shape: 'circle' },
  { id: 'A6', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 39, left: 8  }, shape: 'square' },

  // NW内 - C区画 (MSH×3 + MF×1) 2×2グリッド
  { id: 'C2', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 27, left: 31 }, shape: 'square' },
  { id: 'C3', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 27, left: 42 }, shape: 'square' },
  { id: 'C4', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 38, left: 31 }, shape: 'square' },
  { id: 'C1', type: 'MF',  name: '軍事要塞', points: 496,  position: { top: 38, left: 42 }, shape: 'circle' },

  // NE角 - B区画 (A の左右鏡: left → 100-left)
  { id: 'B4', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 8,  left: 92 }, shape: 'square' },
  { id: 'B3', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 8,  left: 82 }, shape: 'square' },
  { id: 'B2', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 8,  left: 72 }, shape: 'square' },
  { id: 'B5', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 18, left: 92 }, shape: 'square' },
  { id: 'B1', type: 'LC',  name: '大型都市', points: 175,  position: { top: 18, left: 82 }, shape: 'circle' },
  { id: 'B6', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 28, left: 92 }, shape: 'square' },

  // NE内 - D区画 (C の左右鏡)
  { id: 'D3', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 27, left: 69 }, shape: 'square' },
  { id: 'D2', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 27, left: 58 }, shape: 'square' },
  { id: 'D4', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 38, left: 69 }, shape: 'square' },
  { id: 'D1', type: 'MF',  name: '軍事要塞', points: 496,  position: { top: 38, left: 58 }, shape: 'circle' },

  // Center - GP
  { id: 'GP', type: 'GP',  name: 'パレス',   points: 3505, position: { top: 50, left: 50 }, shape: 'square' },

  // SW角 - G区画 (A の上下鏡: top → 100-top)
  { id: 'G2', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 72, left: 8  }, shape: 'square' },
  { id: 'G3', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 82, left: 8  }, shape: 'square' },
  { id: 'G1', type: 'LC',  name: '大型都市', points: 175,  position: { top: 82, left: 18 }, shape: 'circle' },
  { id: 'G4', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 92, left: 8  }, shape: 'square' },
  { id: 'G5', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 92, left: 18 }, shape: 'square' },
  { id: 'G6', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 92, left: 28 }, shape: 'square' },

  // SW内 - E区画 (C の上下鏡: top → 100-top)
  { id: 'E2', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 62, left: 31 }, shape: 'square' },
  { id: 'E1', type: 'MF',  name: '軍事要塞', points: 496,  position: { top: 62, left: 42 }, shape: 'circle' },
  { id: 'E3', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 73, left: 31 }, shape: 'square' },
  { id: 'E4', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 73, left: 42 }, shape: 'square' },

  // SE角 - H区画 (A の上下左右鏡)
  { id: 'H2', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 72, left: 92 }, shape: 'square' },
  { id: 'H3', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 82, left: 92 }, shape: 'square' },
  { id: 'H1', type: 'LC',  name: '大型都市', points: 175,  position: { top: 82, left: 82 }, shape: 'circle' },
  { id: 'H6', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 92, left: 92 }, shape: 'square' },
  { id: 'H5', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 92, left: 82 }, shape: 'square' },
  { id: 'H4', type: 'SSH', name: '小型拠点', points: 40,   position: { top: 92, left: 72 }, shape: 'square' },

  // SE内 - F区画 (C の上下左右鏡)
  { id: 'F1', type: 'MF',  name: '軍事要塞', points: 496,  position: { top: 62, left: 58 }, shape: 'circle' },
  { id: 'F2', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 62, left: 69 }, shape: 'square' },
  { id: 'F3', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 73, left: 58 }, shape: 'square' },
  { id: 'F4', type: 'MSH', name: '中型拠点', points: 251,  position: { top: 73, left: 69 }, shape: 'square' },
]

// 2W初期値（1戦目終了後）
// active: false = 1戦目で破壊済 or 未解放（GP）
const WEEK2_INITIAL: WeekSnapshot = {
  A1: { pct: 86.9, control: 'defense', alliance: null, active: false }, // 破壊済
  A2: { pct: 24.2, control: 'defense', alliance: null, active: true  },
  A3: { pct: 25.4, control: 'defense', alliance: null, active: false }, // 破壊済
  A4: { pct: 73.4, control: 'defense', alliance: null, active: false }, // 破壊済
  A5: { pct: 85.7, control: 'defense', alliance: null, active: true  },
  A6: { pct: 89.7, control: 'defense', alliance: null, active: false }, // 破壊済
  B1: { pct: 4.6,  control: 'defense', alliance: null, active: true  },
  B2: { pct: 89.1, control: 'defense', alliance: null, active: false }, // 破壊済
  B3: { pct: 19.3, control: 'defense', alliance: null, active: false }, // 破壊済
  B4: { pct: 52.3, control: 'defense', alliance: null, active: false }, // 破壊済
  B5: { pct: 27.6, control: 'defense', alliance: null, active: false }, // 破壊済
  B6: { pct: 78.4, control: 'defense', alliance: null, active: false }, // 破壊済
  C1: { pct: 71.2, control: 'attack',  alliance: null, active: true  },
  C2: { pct: 82.3, control: 'attack',  alliance: null, active: true  },
  C3: { pct: 55.8, control: 'attack',  alliance: null, active: true  },
  C4: { pct: 14.5, control: 'attack',  alliance: null, active: true  },
  D1: { pct: 53.7, control: 'attack',  alliance: null, active: true  },
  D2: { pct: 49.1, control: 'attack',  alliance: null, active: true  },
  D3: { pct: 59.2, control: 'attack',  alliance: null, active: true  },
  D4: { pct: 21.9, control: 'attack',  alliance: null, active: true  },
  E1: { pct: 28.8, control: 'attack',  alliance: null, active: true  },
  E2: { pct: 85.5, control: 'attack',  alliance: null, active: true  },
  E3: { pct: 17.7, control: 'attack',  alliance: null, active: true  },
  E4: { pct: 44.2, control: 'attack',  alliance: null, active: true  },
  F1: { pct: 46.3, control: 'attack',  alliance: null, active: true  },
  F2: { pct: 78.1, control: 'attack',  alliance: null, active: true  },
  F3: { pct: 50.9, control: 'attack',  alliance: null, active: true  },
  F4: { pct: 40.8, control: 'attack',  alliance: null, active: true  },
  G1: { pct: 54.3, control: 'defense', alliance: null, active: true  },
  G2: { pct: 10.3, control: 'defense', alliance: null, active: false }, // 破壊済
  G3: { pct: 87.2, control: 'defense', alliance: null, active: false }, // 破壊済
  G4: { pct: 51.3, control: 'defense', alliance: null, active: false }, // 破壊済
  G5: { pct: 74.6, control: 'defense', alliance: null, active: false }, // 破壊済
  G6: { pct: 26.6, control: 'defense', alliance: null, active: false }, // 破壊済
  GP: { pct: 50.0, control: 'defense', alliance: null, active: false }, // 3W解放
  H1: { pct: 22.5, control: 'defense', alliance: null, active: true  },
  H2: { pct: 21.6, control: 'defense', alliance: null, active: false }, // 破壊済
  H3: { pct: 78.6, control: 'defense', alliance: null, active: true  },
  H4: { pct: 99.1, control: 'defense', alliance: null, active: true  },
  H5: { pct: 80.7, control: 'defense', alliance: null, active: false }, // 破壊済
  H6: { pct: 88.6, control: 'defense', alliance: null, active: true  },
}

export type WeekMeta = {
  label: string
  initial: WeekSnapshot
}

// 各週の初期値（3W以降はlocalStorageから上書き可能）
export const BUILTIN_WEEKS: Record<string, WeekMeta> = {
  week2: { label: '2W', initial: WEEK2_INITIAL },
}

export const LS_WEEK_KEYS = {
  week2: 'goldvein_sim_week2',
  week3: 'goldvein_sim_week3',
  week3Initial: 'goldvein_week3_initial',
}
