'use client'

import { db, auth } from '@/shared/firebase/firebase'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Link from 'next/link'
import Modal from '@/components/ui/Modal'

export default function ProfilePage() {
    const [profile, setProfile] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [post, setPost] = useState<string>('')

    const openModal = useCallback(() => setIsOpen(true), [])
    const closeModal = useCallback(() => setIsOpen(false), [])

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

    const handlePublishPost = async () => {
        if (!post.trim() || !profile) return

        await addDoc(collection(db, 'Post'), {
            name: profile.name,
            content: post,
            userId: profile.id,
            post: post,
            createdAt: serverTimestamp(),
        })

        setPost('')
        setIsOpen(false)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-black p-4 text-white">
            <div className="w-full max-w-2xl mt-12 mb-8 bg-zinc-900 rounded-3xl shadow-2xl p-8 space-y-6 border border-zinc-700">
                {!loading && (
                    <div>
                        {!profile ? (
                            <div className="text-center space-y-6">
                                <p className="text-zinc-300 text-xl font-medium">
                                    Для доступа к профилю необходимо войти или зарегистрироваться.
                                </p>
                                <Link href="/firebase-auth/Sign-Up">
                                    <button className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                                        Зарегистрироваться
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="border-b border-zinc-700 pb-6 mb-2">
                                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                        @{profile.name}
                                    </h1>
                                    <p className="text-zinc-400 text-lg mt-2">
                                        Email:{' '}
                                        <span className="font-medium text-zinc-200">{profile.email}</span>
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-zinc-200">Подписки:</h2>
                                    {profile.Subscribe && profile.Subscribe.length > 0 ? (
                                        <ul className="space-y-3 text-zinc-300 pl-4">
                                            {profile.Subscribe.map((item: string, i: number) => (
                                                <li key={i} className="flex items-center space-x-3">
                          <span className="text-blue-400 text-xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </span>
                                                    <span className="text-lg">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-zinc-500 italic text-lg">
                                            У вас ещё нет подписок.
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleSignOut}
                                    className="w-full py-4 px-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-md mt-6"
                                >
                                    Выйти
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {!loading && profile && (
                <div className="w-full max-w-2xl my-8 p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-extrabold text-white">Мои посты</h2>
                        <button
                            onClick={openModal}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                        >
                            Добавить пост
                        </button>
                    </div>

                    {isOpen && (
                        <Modal onClose={closeModal}>
                            <input
                                type="text"
                                value={post}
                                onChange={(e) => setPost(e.target.value)}
                                placeholder="Введите текст поста..."
                                className="w-full p-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white mb-4"
                            />
                            <button
                                onClick={handlePublishPost}
                                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white font-bold transition"
                            >
                                Опубликовать
                            </button>
                        </Modal>
                    )}

                    {/* Пример поста */}
                    <div className="space-y-6 mt-6">
                        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-700 shadow-md">
                            <h3 className="text-xl font-bold text-white mb-2">
                                Заголовок первого поста
                            </h3>
                            <p className="text-zinc-400">
                                Здесь будет отображаться контент, который вы добавили.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
