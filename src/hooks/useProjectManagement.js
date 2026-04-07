import { useState } from "react";
import { projectStorage } from "../services/storage";
import { loadProjectsWithImages } from "../utils/projectUtils";

export const useProjectManagement = (projects, setProjects) => {
  const [showModal, setShowModal] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // "view" or "edit"

  // 프로젝트 목록을 이미지와 함께 새로고침
  const refreshProjects = async () => {
    const updatedProjects = projectStorage.getAll();
    const projectsWithImages = await loadProjectsWithImages(updatedProjects);
    setProjects(projectsWithImages);
  };

  // 제목 클릭 - 상세 조회
  const handleOpenDetail = (project) => {
    setModalProject(project);
    setModalMode("view");
    setShowModal(true);
  };

  // 수정 버튼 클릭
  const handleEdit = (project) => {
    setModalProject(project);
    setModalMode("edit");
    setShowModal(true);
  };

  // 수정 저장
  const handleUpdate = async (formData) => {
    try {
      await projectStorage.update(modalProject.id, formData);
      await refreshProjects();
      handleCancel();
      alert("프로젝트가 수정되었습니다");
    } catch (error) {
      alert(error.message);
    }
  };

  // 삭제
  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await projectStorage.delete(id);
        await refreshProjects();
        if (modalProject?.id === id) {
          handleCancel();
        }
        alert("프로젝트가 삭제되었습니다");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // 모달 닫기
  const handleCancel = () => {
    setShowModal(false);
    setModalProject(null);
    setModalMode("view");
  };

  return {
    showModal,
    setShowModal,
    modalProject,
    modalMode,
    handleOpenDetail,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleCancel,
  };
};
