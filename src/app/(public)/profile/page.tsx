'use client'

import { db } from '@/shared/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import AuthDetails from '../firebase-auth/AuthDetails'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({})
  const [error, setError] = useState<boolean>(true)

  const [out, setOut] = useState<boolean>(false)

  useEffect(() => {


    getDocs(collection(db, 'users')).then(snapshot => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[snapshot.docs.length - 1] // пока берём первого пользователя
        setProfile({id: doc.id, ...doc.data()})
      } else {
        setError(false)
      }
    })

    })



  return (
      <div className="flex justify-center mt-5 border rounded-xl pt-5 pl-30 white h-120 w-135 ml-100">

        <div className="w-full max-w-xl">

                 {out ? <p><Link href={'/firebase-auth/Sign-Up'}>Зарегистрируйтесь</Link></p> : <div>
                   <h1 className="text-3xl font-bold text-white">
                     Профиль @{profile.name}
                   </h1>
                   <p className="text-white mt-3">Email: {profile.email}</p>

                   <p className="text-white mt-3">ID user: {profile.id}</p>

                 </div>}


          <h1>{error ? null : <p><Link href={'/firebase-auth/Sign-Up'}></Link></p>}</h1>

          <div>
            <button onClick={() => setOut(true)}>
              <AuthDetails/>
            </button>
          </div>
        </div>
      </div>

  )

  }

