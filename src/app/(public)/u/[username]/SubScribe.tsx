'use client'

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from '@/shared/firebase/firebase';
import { useParams } from 'next/navigation';
import { doc, getDocs, collection, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';

interface SubScribeProps {
    userId: string;
}

export default function SubScribe({ userId }: SubScribeProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [profile, setProfile] = useState<any>({});
    const params = useParams<{ username: string }>();

    useEffect(() => {
        getDocs(collection(db, 'users')).then(snapshot => {
            if (!snapshot.empty) {
                const docSnap = snapshot.docs[snapshot.docs.length - 1];
                setProfile({ id: docSnap.id, ...docSnap.data() });
            }
        });
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

            } else {
                setUser(null);
                setIsSubscribed(false);
            }
        });

        return () => unsub();
    }, [userId]);

    async function toggleSub() {
        if (!user) {
            window.location.href = '/firebase-auth/Sign-Up';
            return;
        }

        if (isSubscribed) {
            // Отписка

            setIsSubscribed(false);
                await updateDoc(doc(db, "users", profile.id), {
                    Subscribe: [arrayRemove(params.username)]
                });


            }
         else {
            setIsSubscribed(true);
            if (params.username) {
                await updateDoc(doc(db, "users", profile.id), {
                    Subscribe: [arrayUnion(params.username)]
                });
            }
        }
    }

    return (
        <div className="ml-42 mb-10">
            {!user ? (
                <button
                    onClick={() => window.location.href = '/firebase-auth/Sign-Up'}
                    className="cursor-pointer rounded-xl w-45 h-10 bg-blue-500 text-white"
                >
                    Войти для подписки
                </button>
            ) : (
                <button
                    onClick={toggleSub}
                    className={`cursor-pointer rounded-xl w-25  py-2  ${
                        isSubscribed
                        ? 'bg-gray-500 text-white w-30'
                        : 'bg-blue-500 text-white w-30'
                    }`}
                >
                    {isSubscribed ? 'Отписаться' : 'Подписаться'}
                </button>
            )}
        </div>
    );
}