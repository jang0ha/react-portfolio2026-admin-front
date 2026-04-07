import styled from "styled-components";
import Input from "./Base/Input";
import Select from "./Base/Select";
import Textarea from "./Base/Textarea";

const FormField = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  options,
  accept,
  disabled = false,
}) => {
  // ============================================================================
  // Text Input
  // ============================================================================
  if (
    type === "text" ||
    type === "email" ||
    type === "url" ||
    type === "password"
  ) {
    return (
      <FieldGroup>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </FieldGroup>
    );
  }

  // ============================================================================
  // Textarea
  // ============================================================================
  if (type === "textarea") {
    return (
      <FieldGroup>
        <Label htmlFor={id}>{label}</Label>
        <Textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={5}
          disabled={disabled}
        />
      </FieldGroup>
    );
  }

  // ============================================================================
  // Select
  // ============================================================================
  if (type === "select") {
    return (
      <FieldGroup>
        <Label htmlFor={id}>{label}</Label>
        <Select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          <option value="">선택하세요</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FieldGroup>
    );
  }

  // ============================================================================
  // Date
  // ============================================================================
  if (type === "date") {
    return (
      <FieldGroup>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      </FieldGroup>
    );
  }

  // ============================================================================
  // File
  // ============================================================================
  if (type === "file") {
    return (
      <FieldGroup>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          type="file"
          name={name}
          onChange={onChange}
          accept={accept}
          required={required}
          disabled={disabled}
        />
      </FieldGroup>
    );
  }

  // ============================================================================
  // Radio Buttons
  // ============================================================================
  if (type === "radio") {
    return (
      <FieldGroup>
        <Label>{label}</Label>
        <Input
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          options={options}
        />
      </FieldGroup>
    );
  }

  // ============================================================================
  // Checkbox
  // ============================================================================
  if (type === "checkbox") {
    return (
      <FieldGroup>
        <Input
          id={id}
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          required={required}
          label={label}
        />
      </FieldGroup>
    );
  }

  return null;
};

// ============================================================================
// Styled Components
// ============================================================================

const FieldGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
`;

export default FormField;
