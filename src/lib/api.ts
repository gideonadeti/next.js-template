import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3000/api/v1",
});

let interceptorId: number | null = null;

export function setupAuthInterceptor(getToken: () => Promise<string | null>) {
  if (interceptorId !== null) {
    api.interceptors.request.eject(interceptorId);
  }

  interceptorId = api.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // getToken failed — proceed without auth header
    }
    return config;
  });
}

export function teardownAuthInterceptor() {
  if (interceptorId !== null) {
    api.interceptors.request.eject(interceptorId);
    interceptorId = null;
  }
}

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export default api;
