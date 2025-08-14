import { useEffect, useState } from 'react'
import { auth } from '@/shared/firebase/firebase'

import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function AuthDetails() {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        // Корректное возвращение функции для отписки
        return () => {
            listen()
        }
    }, []) // Обрати внимание на пустой массив зависимостей

    function userSignOut() {
        signOut(auth)
            .then(() => {
                console.log('User signed out')
            })
            .catch((error) => {
                console.error('Error signing out: ', error)
            })
    }

    return (
        <div>
            {authUser ? (
                <div>
                    <p>
                        <button onClick={userSignOut}>Sign Out</button>
                    </p>
                </div>
            ) : (
                <p>Signed Out</p>
            )}
        </div>
    )
}