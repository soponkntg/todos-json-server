import styled from "styled-components";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxContainer = styled.label`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 22px;
  height: 22px;
  border: 2px solid #585292;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  ${HiddenCheckbox}:checked + & {
    background-color: #585292;
  }
`;

const CheckIcon = styled.svg`
  fill: white;
  width: 11px;
  height: 8px;
  visibility: "hidden";

  ${HiddenCheckbox}:checked + & {
    visibility: visible;
  }
`;

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
  <CheckboxContainer>
    <HiddenCheckbox checked={checked} onChange={onChange} />
    <StyledCheckbox>
      <CheckIcon viewBox="0 0 11 8">
        <path d="M4.08335 6.04014L1.7508 3.7076L0.749222 4.70918L4.08335 8.04331L10.9591 1.16751L9.95755 0.165932L4.08335 6.04014Z" />
      </CheckIcon>
    </StyledCheckbox>
  </CheckboxContainer>
);
