import React from "react";
import styled from "styled-components";

const StyledCard = styled.article`
  --tw-shadow: var(--shadow-sm);
  box-shadow:
    var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  color: var(--card-foreground);
  border-style: var(--tw-border-style);
  border-width: 1px;
  border-radius: calc(var(--radius) + 4px);
  padding: 1.5rem;
`;
const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
