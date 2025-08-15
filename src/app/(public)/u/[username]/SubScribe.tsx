
'use client'

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from '@/shared/firebase/firebase';
import { useParams } from 'next/navigation';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface SubScribeProps {
    userId: string;
}

export default function SubScribe({ userId }: SubScribeProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const params = useParams<{ username: string }>();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const profileData = docSnap.data();
                    const subscriptions = profileData.Subscribe || [];
                    setIsSubscribed(subscriptions.includes(params.username));
                }
            } else {
                setIsSubscribed(false);
            }
        });
        return () => unsub();
    }, [params.username]);

    async function toggleSub() {
        if (!user) {
            window.location.href = '/firebase-auth/Sign-Up';
            return;
        }

        const userDocRef = doc(db, "users", user.uid);

        if (isSubscribed) {

            await updateDoc(userDocRef, {
                Subscribe: arrayRemove(params.username)
            });
            setIsSubscribed(false);
        } else {
            await updateDoc(userDocRef, {
                Subscribe: arrayUnion(params.username)
            });
            setIsSubscribed(true);
        }
    }

    return (
        <div>
            {!user ? (
                <button onClick={() => window.location.href ='/firebase-auth/Sign-Up'}
                    className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
                >
                    <span className="text-lg">Shimmer</span>
                    <div
                        className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                    >
                        <div className="relative h-full w-10 bg-white/20"></div>
                    </div>
                </button>
            ) : (
                <button onClick={toggleSub}
                    className="ml-35 mb-5 mt-3 cursor-pointer group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
                    <span className="text-lg">{isSubscribed ? 'Отписаться' : 'Подписаться'}</span>
                    <div
                        className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                        <div className="relative h-full w-10 bg-white/20"/>
                    </div>
                </button>

            )}
        </div>
    );
}