import React from "react";
import styled from "styled-components";
const StyledTag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  margin: 5px;
  background-color: var(--muted);
  border-radius: 4px;
  font-size: 0.75rem;
  color: #333;
`;

const Tag = ({ children }) => {
  return <StyledTag>{children}</StyledTag>;
};

export default Tag;
