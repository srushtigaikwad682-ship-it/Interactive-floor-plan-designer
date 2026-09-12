import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FloorObject,
  EditorDesign,
  STORAGE_KEY,
  createRoom,
  createWall,
  createDoor,
  createWindowObj,
  createFurniture,
  snapToGrid,
  GRID_SIZE,
} from './types';

export interface HistoryState {
  past: FloorObject[][];
  future: FloorObject[][];
}

export function useEditorState() {
  const [objects, setObjects] = useState<FloorObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryState>({ past: [], future: [] });
  const [designName, setDesignName] = useState('Untitled Design');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const skipHistoryRef = useRef(false);

  const pushHistory = useCallback((prev: FloorObject[]) => {
    setHistory((h) => ({
      past: [...h.past.slice(-29), prev],
      future: [],
    }));
  }, []);

  const updateObjects = useCallback(
    (updater: (prev: FloorObject[]) => FloorObject[], recordHistory = true) => {
      setObjects((prev) => {
        if (recordHistory && !skipHistoryRef.current) {
          pushHistory(prev);
        }
        return updater(prev);
      });
    },
    [pushHistory]
  );

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const previous = h.past[h.past.length - 1];
      setObjects((current) => {
        setHistory((h2) => ({
          past: h2.past.slice(0, -1),
          future: [current, ...h2.future].slice(0, 30),
        }));
        return previous;
      });
      return h;
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const next = h.future[0];
      setObjects((current) => {
        setHistory((h2) => ({
          past: [...h2.past, current].slice(-30),
          future: h2.future.slice(1),
        }));
        return next;
      });
      return h;
    });
  }, []);

  const addObject = useCallback(
    (obj: FloorObject) => {
      updateObjects((prev) => [...prev, obj]);
      setSelectedId(obj.id);
    },
    [updateObjects]
  );

  const deleteObject = useCallback(
    (id: string) => {
      updateObjects((prev) => prev.filter((o) => o.id !== id));
      setSelectedId(null);
    },
    [updateObjects]
  );

  const updateObject = useCallback(
    (id: string, patch: Partial<FloorObject>, recordHistory = false) => {
      updateObjects(
        (prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)),
        recordHistory
      );
    },
    [updateObjects]
  );

  const save = useCallback(() => {
    const design: EditorDesign = {
      objects,
      name: designName,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(design));
    setLastSaved(design.savedAt);
  }, [objects, designName]);

  const load = useCallback(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const design: EditorDesign = JSON.parse(raw);
        setObjects(design.objects);
        setDesignName(design.name);
        setLastSaved(design.savedAt);
        setHistory({ past: [], future: [] });
      } catch {
        // ignore
      }
    }
  }, []);

  const clearAll = useCallback(() => {
    updateObjects(() => []);
    setSelectedId(null);
  }, [updateObjects]);

  const addRoomAtCenter = useCallback(
    (cx: number, cy: number) => {
      const w = 300;
      const h = 250;
      addObject(createRoom(snapToGrid(cx - w / 2), snapToGrid(cy - h / 2), w, h));
    },
    [addObject]
  );

  const addWallAtCenter = useCallback(
    (cx: number, cy: number) => {
      addObject(createWall(snapToGrid(cx - 100), snapToGrid(cy), 200, 15));
    },
    [addObject]
  );

  const addDoorAt = useCallback(
    (cx: number, cy: number) => {
      addObject(createDoor(snapToGrid(cx), snapToGrid(cy)));
    },
    [addObject]
  );

  const addWindowAt = useCallback(
    (cx: number, cy: number) => {
      addObject(createWindowObj(snapToGrid(cx), snapToGrid(cy)));
    },
    [addObject]
  );

  const addFurnitureAt = useCallback(
    (cx: number, cy: number, shape: string) => {
      addObject(createFurniture(snapToGrid(cx), snapToGrid(cy), shape));
    },
    [addObject]
  );

  const handleCanvasClick = useCallback(
    (tool: string, cx: number, cy: number, furnitureShape?: string) => {
      switch (tool) {
        case 'room':
          addRoomAtCenter(cx, cy);
          break;
        case 'wall':
          addWallAtCenter(cx, cy);
          break;
        case 'door':
          addDoorAt(cx, cy);
          break;
        case 'window':
          addWindowAt(cx, cy);
          break;
        case 'furniture':
          if (furnitureShape) addFurnitureAt(cx, cy, furnitureShape);
          break;
      }
    },
    [addRoomAtCenter, addWallAtCenter, addDoorAt, addWindowAt, addFurnitureAt]
  );

  useEffect(() => {
    load();
  }, [load]);

  return {
    objects,
    selectedId,
    setSelectedId,
    history,
    undo,
    redo,
    addObject,
    deleteObject,
    updateObject,
    updateObjects,
    save,
    load,
    clearAll,
    designName,
    setDesignName,
    lastSaved,
    handleCanvasClick,
  };
};
