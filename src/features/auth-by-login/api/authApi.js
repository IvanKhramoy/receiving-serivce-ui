import httpClient from "@/shared/api/httpClient";

export const loginApi = (email, password) => {
  return httpClient.post('/api/auth/login', {email, password})
    .then((response) => response.data)
}