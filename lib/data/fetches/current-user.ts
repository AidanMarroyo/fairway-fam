export const fetchCurrentUser = async () => {
  try {
    const res = await fetch('/api/user/profile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch current user');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching current user:', error);
  }
};
