import axios from 'axios';

export const refreshTokensRequest = async (refreshToken) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
    refreshToken,
    {
      headers: {
        'Content-Type': 'text/plain',
        'X-Idempotency-Key': crypto.randomUUID(),
      },
    }
  );
  return data;
};