import React, { useEffect, useState } from 'react';
import type { Employee } from '../types/index';
import { employeeService } from '../services/employeeService';

interface EmployeeListProps {
  onCreateNew?: () => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ onCreateNew }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortField, setSortField] = useState<keyof Employee>('firstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = employeeService.getAll();
    setEmployees(data);
  }, []);

  const filteredEmployees = employees.filter(emp =>
    Object.values(emp).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      employeeService.delete(id);
      setEmployees(employeeService.getAll());
    }
  };

  const SortHeader: React.FC<{ field: keyof Employee; label: string }> = ({ field, label }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
    >
      <div className="flex items-center gap-2">
        {label}
        {sortField === field && (
          <span className="text-blue-600 font-bold">{sortOrder === 'asc' ? '↑' : '↓'}</span>
        )}
      </div>
    </th>
  );

  return (
    <div>
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <h1 className="text-4xl font-bold">HRnet</h1>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Current Employees</h2>
            <button
              onClick={onCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Create Employee
            </button>
          </div>

          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-3">
              Showing {sortedEmployees.length} of {employees.length} entries
            </p>
          </div>

          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full bg-white">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <SortHeader field="firstName" label="First Name" />
                  <SortHeader field="lastName" label="Last Name" />
                  <SortHeader field="startDate" label="Start Date" />
                  <SortHeader field="department" label="Department" />
                  <SortHeader field="dateOfBirth" label="Date of Birth" />
                  <SortHeader field="street" label="Street" />
                  <SortHeader field="city" label="City" />
                  <SortHeader field="state" label="State" />
                  <SortHeader field="zipCode" label="Zip Code" />
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedEmployees.map((emp, idx) => (
                  <tr key={emp.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {emp.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {emp.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.street}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {emp.zipCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50 font-bold py-1 px-3 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedEmployees.length === 0 && (
            <div className="text-center py-12 text-gray-600 bg-white rounded-lg shadow-md mt-4">
              <p className="text-lg">
                {searchTerm ? 'Aucun employé trouvé.' : 'Aucun employé enregistré.'}
              </p>
            </div>
          )}

          <button
            onClick={onCreateNew}
            className="mt-8 text-blue-600 hover:text-blue-700 underline font-medium text-lg"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
