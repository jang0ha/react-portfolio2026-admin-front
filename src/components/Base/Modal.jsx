import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const sizeStyles = {
  sm: "max-width: 400px;",
  md: "max-width: 600px;",
  lg: "max-width: 800px;",
};

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 2xl;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  ${(props) => sizeStyles[props.size || "sm"]}
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #1f2937;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;
const Modal = ({ isOpen, onClose, title, children, size }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} size={size}>
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
