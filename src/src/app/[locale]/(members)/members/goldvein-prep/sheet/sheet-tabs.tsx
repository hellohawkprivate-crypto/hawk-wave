'use client'

import { useState } from 'react'
import { FacilityMap } from './facility-map'

type DataTab = {
  key: string
  label: string
  type: 'data'
  facilityRows: string[][]
  conditionRows: string[][]
  downloadUrl: string
}

type IframeTab = {
  key: string
  label: string
  type: 'iframe'
  embedUrl: string
  downloadUrl: string
}

type MapTab = {
  key: string
  label: string
  type: 'map'
  facilities: { tag: string; name: string; pt: string; initial: string }[]
  downloadUrl: string
}

type Tab = DataTab | IframeTab | MapTab

function DownloadButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {label}
    </a>
  )
}

function CsvTable({ rows, className }: { rows: string[][]; className?: string }) {
  if (rows.length === 0) return null

  const header = rows[0]
  const body = rows.slice(1)

  return (
    <div className={`overflow-x-auto ${className ?? ''}`}>
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="text-left px-4 py-2 text-gray-500 font-medium whitespace-nowrap">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {body.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-2 whitespace-nowrap ${
                    j === 0 ? 'text-gray-900 font-medium' : 'text-gray-700 tabular-nums'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SheetTabs({ tabs, downloadLabel }: { tabs: Tab[]; downloadLabel: string }) {
  const [activeTab, setActiveTab] = useState(0)
  const current = tabs[activeTab]

  return (
    <div>
      {/* サブタブ + ダウンロード */}
      <div className="flex items-end justify-between mb-4">
        <div className="flex gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                i === activeTab
                  ? 'bg-white text-gray-900 border border-b-0 border-gray-200'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <DownloadButton href={current.downloadUrl} label={downloadLabel} />
      </div>

      {/* コンテンツ */}
      {current.type === 'data' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <CsvTable rows={current.facilityRows} />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <CsvTable rows={current.conditionRows} />
          </div>
        </div>
      ) : current.type === 'map' ? (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-4">
          <FacilityMap facilities={current.facilities} />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <iframe
              src={current.embedUrl}
              className="w-full min-w-[800px]"
              style={{ height: '600px', border: 'none' }}
              title={current.label}
            />
          </div>
        </div>
      )}
    </div>
  )
}
