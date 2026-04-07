import styled from "styled-components";

export const StyledFileInput = styled.input`
  display: flex;
  height: 44px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: var(--shadow-xs);
  &::file-selector-button {
    width: 10rem;
    height: 100%;
    margin-right: 1rem;
    background-color: var(--muted);
    border-right: 1px solid var(--border);
    &::after {
      content: "";
      width: 2rem;
      height: 100%;
    }
  }
`;

export const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s;
  box-shadow: var(--shadow-xs);
  ${(props) =>
    props.focused &&
    `
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  `}
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    color: #9ca3af;
    border: 0;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  input[type="radio"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  span {
    color: #1f2937;
  }

  input[type="radio"]:disabled {
    cursor: not-allowed;
  }

  input[type="radio"]:disabled + span {
    color: #9ca3af;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  input[type="checkbox"] {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  span {
    color: #1f2937;
  }

  input[type="checkbox"]:disabled {
    cursor: not-allowed;
  }

  input[type="checkbox"]:disabled + span {
    color: #9ca3af;
  }
`;

const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  required = false,
  disabled = false,
  className,
  checked,
  options,
  label,
  focused = false,
  accept,
}) => {
  // Radio Buttons
  if (type === "radio") {
    return (
      <RadioGroup>
        {options?.map((option) => (
          <RadioLabel key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={String(value) === String(option.value)}
              onChange={onChange}
              required={required}
              disabled={disabled}
            />
            <span>{option.label}</span>
          </RadioLabel>
        ))}
      </RadioGroup>
    );
  }

  // Checkbox
  if (type === "checkbox") {
    return (
      <CheckboxLabel>
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
        <span>{label}</span>
      </CheckboxLabel>
    );
  }

  // File Input
  if (type === "file") {
    return (
      <StyledFileInput
        id={id}
        type="file"
        name={name}
        onChange={onChange}
        accept={accept}
        required={required}
        disabled={disabled}
        className={className}
        focused={focused}
      />
    );
  }

  // Text Input
  return (
    <StyledInput
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={className}
      focused={focused}
    />
  );
};

export default Input;
