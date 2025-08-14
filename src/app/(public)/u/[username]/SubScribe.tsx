/*
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

                Subscribed: arrayRemove(params.username)

            });

        }

        else {

            setIsSubscribed(true);

            if (params.username) {

                await updateDoc(doc(db, "users", profile.id), {

                    Subscribed: arrayUnion(params.username)
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

                    className={`cursor-pointer rounded-xl w-25 py-2 ${

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

}*/
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
                // Получаем профиль текущего пользователя
                const userDocRef = doc(db, 'users', currentUser.uid);
                const docSnap = await getDoc(userDocRef);

                if (docSnap.exists()) {
                    const profileData = docSnap.data();
                    // Проверяем, есть ли уже подписка на этого пользователя
                    const subscriptions = profileData.Subscribe || [];
                    setIsSubscribed(subscriptions.includes(params.username));
                }
            } else {
                setIsSubscribed(false);
            }
        });
        return () => unsub();
    }, [params.username]); // Зависимость params.username нужна, чтобы обновлять состояние при смене профиля

    async function toggleSub() {
        if (!user) {
            window.location.href = '/firebase-auth/Sign-Up';
            return;
        }

        const userDocRef = doc(db, "users", user.uid);

        if (isSubscribed) {
            // Отписка
            await updateDoc(userDocRef, {
                Subscribe: arrayRemove(params.username)
            });
            setIsSubscribed(false);
        } else {
            // Подписка
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
                    className="ml-35 mb-5 cursor-pointer group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20">
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