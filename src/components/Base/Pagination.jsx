import React from "react";
import styled from "styled-components";

const StyledPagination = styled.nav`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;

  button {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.2s;
    --tw-shadow: var(--shadow-xs);
    box-shadow:
      var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
      var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    &:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active {
      background-color: var(--primary);
      color: white;
      border-color: var(--primary);

      &:hover {
        background-color: #1f2937;
      }
    }
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <StyledPagination>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        이전
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        다음
      </button>
    </StyledPagination>
  );
};

export default Pagination;
