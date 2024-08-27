"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      // Redirect to /users if token exists
      router.push('/user');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to Our App</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Please register to access your account and start exploring.
        </p>
        <div className="flex justify-center">
          <a
            href="/sign-up"
            className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
