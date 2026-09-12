import { useCallback, useState } from 'react';
import { ArrowLeft, CheckCircle2, PanelRight, Trash2 } from 'lucide-react';
import { FloorCanvas } from './editor/FloorCanvas';
import { LeftToolbar } from './editor/LeftToolbar';
import { PropertiesPanel } from './editor/PropertiesPanel';
import { TopBar } from './editor/TopBar';
import { Tool } from './editor/types';
import { useEditorState } from './editor/useEditorState';

interface EditorProps { onBack: () => void; }

export function Editor({ onBack }: EditorProps) {
  const state = useEditorState();
  const [tool, setTool] = useState<Tool>('select');
  const [zoom, setZoom] = useState(80);
  const [savedMessage, setSavedMessage] = useState(false);
  const selected = state.objects.find((object) => object.id === state.selectedId) ?? null;
  const showSaved = useCallback(() => { state.save(); setSavedMessage(true); window.setTimeout(() => setSavedMessage(false), 2200); }, [state]);
  const handleExport = useCallback(() => { const payload = JSON.stringify({ name: state.designName, objects: state.objects }, null, 2); const blob = new Blob([payload], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${state.designName.replace(/\s+/g, '-').toLowerCase()}.json`; link.click(); URL.revokeObjectURL(url); }, [state.designName, state.objects]);
  const handleNew = useCallback(() => { if (state.objects.length === 0 || window.confirm('Start a new design? Your current unsaved layout will be cleared.')) { state.clearAll(); state.setDesignName('Untitled Design'); } }, [state]);
  const handleCanvasClick = useCallback((x: number, y: number) => { state.handleCanvasClick(tool, x, y, undefined); setTool('select'); }, [state, tool]);
  const handleFurniture = useCallback((shape: string) => { state.handleCanvasClick('furniture', 600, 400, shape); setTool('select'); }, [state]);
  return <div className="flex h-screen flex-col overflow-hidden bg-slate-100"><TopBar designName={state.designName} onNameChange={state.setDesignName} onBack={onBack} onUndo={state.undo} onRedo={state.redo} canUndo={state.history.past.length > 0} canRedo={state.history.future.length > 0} onSave={showSaved} onExport={handleExport} zoom={zoom} onZoomChange={setZoom} onNew={handleNew} onLoad={state.load} />
    <div className="flex min-h-0 flex-1"><LeftToolbar tool={tool} onToolChange={setTool} onFurniture={handleFurniture} /><FloorCanvas objects={state.objects} selectedId={state.selectedId} tool={tool} zoom={zoom} onSelect={state.setSelectedId} onMove={(id, x, y) => state.updateObject(id, { x, y })} onCanvasClick={handleCanvasClick} /><PropertiesPanel selected={selected} onUpdate={(patch) => selected && state.updateObject(selected.id, patch)} onDelete={() => selected && state.deleteObject(selected.id)} onClear={() => state.setSelectedId(null)} /></div>
    <div className="flex h-9 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-4 text-[10px] text-slate-400"><span>{state.objects.length} object{state.objects.length === 1 ? '' : 's'} <span className="mx-2">·</span> Grid 50 × 50 cm</span><span className="flex items-center gap-2">{savedMessage ? <span className="flex items-center gap-1.5 text-teal-600"><CheckCircle2 size={13} /> Saved locally</span> : <><PanelRight size={13} /> Select an object for properties</>}</span><button onClick={state.clearAll} className="flex items-center gap-1 text-slate-400 transition hover:text-red-500"><Trash2 size={12} /> Clear all</button></div>
    <button onClick={onBack} className="fixed bottom-14 left-4 z-20 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-lg sm:hidden"><ArrowLeft size={14} /> Exit editor</button>
  </div>;
}
