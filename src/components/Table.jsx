import React from "react";
import styled from "styled-components";
import Badge from "./Base/Badge";
import Button from "./Base/Button";
import Tag from "./Base/Tag";

const StyledTable = styled.table`
  width: 100%;
  min-width: 1200px;
  border-collapse: collapse;
  font-size: 0.8rem;
  th {
    background-color: var(--muted);
  }
  th,
  td {
    border: 1px solid var(--border);
    padding: 0.5rem 1rem;
    text-align: left;
    word-break: break-all;
  }
  thead {
    th {
      position: sticky;
      top: 0;
    }
  }
  tbody {
    tr {
      &:hover {
        background: var(--Accent);
      }
    }
  }
`;

const Table = ({
  projects,
  columns = ["title", "category", "tags", "featured", "actions"],
  onEdit,
  onDelete,
  onOpenDetail,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ko-KR");
  };

  // 컬럼 설정
  const columnConfig = {
    image: { label: "이미지", width: "10%" },
    category: { label: "카테고리" },
    title: { label: "제목", width: "15%" },
    description: { label: "설명", width: "30%" },
    tags: { label: "태그" },
    featured: { label: "게시여부" },
    startDate: { label: "시작일" },
    endDate: { label: "종료일" },
    status: { label: "상태", width: "fit-content" },
    actions: { label: "관리", width: "fit-content" },
  };

  // ============================================================================
  // 핵심: 각 컬럼별 렌더링 함수
  // ============================================================================
  const renderCell = (project, column) => {
    switch (column) {
      case "image":
        return project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              maxWidth: "80px",
              maxHeight: "60px",
              borderRadius: "4px",
            }}
          />
        ) : (
          <span style={{ color: "#9ca3af" }}>-</span>
        );

      case "category":
        return project.category === "personal" ? "개인" : "회사";

      case "title":
        return (
          <button
            onClick={() => onOpenDetail?.(project)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "inherit",
              textDecoration: onOpenDetail ? "underline" : "none",
            }}
          >
            <strong>{project.title}</strong>
          </button>
        );

      case "description":
        return project.description;

      case "tags":
        return (
          <>
            {project.tags &&
              project.tags.map((tag, idx) => <Tag key={idx}>{tag}</Tag>)}
          </>
        );

      case "featured":
        return project.featured ? <span>게시중</span> : <span>-</span>;

      case "startDate":
        return formatDate(project.startDate);

      case "endDate":
        return formatDate(project.endDate);

      case "status":
        return project.status === "completed" ? (
          <Badge variant="success">완료</Badge>
        ) : (
          <Badge variant="proceed">진행중</Badge>
        );

      case "actions":
        return (
          <>
            <Button variant="primary" size="sm" onClick={() => onEdit(project)}>
              수정
            </Button>
            <Button
              variant="outline"
              className="ml-2"
              size="sm"
              onClick={() => onDelete(project.id)}
            >
              삭제
            </Button>
          </>
        );

      default:
        return "-";
    }
  };

  return (
    <StyledTable className="w-full border-0">
      <colgroup>
        {columns.map((col) => (
          <col key={col} style={{ width: columnConfig[col]?.width }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{columnConfig[col]?.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            {columns.map((col) => (
              <td key={`${project.id}-${col}`}>{renderCell(project, col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
