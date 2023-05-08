import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { TodoProps } from "../type";
import { useDataContext } from "../context/DataContext";

interface TaskInputProps {
  initialVal?: string;
  editTodo?: (editedTitle: string) => void;
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 46px;
  background: #ffffff;
  border-radius: 9999px;
  padding: 12px 20px;
`;

const Input = styled.input.attrs({ type: "text" })`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  border: 0;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #bcbcbc;
  }
  :-ms-input-placeholder {
    color: #bcbcbc;
  }
`;

const Button = styled.button`
  background: #585292;
  border-radius: 999px;
  padding: 10px 17px;
  border: 0;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;

  cursor: pointer;
`;

export const TaskInput: React.FC<TaskInputProps> = ({
  initialVal = "",
  editTodo,
}) => {
  const { handleAddTodo } = useDataContext();
  const [inputValue, setInputValue] = useState<string>(initialVal);
  const [isTyped, setIsTyped] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue !== "") {
      setIsTyped(true);
    } else {
      setIsTyped(false);
    }
  }, [inputValue]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleForm: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (editTodo) {
      editTodo(inputValue);
    } else {
      const todo: TodoProps = {
        id: uuidv4(),
        title: inputValue,
        completed: false,
      };
      setInputValue("");
      handleAddTodo(todo);
    }
  };

  return (
    <InputContainer>
      <Input
        placeholder="Add your todo..."
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
      />
      {isTyped && <Button onClick={handleForm}>Save</Button>}
    </InputContainer>
  );
};
