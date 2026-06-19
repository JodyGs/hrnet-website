import React, { useState } from 'react';
import { CreateEmployee } from './pages/CreateEmployee';
import { EmployeeList } from './pages/EmployeeList';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'create' | 'list'>('create');

  const handleViewEmployees = () => setCurrentPage('list');
  const handleCreateNew = () => setCurrentPage('create');

  return (
    <div>
      {currentPage === 'create' ? (
        <CreateEmployee onSuccess={handleCreateNew} onViewEmployees={handleViewEmployees} />
      ) : (
        <EmployeeList onCreateNew={handleCreateNew} />
      )}
    </div>
  );
};
