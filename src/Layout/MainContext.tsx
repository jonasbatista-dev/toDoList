import React, { createContext, ReactNode, useContext } from 'react';
import axios from 'axios';
import { App } from 'antd';
import { v4 as uuidv4 } from 'uuid';

// Simulação de API com axios
axios.interceptors.response.use((response) => {
  return response;
});

const MainContext = createContext<any | undefined>(undefined);

export const MainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { message } = App.useApp();

  const tasks = JSON.parse(window.localStorage.getItem('tasks')) ?? ([] as any);

  const getTasks = async () => {
    try {
      const response = await fetch('/tasks.json');
      await response.json();
      return tasks;
    } catch (error) {
      message.error({ content: 'Erro ao buscar tarefas' });
    }
  };

  const addTask = async (newTask: {
    title: string;
    order: number;
    completed: boolean;
  }) => {
    try {
      const response = await axios.post('/tasks.json', newTask, {
        data: tasks,
      });
      const newTasks = tasks;

      newTasks.push({ ...newTask, id: uuidv4() });
      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return response.data;
    } catch (error) {
      message.error({ content: 'Erro ao adicionar tarefa' });
    }
  };

  const updateTask = async (
    id: string,
    updatedTask: { title: string; completed: boolean; order: number },
  ) => {
    try {
      await axios.put(`./tasks.json`, updatedTask, {
        data: tasks,
      });
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      );

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));
      return;
    } catch (error) {
      console.error(`Erro ao atualizar a tarefa`, error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`/tasks.json`, {
        data: tasks,
      });
      const newList = tasks.filter((task) => task.id !== id);
      window.localStorage.setItem('tasks', JSON.stringify(newList));
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar a tarefa`, error);
    }
  };

  return (
    <MainContext.Provider value={{ getTasks, updateTask, deleteTask, addTask }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};
