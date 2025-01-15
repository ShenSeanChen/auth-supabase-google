'use client';

import { useState } from 'react';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface LoginFormProps {
  onSubmit: (email: string, password: string, isSignUp: boolean) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export function LoginForm({ 
  onSubmit, 
  onGoogleSignIn, 
  isLoading, 
  error 
}: LoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, isSignUp);
  };

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{isSignUp ? 'Create an account' : 'Sign in'}</h2>
      </div>

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-purple focus:border-purple"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-purple focus:border-purple"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className="text-sm text-purple hover:text-purple-700"
          >
            Forgot your password?
          </button>
        </div>

        <ForgotPasswordModal 
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-purple hover:bg-purple-700 disabled:opacity-50"
        >
          {isSignUp ? 'Sign up' : 'Sign in'} with Email
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple hover:text-purple-700"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        <button
          onClick={onGoogleSignIn}
          className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}