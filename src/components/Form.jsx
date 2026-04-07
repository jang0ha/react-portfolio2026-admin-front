import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Base/Button";
import FormField from "./FormField";
import { projectStorage } from "../services/storage";
import { parseTags } from "../utils/projectUtils";
import {
  INITIAL_PROJECT_FORM_DATA,
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  FEATURED_OPTIONS,
} from "../constants/formConstants";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  border-top: 1px solid #d1d5db;
  padding-top: 20px;
`;
const ProjectForm = ({
  project,
  onSave,
  onCancel,
  isReadOnly = false,
  onEdit,
}) => {
  const [formData, setFormData] = useState(INITIAL_PROJECT_FORM_DATA);
  const [fileName, setFileName] = useState("");

  // project가 전달되면 (수정 모드) 폼 자동 채우기
  useEffect(() => {
    const loadProjectData = async () => {
      if (project) {
        let imageData = project.image || "";

        // 이미지가 없으면 IndexedDB에서 로드
        if (!imageData && project.hasImage) {
          imageData = await projectStorage.getImage(project.id);
        }

        setFormData({
          title: project.title || "",
          description: project.description || "",
          category: project.category || "personal",
          image: imageData,
          link: project.link || "",
          github: project.github || "",
          tags: project.tags?.join(", ") || "",
          startDate: project.startDate || "",
          endDate: project.endDate || "",
          status: project.status || "ongoing",
          featured: project.featured || false,
        });

        // 기존 이미지가 있으면 파일명 설정
        if (imageData) {
          setFileName("example.png");
        } else {
          setFileName("");
        }
      } else {
        setFileName("");
      }
    };

    loadProjectData();
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "image" && type === "file") {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({
            ...prev,
            image: reader.result, // Base64 문자열
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      tags: parseTags(formData.tags),
    };

    await onSave(submitData);
  };

  return (
    <Form onSubmit={handleSubmit} className="">
      {/* ============================================================================
          타이틀
          ============================================================================ */}
      <FormField
        id="title"
        label="타이틀"
        type="text"
        value={formData.title}
        name="title"
        onChange={handleChange}
        placeholder="프로젝트 제목을 입력하세요"
        required
        disabled={isReadOnly}
      />

      {/* ============================================================================
          설명
          ============================================================================ */}
      <FormField
        id="description"
        label="설명"
        type="textarea"
        value={formData.description}
        name="description"
        onChange={handleChange}
        placeholder="프로젝트 설명을 입력하세요"
        required
        disabled={isReadOnly}
      />

      {/* ============================================================================
          카테고리
          ============================================================================ */}
      <FormField
        id="category"
        label="카테고리"
        type="select"
        value={formData.category}
        name="category"
        onChange={handleChange}
        options={CATEGORY_OPTIONS}
        required
        disabled={isReadOnly}
      />

      {/* ============================================================================
          이미지
          ============================================================================ */}
      <div className="mt-4">
        {!isReadOnly && (
          <FormField
            id="image"
            label="PC 이미지 업로드(**확장자: .png)"
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/png"
            disabled={isReadOnly}
          />
        )}
        {!isReadOnly && fileName && (
          <p className="text-sm text-gray-600 mt-2">
            선택된 파일: <strong>{fileName}</strong>
          </p>
        )}
        {formData.image && (
          <div className={isReadOnly ? "" : "mt-4"}>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {isReadOnly ? "PC 프로젝트 이미지" : "PC 이미지 미리보기"}
            </p>
            <img
              src={formData.image}
              alt="미리보기"
              className="max-w-xs h-auto rounded border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* ============================================================================
          링크
          ============================================================================ */}
      <FormField
        id="link"
        label="링크"
        type="text"
        value={formData.link}
        name="link"
        onChange={handleChange}
        placeholder="프로젝트 링크를 입력하세요"
        disabled={isReadOnly}
      />

      {/* ============================================================================
          GitHub 링크
          ============================================================================ */}
      <FormField
        id="github"
        label="GitHub 링크"
        type="text"
        value={formData.github}
        name="github"
        onChange={handleChange}
        placeholder="GitHub 링크를 입력하세요"
        disabled={isReadOnly}
      />

      {/* ============================================================================
          태그
          ============================================================================ */}
      <FormField
        id="tags"
        label="태그"
        type="text"
        value={formData.tags}
        name="tags"
        onChange={handleChange}
        placeholder="태그를 입력하세요 (쉼표로 구분)"
        required
        disabled={isReadOnly}
      />

      {/* ============================================================================
          시작 날짜
          ============================================================================ */}
      <FormField
        id="startDate"
        label="시작 날짜"
        type="date"
        value={formData.startDate}
        name="startDate"
        onChange={handleChange}
        disabled={isReadOnly}
      />

      {/* ============================================================================
          종료 날짜
          ============================================================================ */}
      <FormField
        id="endDate"
        label="종료 날짜"
        type="date"
        value={formData.endDate}
        name="endDate"
        onChange={handleChange}
        disabled={isReadOnly}
      />

      {/* ============================================================================
          프로젝트 상태 (라디오 버튼)
          ============================================================================ */}
      <FormField
        id="status"
        label="프로젝트 상태"
        type="radio"
        value={formData.status}
        name="status"
        onChange={handleChange}
        options={STATUS_OPTIONS}
        disabled={isReadOnly}
      />

      {/* ============================================================================
          게시 여부 (라디오 버튼)
          ============================================================================ */}
      <FormField
        id="featured"
        label="프로젝트 게시 여부"
        type="radio"
        value={String(formData.featured)}
        name="featured"
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            featured: e.target.value === "true",
          }));
        }}
        options={FEATURED_OPTIONS}
        disabled={isReadOnly}
      />

      {/* ============================================================================
          버튼
          ============================================================================ */}
      <FormActions>
        {isReadOnly ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            닫기
          </Button>
        ) : (
          <>
            <Button type="submit" variant="primary">
              {project ? "수정" : "등록"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              취소
            </Button>
          </>
        )}
      </FormActions>
    </Form>
  );
};

export default ProjectForm;
