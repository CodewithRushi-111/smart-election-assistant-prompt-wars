import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  journeyStage: 'unaware',
  badges: [],
  setUser: (user) => set({ user, isAuthenticated: !!user, journeyStage: user?.journeyStage || 'unaware' }),
  setJourneyStage: (stage) => set({ journeyStage: stage }),
  logout: () => set({ user: null, isAuthenticated: false, journeyStage: 'unaware', badges: [] })
}));

export default useUserStore;
