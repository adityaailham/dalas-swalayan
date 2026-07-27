// Helper untuk mengambil token JWT dari cookie (Berjalan di Browser / Client Component)
const getToken = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find(row => row.startsWith('admin_token='));
  return match ? match.split('=')[1] : null;
};

// Fetcher untuk GET SWR
export const fetcher = async (url: string) => {
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { headers });
  
  if (!res.ok) {
    throw new Error('Gagal memuat data');
  }
  
  return res.json();
};

// Fetcher untuk POST, PUT, DELETE (Operasi Modal)
export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  return await fetch(url, {
    ...options,
    headers
  });
};
