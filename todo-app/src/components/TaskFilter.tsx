import styled, { css } from "styled-components";
import dropdownIcon from "../assets/DropdownIcon.svg";
import React from "react";

interface DropdownProps {
  isOpen: boolean;
  selectedOption?: string;
  toggleFilter: () => void;
  selectFilter: (option: string) => void;
}

const DropDownContainer = styled.div`
  background: #ffffff;
  border-radius: 10px;

  position: relative;
`;
const DropDownHeader = styled.div`
  width: 110px;
  height: 29px;
  padding: 7px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const DronDownIcon = styled.img<Pick<DropdownProps, "isOpen">>`
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

const DropDownListContainer = styled.ul`
  position: absolute;

  margin-top: 5px;
  padding: 10px 6px;
  width: 110px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const DropDownList = styled.li<{ isSelect: boolean }>`
  list-style: none;
  border-radius: 8px;
  height: 28px;
  padding: 8px 5px;

  cursor: pointer;

  :hover {
    background: #585292;
    opacity: 0.6;
    color: #ffffff;
  }

  ${(props) =>
    props.isSelect &&
    css`
      background: #585292;
      color: #ffffff;
    `}
`;

const ListItem = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
`;

const options = ["All", "Done", "Undone"];

export const TaskFilter: React.FC<DropdownProps> = ({
  isOpen,
  selectedOption,
  toggleFilter,
  selectFilter,
}) => {
  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggleFilter}>
        <ListItem>{selectedOption || "All"}</ListItem>
        <DronDownIcon src={dropdownIcon} alt="dropdown-icon" isOpen={isOpen} />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          {options.map((option) => (
            <DropDownList isSelect={option == selectedOption}>
              <ListItem
                onClick={() => selectFilter(option)}
                key={Math.random()}
              >
                {option}
              </ListItem>
            </DropDownList>
          ))}
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};
