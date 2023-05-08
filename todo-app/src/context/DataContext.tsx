import React, { createContext, useContext, useEffect, useState } from "react";
import { TodoProps } from "../type";
import { fetchData } from "../utils";
import { toast } from "react-toastify";

interface DataContextProps {
  todos: TodoProps[];
  setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
  handleAddTodo(todo: TodoProps): void;
  handleEditTodo(todo: TodoProps): void;
  handleDeleteTodo(id: string): void;
}

const DataContext = createContext<DataContextProps>({
  todos: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTodos: () => {},
  handleAddTodo: () => {},
  handleEditTodo: () => {},
  handleDeleteTodo: () => {},
});

export const DataContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoProps[]>([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await fetchData<TodoProps[]>("/todos", "GET");
        setTodos(data);
      } catch (e) {
        const castError = e as Error;
        toast.error(castError.message);
      }
    };

    fetchTodo();
  }, []);

  const handleAddTodo = async (todo: TodoProps) => {
    try {
      const data = await fetchData<TodoProps>("/todos", "POST", todo);
      setTodos((prev) => [...prev, data]);
    } catch (e) {
      const castError = e as Error;
      toast.error(castError.message);
    }
  };

  const handleEditTodo = async (todo: TodoProps) => {
    try {
      const data = await fetchData<TodoProps>(`/todos/${todo.id}`, "PUT", todo);
      setTodos((prev) =>
        prev.map((elem) => (elem.id === data.id ? data : elem))
      );
    } catch (e) {
      const castError = e as Error;
      toast.error(castError.message);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await fetchData<never>(`/todos/${id}`, "DELETE");
      setTodos((prev) => prev.filter((todo) => todo.id != id));
    } catch (e) {
      const castError = e as Error;
      toast.error(castError.message);
    }
  };

  const contextValue: DataContextProps = {
    todos,
    setTodos,
    handleAddTodo,
    handleEditTodo,
    handleDeleteTodo,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = () => useContext(DataContext);
