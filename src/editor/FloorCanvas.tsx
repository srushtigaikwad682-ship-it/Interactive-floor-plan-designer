import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { FloorObject, GRID_SIZE, Tool, getArea } from './types';

interface FloorCanvasProps { objects: FloorObject[]; selectedId: string | null; tool: Tool; zoom: number; onSelect: (id: string | null) => void; onMove: (id: string, x: number, y: number) => void; onCanvasClick: (x: number, y: number) => void; }

function FurnitureShape({ object }: { object: FloorObject }) {
  const cx = object.width / 2; const cy = object.height / 2;
  if (object.shape === 'bed') return <><rect x="10" y="10" width={object.width - 20} height={object.height - 20} rx="6" fill="white" opacity=".7" /><rect x="14" y="14" width={object.width - 28} height="42" rx="4" fill={object.color} opacity=".8" /><line x1="18" y1="60" x2={object.width - 18} y2="60" stroke="white" strokeWidth="2" opacity=".7" /></>;
  if (object.shape === 'table' || object.shape === 'dining-table') return <><ellipse cx={cx} cy={cy} rx={object.width / 2 - 8} ry={object.height / 2 - 8} fill="white" opacity=".7" /><ellipse cx={cx} cy={cy} rx={object.width / 2 - 15} ry={object.height / 2 - 15} fill={object.color} opacity=".65" /></>;
  if (object.shape === 'chair') return <><rect x="8" y="8" width={object.width - 16} height={object.height - 16} rx="10" fill={object.color} opacity=".75" /><circle cx={cx} cy={cy} r="7" fill="white" opacity=".6" /></>;
  if (object.shape === 'plant') return <><circle cx={cx} cy={cy + 5} r="16" fill={object.color} opacity=".7" /><path d={`M ${cx} ${cy + 5} Q ${cx - 8} ${cy - 18} ${cx - 14} ${cy - 16} M ${cx} ${cy + 5} Q ${cx + 8} ${cy - 20} ${cx + 15} ${cy - 14}`} fill="none" stroke={object.color} strokeWidth="5" /><circle cx={cx} cy={cy + 11} r="9" fill="#a16207" opacity=".6" /></>;
  return <rect x="8" y="8" width={object.width - 16} height={object.height - 16} rx="6" fill={object.color} opacity=".65" />;
}

export function FloorCanvas({ objects, selectedId, tool, zoom, onSelect, onMove, onCanvasClick }: FloorCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drag, setDrag] = useState<{ id: string; dx: number; dy: number } | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const scale = zoom / 100;
  const getPoint = (event: MouseEvent): { x: number; y: number } => { const rect = svgRef.current?.getBoundingClientRect(); return rect ? { x: (event.clientX - rect.left) / scale, y: (event.clientY - rect.top) / scale } : { x: 0, y: 0 }; };
  const handleBackground = (event: MouseEvent) => { if (event.target === event.currentTarget) { const point = getPoint(event); if (tool === 'select') onSelect(null); else onCanvasClick(point.x, point.y); } };
  const handleDown = (event: MouseEvent, object: FloorObject) => { event.stopPropagation(); const point = getPoint(event); if (tool !== 'select') return; onSelect(object.id); setDrag({ id: object.id, dx: point.x - object.x, dy: point.y - object.y }); };
  const handleMove = (event: MouseEvent) => { if (!drag) return; const point = getPoint(event); onMove(drag.id, Math.round((point.x - drag.dx) / GRID_SIZE) * GRID_SIZE, Math.round((point.y - drag.dy) / GRID_SIZE) * GRID_SIZE); };
  const handleUp = () => setDrag(null);
  return <div className="relative flex-1 overflow-auto bg-slate-100 scrollbar-thin"><div className="absolute left-5 top-5 z-10 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-[10px] font-medium text-slate-400 shadow-sm backdrop-blur"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-indigo-500" />{tool === 'select' ? 'Select and move objects' : `Click to place ${tool}`}</div><div className="flex min-h-full min-w-full items-start justify-center p-10"><svg ref={svgRef} width={1200 * scale} height={800 * scale} viewBox="0 0 1200 800" className="shrink-0 rounded-sm bg-white shadow-xl shadow-slate-200/70" onClick={handleBackground} onMouseMove={handleMove} onMouseUp={handleUp} onMouseLeave={handleUp} style={{ backgroundImage: 'radial-gradient(#cbd5e1 0.8px, transparent 0.8px)', backgroundSize: `${GRID_SIZE * scale}px ${GRID_SIZE * scale}px` }}>
    {objects.map((object) => { const selected = object.id === selectedId; const isHover = object.id === hoverId; return <g key={object.id} transform={`translate(${object.x},${object.y})`} onMouseDown={(event) => handleDown(event, object)} onMouseEnter={() => setHoverId(object.id)} onMouseLeave={() => setHoverId(null)} className={tool === 'select' ? 'cursor-move' : 'cursor-pointer'}>
      {object.type === 'room' && <><rect width={object.width} height={object.height} fill={object.color} fillOpacity=".72" stroke={selected ? '#4f46e5' : '#64748b'} strokeWidth={selected ? 4 : 2} /><text x={object.width / 2} y={object.height / 2 - 8} textAnchor="middle" className="pointer-events-none" fill="#334155" fontSize="16" fontWeight="600">{object.label.toUpperCase()}</text><text x={object.width / 2} y={object.height / 2 + 18} textAnchor="middle" className="pointer-events-none" fill="#64748b" fontSize="12">{object.width / 100}m × {object.height / 100}m · {getArea(object).toFixed(1)}m²</text></>}
      {object.type === 'wall' && <rect width={object.width} height={object.height} fill={object.color} stroke={selected ? '#4f46e5' : '#1e293b'} strokeWidth={selected ? 4 : 1} />}
      {object.type === 'door' && <><path d={`M 0 ${object.height} A ${object.width} ${object.width} 0 0 1 ${object.width} ${object.height}`} fill="none" stroke="#b45309" strokeWidth="2" strokeDasharray="5 3" /><rect width={object.width} height={object.height} fill="white" stroke={selected ? '#4f46e5' : '#b45309'} strokeWidth={selected ? 4 : 2} /></>}
      {object.type === 'window' && <><rect width={object.width} height={object.height} fill="#bfdbfe" stroke={selected ? '#4f46e5' : '#2563eb'} strokeWidth={selected ? 4 : 2} /><line x1={object.width / 2} y1="0" x2={object.width / 2} y2={object.height} stroke="#2563eb" strokeWidth="2" /></>}
      {object.type === 'furniture' && <><FurnitureShape object={object} /><text x={object.width / 2} y={object.height + 14} textAnchor="middle" className="pointer-events-none" fill="#64748b" fontSize="10">{object.label}</text></>}
      {(selected || isHover) && <rect x="-4" y="-4" width={object.width + 8} height={object.height + 8} fill="none" stroke={selected ? '#6366f1' : '#94a3b8'} strokeWidth={selected ? 2 : 1} strokeDasharray={selected ? '6 4' : '3 3'} pointerEvents="none" />}
    </g>; })}
  </svg></div></div>;
}
