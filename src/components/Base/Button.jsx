import styled, { css } from "styled-components";

// 포커싱
const focusRing = css`
  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
`;

const transition = (properties) => css`
  transition: ${properties} 0.2s ease-in-out;
`;

// 색 변수
const variantStyles = {
  primary: css`
    background-color: var(--primary);
    color: white;
    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    &:active:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
  secondary: css`
    background-color: var(--secondary);
    border: 1px solid #e5e7eb;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    &:active:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
  danger: css`
    background-color: #ef4444;
    color: white;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    &:active:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
  ghost: css`
    background-color: transparent;
    &:hover:not(:disabled) {
      filter: drop-shadow(2px 4px 6px black);
    }

    &:active:not(:disabled) {
      filter: drop-shadow(2px 4px 6px black);
    }
  `,
  outline: css`
    background-color: transparent;
    border: 1px solid var(--secondary);
    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    &:active:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
};

// 사이즈
const sizeStyles = {
  sm: css`
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 4px;
  `,
  md: css`
    padding: 10px 16px;
    font-size: 14px;
    border-radius: 6px;
  `,
  lg: css`
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 6px;
  `,
};

const StyledButton = styled.button`
  ${focusRing}
  ${transition("all")}

  font-weight: 600;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) => variantStyles[props.$variant || "primary"]}
  ${(props) => sizeStyles[props.$size || "md"]}
`;

const Button = ({
  variant = "primary",
  size = "md",
  children,
  style,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $size={size} style={style} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
