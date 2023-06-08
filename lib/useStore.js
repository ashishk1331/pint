import { create } from 'zustand'

export const useStore = create((set) => ({

  user:null,
  setUser: (user) => set(prev => ({user})),

  globalLoading:true,
  setGlobalLoading: (globalLoading) => set(prev => ({globalLoading})),
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

  // image data uri
  imageURI: null,
  setURI: (imageURI) => set(prev => ({ imageURI })),
  // image file
  file: null,
  setFile: (file) => set(prev => ({ file })),

  imageSize: 0,
  setImageSize: (imageSize) => set(prev => ({ imageSize })),
  width: 0,
  height: 0,
  setDimensions: (width, height) => set(prev => ({ width, height })),
}))