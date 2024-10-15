import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddTasks from '@/Pages/Tasks/Add';
import ListTasks from '@/Pages/Tasks/List';
import Report from '@/Pages/Report';

// import { Container } from './styles';

const RoutesMain: React.FC = () => {
  return (
    <Routes>
      <Route path="/:id?" element={<AddTasks />} />
      <Route path="/list" element={<ListTasks />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default RoutesMain;
