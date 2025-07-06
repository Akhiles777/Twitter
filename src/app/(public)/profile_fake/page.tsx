'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!user) {
    router.push('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-2xl">
        <div className="bg-black border border-white/10 rounded-xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black text-3xl font-bold">{user.name[0]}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-gray-400">Профиль пользователя @{user.name}</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Имя пользователя</p>
              <p className="text-white font-medium">{user.name}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">ID пользователя</p>
              <p className="text-white font-medium">{user.id}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-200 font-medium"
            >
              На главную
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 font-medium"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
