'use client'

import {signInWithEmailAndPassword} from 'firebase/auth'
import Link from 'next/link'
import { auth } from '@/shared/firebase/firebase'
import { useState } from 'react'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function login(e: React.FormEvent) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user)
                setError('')
                setEmail('')
                setPassword('')
            })
            .catch((error) => {
                console.error(error)
                setError('Sorry, Could not log in.')
            })
    }

    return (
        <div className="h-500 flex flex-col">


            <form className="flex flex-col" onClick={login}>
                <h2>Log In</h2>

                <input
                    className="w-150 h-8 rounded-xl pl-2 border white color-black ml-100 mb-5"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                <input
                    className="w-150 h-8 rounded-xl pl-2 border white color-black ml-100 mb-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />

                <div className='flex justify-between'>
                    <button onClick={login} className='ml-143 border white rounded-xl h-8  w-55' type="submit">Sign Up</button>

                    <Link className='mr-120 mt-1.5 text-blue-500 hover:text-white'
                          href="/firebase-auth/Sign-Up">Зарегистрироваться</Link>
                </div>


                {error ? <p>{error}</p> : null}

            </form>

        </div>
    )
}
