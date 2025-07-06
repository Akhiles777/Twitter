'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const RegisterForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Проверяем, что все поля заполнены
    if (!name || !email || !password || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть минимум 6 символов');
      return;
    }

    await register(email, password, name);
    router.push('/profile_fake'); // Переходим на профиль
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black border border-white/10 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Регистрация</h2>
          <p className="text-gray-400">Создайте новый аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/30"
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/30"
              placeholder="Введите ваш email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/30"
              placeholder="Введите пароль (минимум 6 символов)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Подтвердите пароль
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/30"
              placeholder="Повторите пароль"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 px-4 rounded-lg hover:bg-gray-200 disabled:opacity-50 font-medium"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Уже есть аккаунт?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-white hover:text-gray-200 font-medium"
            >
              Войти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}; 