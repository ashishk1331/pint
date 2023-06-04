import { create } from 'zustand'

export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

  // store gradient
  gradient: null,
  setGradient: (gradient) => set(prev => ({ gradient })),

  // shadow value
  shadow: 'lg',
  setShadow: (shadow) => set(prev => ({ shadow })),

  // frame gap property
  frameGap: 25,
  setFrameGap: (percent) => set(prev => ({ frameGap: percent })),

  // roundness of the image's border
  radius: 10,
  setRadius: (radius) => set(prev => ({ radius })),
}))