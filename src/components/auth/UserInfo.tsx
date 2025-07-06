'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export const UserInfo = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/profile_fake" className="flex items-center gap-2 hover:opacity-80">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-black font-bold">{user.name[0]}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-white">{user.name}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      </Link>
      <button
        onClick={logout}
        className="px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
      >
        Выйти
      </button>
    </div>
  );
}; 