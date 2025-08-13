'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/shared/firebase/firebase' // db = getFirestore(app)
import { doc, setDoc } from 'firebase/firestore'


export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [copyPassword, setCopyPassword] = useState('')
    const [error, setError] = useState('')

    async function register(e: React.FormEvent) {
        e.preventDefault()

        if (!name.trim()) {
            setError('Name is required')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (copyPassword !== password) {
            setError('Passwords do not match')
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Сохраняем имя в Firestore
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                createdAt: new Date(),
            })

            console.log('User registered:', user)
            setError('')
            setName('')
            setEmail('')
            setPassword('')
            setCopyPassword('')
        } catch (err: any) {
            console.error(err)
            setError(err.message)
        }


        window.location.href='/profile'
    }

    return (
        <div className="h-500 flex flex-col">
            <form className="flex flex-col" onSubmit={register}>
                <h2>Create an account</h2>

                <input
                    className="w-150 pl-2 h-7 border white color-black ml-100 mb-5"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />
                <input
                    className="w-150 pl-2 h-7 border white color-black ml-100 mb-5"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                <input
                    className="w-150 pl-2 h-7 border white color-black ml-100 mb-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <input
                    className="w-150 h-7 pl-2 border white color-black ml-100 mb-5"
                    placeholder="Repeat Password"
                    value={copyPassword}
                    onChange={(e) => setCopyPassword(e.target.value)}
                    type="password"
                />
                <button className='mr-35' type="submit">Sign Up</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>



        </div>
    )
}
