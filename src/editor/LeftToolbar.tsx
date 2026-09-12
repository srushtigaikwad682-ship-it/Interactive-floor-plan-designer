import { BrickWall, DoorOpen, MousePointer2, Move, Sofa, Square, SunMedium } from 'lucide-react';
import { FURNITURE_CATALOG, Tool } from './types';

interface LeftToolbarProps { tool: Tool; onToolChange: (tool: Tool) => void; onFurniture: (shape: string) => void; }

const tools: { id: Tool; label: string; icon: typeof MousePointer2; hint: string }[] = [
  { id: 'select', label: 'Select', icon: MousePointer2, hint: 'Select & move objects' },
  { id: 'wall', label: 'Wall', icon: BrickWall, hint: 'Add a wall' },
  { id: 'room', label: 'Room', icon: Square, hint: 'Add a room' },
  { id: 'door', label: 'Door', icon: DoorOpen, hint: 'Add a door' },
  { id: 'window', label: 'Window', icon: SunMedium, hint: 'Add a window' },
];

export function LeftToolbar({ tool, onToolChange, onFurniture }: LeftToolbarProps) {
  return <aside className="flex w-[72px] shrink-0 flex-col items-center border-r border-slate-200 bg-white py-4 sm:w-[206px] sm:items-stretch sm:px-3">
    <p className="mb-3 hidden px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">Tools</p>
    <div className="space-y-1">{tools.map(({ id, label, icon: Icon, hint }) => <button key={id} title={hint} onClick={() => onToolChange(id)} className={`group flex w-full items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium transition sm:justify-start sm:px-3 ${tool === id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}><Icon size={18} strokeWidth={tool === id ? 2.3 : 1.8} /><span className="hidden sm:inline">{label}</span>{tool === id && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-indigo-600 sm:block" />}</button>)}</div>
    <div className="my-4 h-px w-full bg-slate-100" />
    <p className="mb-3 hidden px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">Furniture</p>
    <button title="Add furniture" onClick={() => onToolChange('furniture')} className={`mb-2 flex w-full items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium transition sm:justify-start sm:px-3 ${tool === 'furniture' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}><Sofa size={18} /><span className="hidden sm:inline">Furniture</span></button>
    <div className="hidden space-y-1 sm:block">{FURNITURE_CATALOG.slice(0, 9).map((item) => <button key={item.shape} onClick={() => onFurniture(item.shape)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100"><Square size={12} /></span>{item.label}</button>)}</div>
    <div className="mt-auto hidden border-t border-slate-100 pt-4 sm:block"><div className="flex items-center gap-2 px-2 text-xs text-slate-400"><Move size={14} /> Click canvas to place</div></div>
  </aside>;
}
