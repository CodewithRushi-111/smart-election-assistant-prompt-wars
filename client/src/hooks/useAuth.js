import { create } from 'zustand';

// Using Zustand for global auth state, but wrapping it in a hook for cleaner access
const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export const useAuth = () => {
  const auth = useAuthStore();
  
  const login = async (phone) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (data.success) {
        auth.setAuth(data.user, data.token);
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return { ...auth, login };
};

export default useAuth;
