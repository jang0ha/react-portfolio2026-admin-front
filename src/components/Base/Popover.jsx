import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const PopoverWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledPopoverButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.4rem;
  height: 1.4rem;
  background-color: var(--secondary);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: bold;
  color: var(--primary);
  transition: all 0.2s;

  &:hover {
    background-color: var(--primary);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const StyledPopoverContent = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 12px;
  min-width: 180px;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  word-break: keep-all;
  text-align: center;

  ${(props) => {
    if (props.position === "top") return "bottom: calc(100% + 8px);";
    if (props.position === "bottom") return "top: calc(100% + 8px);";
    return "top: calc(100% + 8px);";
  }}

  ${(props) => {
    if (props.align === "left") return "left: 0;";
    if (props.align === "right") return "right: 0;";
    return "left: 50%; transform: translateX(-50%);";
  }}

  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: all 0.2s;
`;

export const Popover = ({
  position = "bottom",
  align = "center",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <PopoverWrapper ref={wrapperRef}>
      <StyledPopoverButton onClick={() => setIsOpen(!isOpen)}>
        ?
      </StyledPopoverButton>
      <StyledPopoverContent isOpen={isOpen} position={position} align={align}>
        {children}
      </StyledPopoverContent>
    </PopoverWrapper>
  );
};
