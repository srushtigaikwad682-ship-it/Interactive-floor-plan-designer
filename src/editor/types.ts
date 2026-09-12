export type Tool = 'select' | 'wall' | 'room' | 'door' | 'window' | 'furniture';

export type ObjectType = 'room' | 'wall' | 'door' | 'window' | 'furniture';

export interface FloorObject {
  id: string;
  type: ObjectType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  label: string;
  color: string;
  shape?: string;
}

export interface EditorDesign {
  objects: FloorObject[];
  name: string;
  savedAt: string;
}

export const GRID_SIZE = 50;
export const WALL_THICKNESS = 15;
export const DOOR_WIDTH = 80;
export const DOOR_HEIGHT = 15;
export const WINDOW_WIDTH = 100;
export const WINDOW_HEIGHT = 15;
export const STORAGE_KEY = 'planora-design';

export const FURNITURE_CATALOG = [
  { shape: 'sofa', label: 'Sofa', width: 200, height: 80, color: '#818cf8' },
  { shape: 'bed', label: 'Bed', width: 160, height: 200, color: '#a78bfa' },
  { shape: 'table', label: 'Table', width: 120, height: 80, color: '#fbbf24' },
  { shape: 'chair', label: 'Chair', width: 50, height: 50, color: '#94a3b8' },
  { shape: 'dining-table', label: 'Dining Table', width: 160, height: 90, color: '#f59e0b' },
  { shape: 'toilet', label: 'Toilet', width: 45, height: 70, color: '#60a5fa' },
  { shape: 'sink', label: 'Sink', width: 60, height: 45, color: '#22d3ee' },
  { shape: 'fridge', label: 'Fridge', width: 70, height: 70, color: '#cbd5e1' },
  { shape: 'stove', label: 'Stove', width: 60, height: 60, color: '#f97316' },
  { shape: 'bathtub', label: 'Bathtub', width: 170, height: 80, color: '#7dd3fc' },
  { shape: 'tv', label: 'TV', width: 120, height: 20, color: '#1e293b' },
  { shape: 'plant', label: 'Plant', width: 50, height: 50, color: '#34d399' },
  { shape: 'wardrobe', label: 'Wardrobe', width: 200, height: 60, color: '#c084fc' },
  { shape: 'desk', label: 'Desk', width: 140, height: 70, color: '#fbbf24' },
] as const;

export const ROOM_COLORS = [
  '#e0e7ff',
  '#dbeafe',
  '#ccfbf1',
  '#fef3c7',
  '#fce7f3',
  '#f3e8ff',
];

let idCounter = 0;

export function generateId(): string {
  return `obj-${Date.now()}-${idCounter++}`;
}

export function snapToGrid(value: number, size: number = GRID_SIZE): number {
  return Math.round(value / size) * size;
}

export function getArea(obj: FloorObject): number {
  return (obj.width * obj.height) / 10000;
}

export function createRoom(x: number, y: number, width: number, height: number): FloorObject {
  return {
    id: generateId(),
    type: 'room',
    x,
    y,
    width,
    height,
    rotation: 0,
    label: 'Room',
    color: ROOM_COLORS[Math.floor(Math.random() * ROOM_COLORS.length)],
  };
}

export function createWall(x: number, y: number, width: number, height: number): FloorObject {
  return {
    id: generateId(),
    type: 'wall',
    x,
    y,
    width,
    height,
    rotation: 0,
    label: 'Wall',
    color: '#334155',
  };
}

export function createDoor(x: number, y: number): FloorObject {
  return {
    id: generateId(),
    type: 'door',
    x: x - DOOR_WIDTH / 2,
    y: y - DOOR_HEIGHT / 2,
    width: DOOR_WIDTH,
    height: DOOR_HEIGHT,
    rotation: 0,
    label: 'Door',
    color: '#b45309',
  };
}

export function createWindowObj(x: number, y: number): FloorObject {
  return {
    id: generateId(),
    type: 'window',
    x: x - WINDOW_WIDTH / 2,
    y: y - WINDOW_HEIGHT / 2,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    rotation: 0,
    label: 'Window',
    color: '#2563eb',
  };
}

export function createFurniture(x: number, y: number, shape: string): FloorObject {
  const item = FURNITURE_CATALOG.find((f) => f.shape === shape) ?? FURNITURE_CATALOG[0];
  return {
    id: generateId(),
    type: 'furniture',
    x: x - item.width / 2,
    y: y - item.height / 2,
    width: item.width,
    height: item.height,
    rotation: 0,
    label: item.label,
    color: item.color,
    shape: item.shape,
  };
}
