import { useState } from "react";
import styled from "styled-components";
import { Progress, TaskFilter, TaskInput, Tasklist } from "./components";
import { useDataContext } from "./context/DataContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Background = styled.div`
  display: flex;
  justify-content: center;
  padding: 61px 20px 0;
`;
const TodoContainer = styled.div`
  max-width: 518px;
  width: 100%;
`;
const TaskContainer = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
const TaskHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TaskHeader = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  color: #000000;
`;
const TaskListContaner = styled.div`
  display: grid;
  row-gap: 16px;
`;

interface DataProps {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const { todos } = useDataContext();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const calPercent = (todolist: DataProps[]): number => {
    const done = todolist.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    );
    return (done / todolist.length) * 100;
  };

  const toggleFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  const selectFilter = (option: string): void => {
    setSelectedOption(option);
    setIsOpenFilter(false);
  };

  return (
    <>
      <ToastContainer />

      <Background>
        <TodoContainer>
          <Progress percent={calPercent(todos)} count={todos.length} />
          <TaskContainer>
            <TaskHeaderContainer>
              <TaskHeader>Tasks</TaskHeader>
              <TaskFilter
                isOpen={isOpenFilter}
                selectedOption={selectedOption}
                toggleFilter={toggleFilter}
                selectFilter={selectFilter}
              />
            </TaskHeaderContainer>
            <TaskListContaner>
              {todos.map((todo, index) => (
                <Tasklist key={index} {...todo} />
              ))}
              <TaskInput />
            </TaskListContaner>
          </TaskContainer>
        </TodoContainer>
      </Background>
    </>
  );
}

export default App;
