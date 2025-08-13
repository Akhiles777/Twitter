'use client'

import {useState} from 'react'



import Link from 'next/link'

export default function Auth(){

    const [check, setCheck] = useState(false)


    return(
        <div className=''>



            <Link className={'text-sm color-white'} href='firebase-auth/Sign-In'>
                Войти
            </Link>



        </div>
    )
}