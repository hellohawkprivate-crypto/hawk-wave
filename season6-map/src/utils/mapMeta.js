export const FACTION_COLOR = {
  A: '#1d4ed8',
  B: '#2563eb',
  C: '#15803d',
  D: '#16a34a',
  E: '#3b82f6',
  F: '#60a5fa',
  G: '#22c55e',
  H: '#4ade80',
  I: '#7c3aed',
};

export const WARZONE_FACTION = {
  A: 'Wetland', B: 'Wetland',
  C: 'Deepwood', D: 'Deepwood',
  E: 'Wetland', F: 'Wetland',
  G: 'Deepwood', H: 'Deepwood',
  I: 'Central',
};

export function getFaction(id) {
  return id ? id.charAt(0) : null;
}

export const FACILITY_COLOR = {
  'Wetland Sanctuary': '#1e3a8a',
  'Deepwood Sanctuary': '#14532d',
  'Ancestral Temple': '#7c2d12',
  'Wetland Village': '#60a5fa',
  'Deepwood Village': '#86efac',
  'Wetland Barracks': '#3b82f6',
  'Deepwood Barracks': '#22c55e',
  'Wetland Assembly': '#2563eb',
  'Deepwood Assembly': '#16a34a',
  'Trade Post': '#fbbf24',
  'Warzone Outpost': '#dc2626',
  'Console': '#6b7280',
  'Snake Altar': '#fbbf24',
  'Echo Altar': '#fb923c',
  'Gust Altar': '#f97316',
  'Feather Altar': '#ea580c',
  'Treehaven Altar': '#9a3412',
  'Fishing Ground': '#cbd5e1',
};

export function getFacilityColor(item) {
  return FACILITY_COLOR[item.name] || FACTION_COLOR[getFaction(item.id)] || '#999';
}
