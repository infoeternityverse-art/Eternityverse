import { create } from 'zustand';

const THEME_KEY = 'eternityverse-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return 'dark';
};

const applyTheme = (theme) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('light', theme === 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
};

export const useUiStore = create((set) => ({
  theme: getInitialTheme(),
  initializeTheme: () => {
    const theme = getInitialTheme();
    applyTheme(theme);
    set({ theme });
  },
  setTheme: (theme) =>
    set(() => {
      window.localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);

      return { theme };
    }),
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);

      return { theme };
    }),
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
