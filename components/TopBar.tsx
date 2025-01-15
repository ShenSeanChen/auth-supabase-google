'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { useSubscription } from '@/hooks/useSubscription';

// TopBar component handles user profile display and navigation
export default function TopBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
//   const { subscription, isLoading: isLoadingSubscription } = useSubscription();

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    await signOut();
    setIsDropdownOpen(false);
    router.replace('/login');
  };

  if (!user) return null;

  return (
    <div className="w-full bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Your App Name
        </Link>

        <div className="flex items-center gap-4">
          {/* Subscription Button
          {!isLoadingSubscription && (
            !subscription || 
            subscription.status === 'canceled' || 
            (subscription.cancel_at_period_end && new Date(subscription.current_period_end) > new Date())
          ) && (
            <button
              onClick={() => router.push('/profile')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Subscription
            </button>
          )} */}
          
          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-lg"
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                {user.email?.[0].toUpperCase()}
              </div>
              <span>{user.email}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile & Subscription
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 