import React from "react";
import styled from "styled-components";
const StyledTextArea = styled.textarea`
  padding: 10px 12px;
  width: 100%;
  box-shadow: var(--shadow-xs);
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }
`;
const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 5,
}) => {
  return (
    <StyledTextArea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
    />
  );
};

export default Textarea;
