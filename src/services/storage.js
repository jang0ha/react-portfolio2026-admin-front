import { MOCK_PROJECTS, MOCK_ADMIN } from "./mockData";

const STORAGE_KEYS = {
  PROJECTS: "portfolio_projects",
  TOKEN: "portfolio_token",
  ADMIN: "portfolio_admin",
};

const DB_NAME = "PortfolioDb";
const STORE_NAME = "projectImages";

// IndexedDB 초기화
function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "projectId" });
      }
    };
  });
}

// IndexedDB 저장소 함수
const imageDB = {
  async save(projectId, imageData) {
    try {
      const db = await initializeDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({ projectId, imageData });

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      throw error;
    }
  },

  async get(projectId) {
    try {
      const db = await initializeDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(projectId);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result?.imageData || null);
      });
    } catch (error) {
      console.error("이미지 조회 실패:", error);
      return null;
    }
  },

  async delete(projectId) {
    try {
      const db = await initializeDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(projectId);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
    }
  },
};

// 초기화 - 처음 실행 시 mock 데이터 로드
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(MOCK_PROJECTS));
  }
}

// 프로젝트 관리
export const projectStorage = {
  getAll() {
    initializeStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || "[]");
  },

  async getById(id) {
    const projects = this.getAll();
    const project = projects.find((p) => p.id === parseInt(id));
    if (project && project.image) {
      const imageData = await imageDB.get(parseInt(id));
      if (imageData) {
        return { ...project, image: imageData };
      }
    }
    return project;
  },

  async create(data) {
    const projects = this.getAll();
    const newProject = {
      ...data,
      image: null, // Base64 데이터는 저장하지 않음
      id: Math.max(...projects.map((p) => p.id), 0) + 1,
      createdAt: new Date().toISOString(),
    };

    // 이미지 데이터가 있으면 IndexedDB에 저장
    if (data.image) {
      await imageDB.save(newProject.id, data.image);
      newProject.hasImage = true;
    }

    projects.unshift(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return newProject;
  },

  async update(id, data) {
    const projects = this.getAll();
    const index = projects.findIndex((p) => p.id === parseInt(id));
    if (index === -1) throw new Error("프로젝트를 찾을 수 없습니다");

    // 이미지 데이터가 있으면 IndexedDB에 저장
    if (data.image && typeof data.image === "string" && data.image.startsWith("data:")) {
      await imageDB.save(parseInt(id), data.image);
      data.image = null;
      data.hasImage = true;
    }

    projects[index] = {
      ...projects[index],
      ...data,
    };
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return projects[index];
  },

  async delete(id) {
    const projects = this.getAll();
    const filtered = projects.filter((p) => p.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));

    // IndexedDB에서도 삭제
    await imageDB.delete(parseInt(id));
  },

  async getImage(projectId) {
    return await imageDB.get(parseInt(projectId));
  },
};

// 인증 관리
export const authStorage = {
  login(email, password) {
    if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
      const token = "mock-token-" + Date.now();
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(
        STORAGE_KEYS.ADMIN,
        JSON.stringify({
          id: MOCK_ADMIN.id,
          email: MOCK_ADMIN.email,
        }),
      );
      return { token, admin: { id: MOCK_ADMIN.id, email: MOCK_ADMIN.email } };
    }
    throw new Error("이메일 또는 비밀번호가 잘못되었습니다");
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN);
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  getAdmin() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN) || "null");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
