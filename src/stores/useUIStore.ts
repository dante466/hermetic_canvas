import { create } from 'zustand'

type UIState = {
  isControlsPanelVisible: boolean;
  toggleControlsPanel: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isControlsPanelVisible: true,
  toggleControlsPanel: () => set((state) => ({ isControlsPanelVisible: !state.isControlsPanelVisible })),
})) 