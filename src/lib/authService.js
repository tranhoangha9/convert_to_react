export const loginUser = (userData) => {
  if (typeof window === 'undefined') return;

  sessionStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('user', JSON.stringify(userData));
};

export const logoutUser = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('user');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};
