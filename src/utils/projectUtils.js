import { projectStorage } from "../services/storage";

/**
 * 태그 문자열을 배열로 변환
 * @param {string|array} tags - 쉼표로 구분된 문자열 또는 배열
 * @returns {array} 정제된 태그 배열
 */
export const parseTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags.filter((tag) => tag && tag.trim());
  }
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
  }
  return [];
};

/**
 * 프로젝트 목록을 이미지와 함께 로드
 * @param {array} projects - 프로젝트 배열
 * @returns {Promise<array>} 이미지가 로드된 프로젝트 배열
 */
export const loadProjectsWithImages = async (projects) => {
  if (!Array.isArray(projects)) return [];

  return await Promise.all(
    projects.map(async (project) => {
      if (project.hasImage) {
        const image = await projectStorage.getImage(project.id);
        return { ...project, image };
      }
      return project;
    })
  );
};
