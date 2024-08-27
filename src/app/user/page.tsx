"use client";

import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('authToken');
        console.log(`Token: ${token}`);
        if (!token) {
          setError('Unauthorized');
          return;
        }

        // Make API request with token
        const response = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError(error.message || 'Error loading users.');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-red-100 text-red-800 px-6 py-4 rounded-md shadow-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">All Users</h1>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
