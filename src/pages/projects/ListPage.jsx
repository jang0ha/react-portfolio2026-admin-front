import { useState, useEffect } from "react";
import Table from "../../components/Table";
import ProjectForm from "../../components/Form";
import Modal from "../../components/Base/Modal";
import { projectStorage } from "../../services/storage";
import Title from "../../components/Base/Title";
import Button from "../../components/Base/Button";
import Select from "../../components/Base/Select";
import Input from "../../components/Base/Input";
import { Popover } from "../../components/Base/Popover";
import Pagination from "../../components/Base/Pagination";
import { useProjectManagement } from "../../hooks/useProjectManagement";
import { loadProjectsWithImages } from "../../utils/projectUtils";
import {
  STATUS_FILTER_OPTIONS,
  CATEGORY_FILTER_OPTIONS,
} from "../../constants/formConstants";

const ListProjectsPage = () => {
  const [projects, setProjects] = useState([]); // 프로젝트 목록
  const [searchTerm, setSearchTerm] = useState(""); //검색어
  const [categoryFilter, setCategoryFilter] = useState("all"); //카테고리 필터
  const [statusFilter, setStatusFilter] = useState("all"); //상태 필터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; //페이지당 아이템 수

  const {
    showModal,
    modalProject,
    modalMode,
    handleOpenDetail,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleCancel,
  } = useProjectManagement(projects, setProjects);

  useEffect(() => {
    const loadProjects = async () => {
      const allProjects = projectStorage.getAll();
      const projectsWithImages = await loadProjectsWithImages(allProjects);
      setProjects(projectsWithImages);
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || project.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 페이지네이션 로직
  useEffect(() => {
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
  }, [searchTerm, categoryFilter, statusFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* ============================================================================
          모달 - 프로젝트 상세 조회/수정
          ============================================================================ */}
      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        title={modalMode === "view" ? "프로젝트 상세 정보" : "프로젝트 수정"}
        size="lg"
      >
        <ProjectForm
          project={modalProject}
          onSave={handleUpdate}
          onCancel={handleCancel}
          isReadOnly={modalMode === "view"}
          onEdit={() => handleEdit(modalProject)}
        />
      </Modal>

      {/* 페이지 제목 */}
      <div className="relative">
        <Title
          title="프로젝트 리스트"
          align="left"
          subTitle="전체 프로젝트 목록입니다."
        ></Title>
        <div className="absolute bottom-2 right-0">
          <Popover align="right" position="bottom">
            상태 / 필터 / 검색어 값에 따라 필터링 가능합니다.
            <br /> <br />
            3개 이상 프로젝트를 등록후 페이지네이션을 확인해주세요. <br />
            (5프로젝트당 / 1p)
          </Popover>
        </div>
      </div>

      {/* ============================================================================
          검색/필터 & 추가 버튼
          ============================================================================ */}
      <div className="flex gap-4 my-6">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={STATUS_FILTER_OPTIONS}
          className="px-4 py-2 border rounded"
        />

        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          options={CATEGORY_FILTER_OPTIONS}
          className="px-4 py-2 border rounded"
        />

        <Input
          type="text"
          placeholder="프로젝트 제목 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />

        <Button variant="primary">검색</Button>
      </div>

      {/* ============================================================================
          테이블
          ============================================================================ */}
      <div className="overflow-auto w-full border-y">
        <Table
          projects={paginatedProjects}
          columns={[
            "category",
            "title",
            "description",
            "tags",
            "startDate",
            "status",
            "actions",
          ]}
          onOpenDetail={handleOpenDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* ============================================================================
          페이지네이션
          ============================================================================ */}
      {filteredProjects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePaginate}
        />
      )}
    </>
  );
};

export default ListProjectsPage;
