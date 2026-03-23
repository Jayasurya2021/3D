import { create } from 'zustand';

export const MATERIALS = [
  { id: 'silk', label: 'Pure Silk', color: '#ffffff', roughness: 0.1, metalness: 0.1 },
  { id: 'cotton', label: 'Soft Cotton', color: '#ffffff', roughness: 0.8, metalness: 0.0 },
  { id: 'linen', label: 'Fine Linen', color: '#ffffff', roughness: 0.9, metalness: 0.0 },
];

export const SHIRT_COLORS = [
  '#2C3E50', '#0c332bff', '#683c3cff',
  '#0e5296ff', '#98999aff', '#000000ff',
  '#650e05ff', '#292254ff', '#39635bff',
  '#e0d4a3ff'
];

export const PANT_COLORS = [
  '#000000ff', '#3d3b3bff', '#8a8484ff',
  '#0e1721ff', '#503a26ff', '#102f31ff'
];

export const ENVIRONMENTS = [
  { id: 'city', label: 'City' },
  { id: 'studio', label: 'Studio' },
  { id: 'apartment', label: 'Apartment' },
  { id: 'lobby', label: 'Lobby' },
  { id: 'night', label: 'Night' },
];

export const SHOES_COLORS = [
  '#000000', '#FFFFFF', '#523919ff'
];

export const useModelStore = create((set) => ({
  activeMaterial: 'linen',
  activeEnvironment: 'city',
  autoRotate: false,
  isRotating: false,
  hoveredItem: null,

  shirtVisible: true,
  shirtColor: SHIRT_COLORS[0],

  pantVisible: true,
  pantColor: PANT_COLORS[1],

  shoesVisible: true,
  shoesColor: SHOES_COLORS[0],

  setMaterial: (id) => set({ activeMaterial: id }),
  setEnvironment: (id) => set({ activeEnvironment: id }),
  setAutoRotate: (val) => set({ autoRotate: val }),

  setShirtVisible: (val) => set({ shirtVisible: val }),
  setShirtColor: (color) => set({ shirtColor: color }),

  setPantVisible: (val) => set({ pantVisible: val }),
  setPantColor: (color) => set({ pantColor: color }),

  setShoesVisible: (val) => set({ shoesVisible: val }),
  setShoesColor: (color) => set({ shoesColor: color }),

  setHoveredItem: (val) => set({ hoveredItem: val }),
  setIsRotating: (val) => set({ isRotating: val }),
}));
