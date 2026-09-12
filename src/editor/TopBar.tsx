import { ChevronDown, Download, FilePlus2, FolderOpen, Redo2, Save, Undo2, ZoomIn, ZoomOut } from 'lucide-react';

interface TopBarProps {
  designName: string;
  onNameChange: (name: string) => void;
  onBack: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onSave: () => void;
  onExport: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onNew: () => void;
  onLoad: () => void;
}

export function TopBar({ designName, onNameChange, onBack, onUndo, onRedo, canUndo, canRedo, onSave, onExport, zoom, onZoomChange, onNew, onLoad }: TopBarProps) {
  return <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
    <div className="flex min-w-0 items-center gap-4"><button onClick={onBack} className="flex shrink-0 items-center gap-2 font-display font-bold tracking-tight text-slate-900 transition hover:text-indigo-600"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white"><span className="text-sm">P</span></div><span className="hidden sm:inline">PLANORA</span></button><div className="hidden h-6 w-px bg-slate-200 sm:block" /><div className="min-w-0"><input value={designName} onChange={(e) => onNameChange(e.target.value)} className="w-32 truncate border-none bg-transparent text-sm font-semibold text-slate-800 outline-none focus:ring-0 sm:w-48" /><p className="text-[10px] uppercase tracking-wider text-slate-400">Floor plan</p></div></div>
    <div className="flex items-center gap-1 sm:gap-2">
      <button title="New design" onClick={onNew} className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 sm:block"><FilePlus2 size={17} /></button><button title="Load saved design" onClick={onLoad} className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 sm:block"><FolderOpen size={17} /></button><div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />
      <button title="Undo" disabled={!canUndo} onClick={onUndo} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"><Undo2 size={17} /></button><button title="Redo" disabled={!canRedo} onClick={onRedo} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"><Redo2 size={17} /></button><div className="mx-1 h-6 w-px bg-slate-200" />
      <button onClick={onSave} className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600"><Save size={15} /><span className="hidden sm:inline">Save</span></button><button onClick={onExport} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"><Download size={15} /><span className="hidden sm:inline">Export</span></button><div className="ml-1 hidden items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 sm:flex"><button onClick={() => onZoomChange(Math.max(50, zoom - 10))} className="p-1 text-slate-400 hover:text-slate-800"><ZoomOut size={14} /></button><span className="w-8 text-center text-xs font-medium text-slate-600">{zoom}%</span><button onClick={() => onZoomChange(Math.min(150, zoom + 10))} className="p-1 text-slate-400 hover:text-slate-800"><ZoomIn size={14} /></button></div><button className="p-1 text-slate-400 sm:hidden"><ChevronDown size={17} /></button>
    </div>
  </header>;
}
