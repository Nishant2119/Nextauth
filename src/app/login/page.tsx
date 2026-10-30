'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Connect to your backend login endpoint
      const response = await axios.post('/api/users/login', user);
      console.log('Login successful:', response.data);
      
      // Redirect to your main app dashboard or explore page after login
      router.push('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-white">
      {/* Container Card */}
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Please enter your details to sign in
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={onLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700/80 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-800/80 border border-neutral-700/80 text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
            ) : null}
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-neutral-400">
          Dont have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
          >
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}
