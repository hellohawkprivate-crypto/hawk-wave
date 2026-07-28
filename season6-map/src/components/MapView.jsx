import { useState, useRef, useCallback, memo } from 'react';
import mapData from '../data/season6_map.json';
import { getFacilityColor, WARZONE_FACTION } from '../utils/mapMeta';

// タイルごとの色を起動時に一度だけ計算
const TILE_COLORS = Object.fromEntries(
  mapData.map(item => [item.id, getFacilityColor(item)])
);

// SVG上のマウス座標に該当するタイルを線形探索
function findTileAt(x, y) {
  for (let i = mapData.length - 1; i >= 0; i--) {
    const { coordinates: c } = mapData[i];
    if (x >= c.x && x < c.x + c.width && y >= c.y && y < c.y + c.height) {
      return mapData[i];
    }
  }
  return null;
}

const TILE_CURSOR_STYLE = { cursor: 'pointer' };

const Tile = memo(({ item, color, isSelected, isHovered }) => {
  const { x, y, width, height } = item.coordinates;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      stroke={isSelected ? '#fbbf24' : '#1f2937'}
      strokeWidth={isSelected ? 3 : 0.5}
      opacity={isHovered ? 0.7 : 1}
      style={TILE_CURSOR_STYLE}
    />
  );
});

Tile.displayName = 'Tile';

function Tooltip({ tile, mousePos }) {
  if (!tile || !mousePos) return null;

  // 画面端を超えないよう位置調整
  const left = mousePos.x + 14;
  const top = mousePos.y + 14;

  return (
    <div className="tooltip" style={{ left, top }}>
      <div className="tooltip-name">{tile.name}</div>
      <div>ID: <strong>{tile.id}</strong></div>
      <div>座標: ({tile.coordinates.x}, {tile.coordinates.y})</div>
      <div>Level: {tile.level}</div>
      {tile.buff && (
        <div>Buff: {tile.buff.item} +{tile.buff.percentage}%</div>
      )}
    </div>
  );
}

function DetailPanel({ tile }) {
  if (!tile) {
    return (
      <div className="side-panel">
        <p className="panel-empty">タイルをクリックして詳細表示</p>
      </div>
    );
  }

  const wz = tile.id.charAt(0);
  const faction = WARZONE_FACTION[wz] || wz;
  const { x, y, width, height } = tile.coordinates;

  return (
    <div className="side-panel">
      <div className="panel-header">
        <div className="panel-wz">{wz}</div>
        <div className="panel-title">{tile.name}</div>
      </div>

      <table className="panel-table">
        <tbody>
          <tr><th>ID</th><td>{tile.id}</td></tr>
          <tr><th>Warzone</th><td>{wz}</td></tr>
          <tr><th>Faction</th><td>{faction}</td></tr>
          <tr><th>Level</th><td>{tile.level}</td></tr>
          <tr>
            <th>Coordinates</th>
            <td>x:{x} y:{y}<br />w:{width} h:{height}</td>
          </tr>
          {tile.buff && (
            <tr>
              <th>Buff</th>
              <td>{tile.buff.item} × {tile.buff.percentage}%</td>
            </tr>
          )}
          {tile.resources?.influence && (
            <tr>
              <th>Influence</th>
              <td>{tile.resources.influence.toLocaleString()}</td>
            </tr>
          )}
          {tile.isCapitol && (
            <tr>
              <th>Capitol</th>
              <td className="capitol-badge">★ Capitol</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function MapView() {
  const svgRef = useRef(null);
  const [hoveredTile, setHoveredTile] = useState(null);
  const [selectedTile, setSelectedTile] = useState(null);
  const [mousePos, setMousePos] = useState(null);

  // getBoundingClientRectでSVG座標を取得 (スクロール対応)
  // SVGはwidth/height=3050, viewBox="0 0 3050 3050"なので1:1マッピング
  const getSvgCoords = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    const svgP = getSvgCoords(e);
    if (!svgP) return;
    const tile = findTileAt(svgP.x, svgP.y);
    setHoveredTile(tile || null);
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [getSvgCoords]);

  const handleMouseLeave = useCallback(() => {
    setHoveredTile(null);
    setMousePos(null);
  }, []);

  const handleClick = useCallback((e) => {
    const svgP = getSvgCoords(e);
    if (!svgP) return;
    const tile = findTileAt(svgP.x, svgP.y);
    setSelectedTile(tile || null);
  }, [getSvgCoords]);

  return (
    <div className="map-root">
      <div className="map-container">
        <svg
          ref={svgRef}
          viewBox="0 0 3050 3050"
          width={3050}
          height={3050}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {mapData.map(item => (
            <Tile
              key={item.id}
              item={item}
              color={TILE_COLORS[item.id]}
              isSelected={selectedTile?.id === item.id}
              isHovered={hoveredTile?.id === item.id}
            />
          ))}
          {/* 選択タイルの強調枠（最前面に描画） */}
          {selectedTile && (
            <rect
              x={selectedTile.coordinates.x}
              y={selectedTile.coordinates.y}
              width={selectedTile.coordinates.width}
              height={selectedTile.coordinates.height}
              fill="none"
              stroke="#fbbf24"
              strokeWidth={3}
              pointerEvents="none"
            />
          )}
        </svg>
      </div>

      <DetailPanel tile={selectedTile} />
      <Tooltip tile={hoveredTile} mousePos={mousePos} />
    </div>
  );
}
