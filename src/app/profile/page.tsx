'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Adjust endpoint to match your backend route (e.g., /api/users/me)
        const response = await axios.get('/api/users/me');
        setUserData( {
          username : response.data.data.username,
          email : response.data.data.email
        } );
      } catch (err: any) {
        setError('Failed to load profile data. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle Logout
  const logout = async () => {
    try {
      // Adjust endpoint to match your backend logout route
      await axios.get('/api/users/logout');
      console.log('Logout successful');
      router.push('/login');
    } catch (err:any) {
      console.error('Logout failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-white">
      {/* Container Card */}
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Your account information
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent" />
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-6 space-y-4">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
            <Link
              href="/login"
              className="inline-block w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 text-center"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          /* Profile Details Content */
          <div className="space-y-6">
            <div className="bg-neutral-800/50 border border-neutral-700/60 rounded-xl p-5 space-y-4">
              <div>
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Username
                </span>
                <p className="text-lg font-semibold text-white mt-1">
                  {userData.username || 'N/A'}
                </p>
              </div>
              <div className="border-t border-neutral-700/40 pt-4">
                <span className="block text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Email Address
                </span>
                <p className="text-lg font-semibold text-white mt-1">
                  {userData.email || 'N/A'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href="/explore"
                className="w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm rounded-xl transition-all duration-200 flex items-center justify-center border border-neutral-700 shadow-sm"
              >
                Go to Explore Map
              </Link>
              
              <button
                onClick={logout}
                className="w-full py-3 px-4 bg-red-600/15 hover:bg-red-600/25 text-red-400 border border-red-500/30 font-medium text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-red-950/20"
              >
                Log Out
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

