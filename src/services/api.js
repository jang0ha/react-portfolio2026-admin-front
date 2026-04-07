import axios from "axios";

// ============================================================================
// axios 인스턴스 설정
// ============================================================================

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("portfolio_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 401 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("portfolio_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ============================================================================
// API 호출 함수들 (Backend 준비 후 사용)
// ============================================================================

export const projectApi = {
  // GET /api/projects
  getAll: async () => {
    try {
      // Backend 준비 후: const response = await api.get('/projects');
      // 지금은 Mock 데이터 반환
      return Promise.resolve({ data: [] }); // Backend 연동 시 수정
    } catch (error) {
      console.error("프로젝트 조회 실패:", error);
      throw error;
    }
  },

  // POST /api/projects
  create: async (data) => {
    try {
      // Backend 준비 후: const response = await api.post('/projects', data);
      return Promise.resolve({ data: { ...data, id: Date.now() } });
    } catch (error) {
      console.error("프로젝트 생성 실패:", error);
      throw error;
    }
  },

  // PUT /api/projects/:id
  update: async (id, data) => {
    try {
      // Backend 준비 후: const response = await api.put(`/projects/${id}`, data);
      return Promise.resolve({ data: { ...data, id } });
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
      throw error;
    }
  },

  // DELETE /api/projects/:id
  delete: async (id) => {
    try {
      // Backend 준비 후: await api.delete(`/projects/${id}`);
      return Promise.resolve({ data: { id } });
    } catch (error) {
      console.error("프로젝트 삭제 실패:", error);
      throw error;
    }
  },
};

export const authApi = {
  // POST /api/auth/login
  login: async (email, password) => {
    try {
      // Backend 준비 후: const response = await api.post('/auth/login', { email, password });
      return Promise.resolve({
        data: { token: "mock-token", admin: { id: 1, email } },
      });
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },
};

export default api;
