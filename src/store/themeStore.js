import { create } from 'zustand'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return localStorage.getItem('theme') || 'light'
}

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}))
