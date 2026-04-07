/**
 * 프로젝트 폼 초기값
 */
export const INITIAL_PROJECT_FORM_DATA = {
  title: "",
  description: "",
  image: null,
  link: "",
  github: "",
  category: "personal",
  status: "ongoing",
  tags: [],
  startDate: "",
  endDate: "",
  featured: false,
};

/**
 * 카테고리 옵션
 */
export const CATEGORY_OPTIONS = [
  { value: "personal", label: "개인" },
  { value: "company", label: "회사" },
];

/**
 * 상태 옵션
 */
export const STATUS_OPTIONS = [
  { value: "ongoing", label: "진행중" },
  { value: "completed", label: "완료" },
];

/**
 * 게시 여부 옵션
 */
export const FEATURED_OPTIONS = [
  { value: "true", label: "게시" },
  { value: "false", label: "비게시" },
];

/**
 * 리스트 필터 옵션
 */
export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "상태" },
  { value: "ongoing", label: "진행중" },
  { value: "completed", label: "완료" },
];

export const CATEGORY_FILTER_OPTIONS = [
  { value: "all", label: "카테고리" },
  { value: "personal", label: "개인" },
  { value: "company", label: "회사" },
];
