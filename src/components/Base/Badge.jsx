import styled from "styled-components";

const StyledBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 10rem;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  background-color: ${(props) => {
    if (props.variant === "proceed") return "#e3faff"; //진행중
    if (props.variant === "success") return "#00b59b"; //완료
    if (props.variant === "warning") return "#fef3c7"; //수정
    if (props.variant === "danger") return "#fee2e2"; //취소
    return "#f0f0f0"; //기본값 - 아이디어
  }};
  color: ${(props) => {
    if (props.variant === "proceed") return "#3a98dd";
    if (props.variant === "success") return "#fff";
    if (props.variant === "warning") return "#92400e";
    if (props.variant === "danger") return "#991b1b";
    return "#666"; //기본값 - 아이디어
  }};
`;

const Badge = ({ children, variant = "default" }) => {
  return <StyledBadge variant={variant}>{children}</StyledBadge>;
};

export default Badge;
