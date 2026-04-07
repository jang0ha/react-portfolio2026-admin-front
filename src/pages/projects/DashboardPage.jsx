import Button from "../../components/Base/Button";
import ProjectForm from "../../components/Form";
import { projectStorage } from "../../services/storage";
import { authStorage } from "../../services/storage";
import { projectApi } from "../../services/api";
import Badge from "../../components/Base/Badge";
import Title from "../../components/Base/Title";
import SubTitle from "../../components/Base/SubTitle";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Base/Modal";
import { useProjectManagement } from "../../hooks/useProjectManagement";
const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // 필터링된 프로젝트
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // 초기 로드 - localStorage 데이터 사용
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // ============================================================================
        // axios 호출 예시 (현재는 localStorage 데이터)
        // ============================================================================
        // 나중에 Backend 준비되면 이렇게 변경:
        // const response = await projectApi.getAll();
        // setProjects(response.data);

        // 지금은 localStorage 데이터 사용
        const allProjects = projectStorage.getAll();

        // 각 프로젝트의 이미지를 IndexedDB에서 로드
        const projectsWithImages = await Promise.all(
          allProjects.map(async (project) => {
            if (project.hasImage) {
              const image = await projectStorage.getImage(project.id);
              return { ...project, image };
            }
            return project;
          }),
        );

        setProjects(projectsWithImages);
      } catch (error) {
        console.error("프로젝트 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // 추가
  const handleAdd = async (formData) => {
    try {
      // ============================================================================
      // axios POST 호출 예시
      // ============================================================================
      // const response = await projectApi.create(formData);
      // setProjects([response.data, ...projects]);

      await projectStorage.create(formData);

      // 이미지를 IndexedDB에서 로드
      const allProjects = projectStorage.getAll();
      const projectsWithImages = await Promise.all(
        allProjects.map(async (project) => {
          if (project.hasImage) {
            const image = await projectStorage.getImage(project.id);
            return { ...project, image };
          }
          return project;
        }),
      );

      setProjects(projectsWithImages);
      setShowForm(false);
    } catch (error) {
      alert("프로젝트 추가 실패");
    }
  };

  return (
    <>
      <Title title="Dashboard" align="left"></Title>

      {/* 모달 - 프로젝트 상세 조회/수정 */}
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

      {/* 폼 모달 추가 */}
      {showForm && (
        <ProjectForm
          project={null}
          onSave={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* 프로젝트 요약 */}
      <ul className="flex gap-3 mt-4 mb-8">
        <li
          className="flex flex-col gap-1 rounded-xl border  py-6 text-card-foreground  w-1/3 p-4 shadow-md"
          data-slot="card"
        >
          <div className="text-gray-500">총 프로젝트 개수</div>
          <div className="text-4xl font-bold my-3 mb-5">{projects.length}</div>
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-gray-400 mr-2">개인 프로젝트 :</span>
              {projects.filter((p) => p.category === "personal").length}
            </div>
            <div className="text-sm">
              <span className="text-gray-400 mr-2">회사 프로젝트 :</span>
              {projects.filter((p) => p.category === "company").length}
            </div>
          </div>
        </li>
        <li
          className="lex flex-col gap-1 rounded-xl border  py-6 text-card-foreground  w-1/3 p-4 shadow-md"
          data-slot="card"
        >
          <div className="text-gray-500">게시된 프로젝트</div>
          <div className="text-4xl font-bold my-3 mb-5">
            {projects.filter((p) => p.featured).length}
          </div>
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-gray-400 mr-2">개인 프로젝트 :</span>
              {
                projects.filter((p) => p.featured && p.category === "personal")
                  .length
              }
            </div>
            <div className="text-sm">
              <span className="text-gray-400 mr-2">회사 프로젝트 :</span>
              {
                projects.filter((p) => p.featured && p.category === "company")
                  .length
              }
            </div>
          </div>
        </li>
        <li
          className="flex flex-col gap-1 rounded-xl border  py-6 text-card-foreground  w-1/3 p-4 shadow-md"
          data-slot="card"
        >
          <div className="text-gray-500">완료된 프로젝트</div>
          <div className="text-4xl font-bold my-3 mb-5">
            {projects.filter((p) => p.status === "completed").length}
          </div>
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-gray-400 mr-2">개인 프로젝트 :</span>
              {
                projects.filter(
                  (p) => p.status === "completed" && p.category === "personal",
                ).length
              }
            </div>
            <div className="text-sm">
              <span className="text-gray-400 mr-2">회사 프로젝트 :</span>
              {
                projects.filter(
                  (p) => p.status === "completed" && p.category === "company",
                ).length
              }
            </div>
          </div>
        </li>
      </ul>

      {/* 최근 프로젝트 */}
      <section className="min-w-[64rem] overflow-auto">
        <SubTitle
          title="최근 프로젝트"
          align="left"
          desc="최근에 추가된 5개의 프로젝트 목록입니다."
        />
        <Table
          projects={projects.slice(0, 5)} // 최근 5개만 보여줌
          columns={[
            "category",
            "title",
            "description",
            "tags",
            "status",
            "featured",
            "actions",
          ]}
          onOpenDetail={handleOpenDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </>
  );
};

export default DashboardPage;
