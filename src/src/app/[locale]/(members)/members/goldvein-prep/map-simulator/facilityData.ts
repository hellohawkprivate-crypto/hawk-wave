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

export const FACILITY_DEFS: FacilityDef[] = [
  // NW - A区画（小型拠点 + 大都市）
  { id: 'A1', type: 'LC',  name: '大型都市',   points: 175, position: { top: 14, left: 12 }, shape: 'circle' },
  { id: 'A2', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 3,  left: 3  }, shape: 'square' },
  { id: 'A3', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 3,  left: 12 }, shape: 'square' },
  { id: 'A4', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 3,  left: 22 }, shape: 'square' },
  { id: 'A5', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 14, left: 3  }, shape: 'square' },
  { id: 'A6', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 27, left: 3  }, shape: 'square' },
  // NW - C区画（中型拠点 + 軍事要塞）
  { id: 'C1', type: 'MF',  name: '軍事要塞',   points: 496, position: { top: 39, left: 27 }, shape: 'circle' },
  { id: 'C2', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 27, left: 15 }, shape: 'square' },
  { id: 'C3', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 27, left: 26 }, shape: 'square' },
  { id: 'C4', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 39, left: 15 }, shape: 'square' },
  // NE - B区画（小型拠点 + 大都市）
  { id: 'B1', type: 'LC',  name: '大型都市',   points: 175, position: { top: 14, left: 73 }, shape: 'circle' },
  { id: 'B2', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 3,  left: 62 }, shape: 'square' },
  { id: 'B3', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 3,  left: 72 }, shape: 'square' },
  { id: 'B4', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 3,  left: 82 }, shape: 'square' },
  { id: 'B5', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 14, left: 82 }, shape: 'square' },
  { id: 'B6', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 27, left: 88 }, shape: 'square' },
  // NE - D区画（中型拠点 + 軍事要塞）
  { id: 'D1', type: 'MF',  name: '軍事要塞',   points: 496, position: { top: 35, left: 58 }, shape: 'circle' },
  { id: 'D2', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 18, left: 60 }, shape: 'square' },
  { id: 'D3', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 27, left: 70 }, shape: 'square' },
  { id: 'D4', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 39, left: 70 }, shape: 'square' },
  // Center - GP
  { id: 'GP', type: 'GP',  name: 'パレス',     points: 3505, position: { top: 44, left: 45 }, shape: 'square' },
  // SW - G区画（小型拠点 + 大都市）
  { id: 'G1', type: 'LC',  name: '大型都市',   points: 175, position: { top: 76, left: 12 }, shape: 'circle' },
  { id: 'G2', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 66, left: 3  }, shape: 'square' },
  { id: 'G3', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 76, left: 3  }, shape: 'square' },
  { id: 'G4', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 87, left: 3  }, shape: 'square' },
  { id: 'G5', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 87, left: 12 }, shape: 'square' },
  { id: 'G6', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 87, left: 22 }, shape: 'square' },
  // SW - E区画（中型拠点 + 軍事要塞）
  { id: 'E1', type: 'MF',  name: '軍事要塞',   points: 496, position: { top: 56, left: 28 }, shape: 'circle' },
  { id: 'E2', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 56, left: 17 }, shape: 'square' },
  { id: 'E3', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 66, left: 17 }, shape: 'square' },
  { id: 'E4', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 66, left: 27 }, shape: 'square' },
  // SE - H区画（小型拠点 + 大都市）
  { id: 'H1', type: 'LC',  name: '大型都市',   points: 175, position: { top: 76, left: 76 }, shape: 'circle' },
  { id: 'H2', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 66, left: 88 }, shape: 'square' },
  { id: 'H3', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 76, left: 88 }, shape: 'square' },
  { id: 'H4', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 87, left: 62 }, shape: 'square' },
  { id: 'H5', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 87, left: 72 }, shape: 'square' },
  { id: 'H6', type: 'SSH', name: '小型拠点',   points: 40,  position: { top: 87, left: 88 }, shape: 'square' },
  // SE - F区画（中型拠点 + 軍事要塞）
  { id: 'F1', type: 'MF',  name: '軍事要塞',   points: 496, position: { top: 56, left: 58 }, shape: 'circle' },
  { id: 'F2', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 56, left: 70 }, shape: 'square' },
  { id: 'F3', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 66, left: 60 }, shape: 'square' },
  { id: 'F4', type: 'MSH', name: '中型拠点',   points: 251, position: { top: 66, left: 70 }, shape: 'square' },
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
