'use client'

import { db, auth } from '@/shared/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Link from 'next/link'

export default function ProfilePage() {
    const [profile, setProfile] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setProfile({ id: docSnap.id, ...docSnap.data() })
                }
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const handleSignOut = () => {
        signOut(auth)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-black p-4">
            <div className="w-full max-w-lg bg-gray-900 rounded-xl shadow-lg p-6 space-y-5 border border-gray-800">

                {/* Загрузка */}
                {loading && (
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div
                            className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em"
                                 className="animate-ping">
                                <path
                                    d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                            </svg>
                        </div>
                    </div>
                )}

                {/* Если профиль не найден (пользователь не вошел) */}
                {!loading && !profile && (
                    <div className="text-center">
                        <p className="text-gray-300 mb-4">
                            Для доступа к профилю необходимо войти.
                        </p>
                        <Link href="/firebase-auth/Sign-Up"
                              className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            <button
                                className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                Зарегистрируйтесь или войдите
                            </button>
                        </Link>
                    </div>
                )}

                {/* Отображение профиля */}
                {!loading && profile && (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-white">Профиль @{profile.name}</h1>
                        <p className="text-gray-400">Email: {profile.email}</p>

                        <div>
                            <h2 className="text-lg font-semibold text-white">Подписки:</h2>
                            {profile.Subscribe && profile.Subscribe.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-300">
                                    {profile.Subscribe.map((item: string, i: number) => (
                                        <li key={i} className="py-1">{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Нет подписок</p>
                            )}
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="w-full py-2 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors duration-200 mt-4"
                        >
                            Выйти
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}