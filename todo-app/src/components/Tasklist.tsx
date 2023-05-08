import React, { useState } from "react";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import editIcon from "../assets/EditIcon.svg";
import { useDataContext } from "../context/DataContext";
import { TodoProps } from "../type";
import { TaskInput } from ".";

interface TaskListProps {
  id: string;
  title: string;
  completed: boolean;
}

const TaskListContainer = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 9999px;
  padding: 12px 20px;

  display: flex;
  align-items: center;
  gap: 16px;
`;

const TaskDetail = styled.p<Pick<TaskListProps, "completed">>`
  flex: 1;

  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const EditIcon = styled.img`
  width: 20px;
  height: 5px;

  cursor: pointer;
`;

const ModifyContainer = styled.ul`
  position: absolute;
  top: 38px;
  right: 10px;
  width: 111px;
  z-index: 10;

  padding: 16px 22px;
  background: #ffffff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ModifyList = styled.li`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-transform: capitalize;
  list-style: none;

  cursor: pointer;

  &.delete {
    margin-top: 16px;
    color: #e07c7c;
  }
`;

export const Tasklist: React.FC<TaskListProps> = ({ id, title, completed }) => {
  const { handleEditTodo, handleDeleteTodo } = useDataContext();
  const [modify, setModify] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleCheckbox = () => {
    const todo: TodoProps = {
      id,
      title,
      completed: !completed,
    };
    handleEditTodo(todo);
  };

  const toggleModify = () => {
    setModify((prev) => !prev);
  };

  const editTodo = (editedTitle: string) => {
    const todo: TodoProps = {
      id,
      title: editedTitle,
      completed,
    };
    handleEditTodo(todo);
    setIsEdit(false);
  };

  if (isEdit) {
    return <TaskInput initialVal={title} editTodo={editTodo} />;
  }

  return (
    <TaskListContainer>
      <Checkbox checked={completed} onChange={toggleCheckbox} />
      <TaskDetail completed={completed}>{title}</TaskDetail>
      <EditIcon src={editIcon} alt="edit-icon" onClick={toggleModify} />
      {modify && (
        <ModifyContainer>
          <ModifyList
            onClick={() => {
              setIsEdit(true);
              toggleModify();
            }}
          >
            Edit
          </ModifyList>
          <ModifyList
            className="delete"
            onClick={() => {
              handleDeleteTodo(id);
              toggleModify();
            }}
          >
            Delete
          </ModifyList>
        </ModifyContainer>
      )}
    </TaskListContainer>
  );
};
