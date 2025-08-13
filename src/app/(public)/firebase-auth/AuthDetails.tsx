'use client'

import {useEffect, useState} from 'react'
import {auth} from '@/shared/firebase/firebase'

import {onAuthStateChanged,signOut} from 'firebase/auth'

export default function AuthDetails(){

    const [authUSer,SetAuthUser]= useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user:any) => {

            if(user){
                SetAuthUser(user)
            }else {
                SetAuthUser(null)
            }
        })
        return () => {
            listen()
        }
    }, []);

    
    
    function userSignOut() {
        signOut(auth)
            .then(()=>{
                console.log('User signed out')
            })
    }
    
    return(
        <div>
            {authUSer ? (
                <div><p><button onClick={userSignOut}>Sign Out</button></p></div>
            ): <p>Signed Out</p>}
        </div>
    )
}