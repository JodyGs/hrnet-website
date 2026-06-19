import React, { useState } from 'react';
import type { Employee } from '../types/index';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { employeeService } from '../services/employeeService';
import { states } from '../data/states';

interface FormData extends Omit<Employee, 'id'> {}

interface CreateEmployeeProps {
  onSuccess?: () => void;
  onViewEmployees?: () => void;
}

export const CreateEmployee: React.FC<CreateEmployeeProps> = ({ onSuccess, onViewEmployees }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field: 'dateOfBirth' | 'startDate') => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    employeeService.add(formData);
    setShowConfirm(true);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: 'Sales',
    });
    setTimeout(() => {
      setShowConfirm(false);
      onSuccess?.();
    }, 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <h1 className="text-4xl font-bold">HRnet</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <button
            onClick={onViewEmployees}
            className="text-blue-600 hover:text-blue-700 underline mb-8 font-medium text-lg"
          >
            View Current Employees
          </button>

          <h2 className="text-3xl font-bold mb-8">Create Employee</h2>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <DatePicker
                id="dateOfBirth"
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleDateChange('dateOfBirth')}
                format="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
              />
            </div>

            <div>
              <DatePicker
                id="startDate"
                label="Start Date"
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                format="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
              />
            </div>

            <fieldset className="border border-gray-300 rounded-lg p-6">
              <legend className="text-lg font-semibold text-gray-900 px-3">Address</legend>

              <div className="space-y-6 mt-4">
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="number"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </fieldset>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Sales</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Legal</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-8"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl">
            <p className="text-xl font-semibold text-gray-800">Employee Created!</p>
          </div>
        </div>
      )}
    </div>
  );
};
