import { BASE_URL } from '../constants';

export const fetcher = async (endpoint: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      // window.location.href = '/'
      throw new Error('Unauthorized');
    }
    throw new Error('An error occurred while fetching the data.');
  }

  return response.json();
};

const mutationFetcher = (method: 'POST' | 'PUT' | 'DELETE' | 'PATCH') =>
  async (endpoint: string, { arg }: { arg?: any }) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      ...(arg && { body: JSON.stringify(arg) })
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.href = '/'
        throw new Error('Unauthorized');
      }
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };


export const serverFetcher = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      window.location.href = '/'
      throw new Error('Unauthorized');
    }
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
};

export const postFetcher = mutationFetcher('POST')
export const deleteFetcher = mutationFetcher('DELETE')
export const patchFetcher = mutationFetcher('PATCH')
export const putFetcher = mutationFetcher('PUT')

