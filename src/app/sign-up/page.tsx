"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated for Next.js app directory
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error handling
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitting form with email:", email);
  
    e.preventDefault();
  
    try {
      // Clear previous error
      setError(null);
  
      // Make API call to register the user
      const response = await axios.post('/api/auth/register', { email, password });
      console.log("Response from API:", response.data);
  
      // Extract token from the response
      const { token } = response.data;
  
      // Store the token in localStorage
      if (token) {
        localStorage.setItem('authToken', token);
        console.log("Token stored in localStorage:", token);
      }
  
      // Redirect on successful registration
      router.push('/user');
    } catch (error: any) {
      // Set error message
      setError(error.response?.data?.error || 'Registration failed');
      console.error("Registration failed:", error.response?.data?.error || error.message);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
