'use client'

import {useParams} from "next/navigation";


export default function Profile(){

const params = useParams<{username:string}>();





    return(
        <div className='ml-120 mt-70'>

<h1 className='text-4xl'>Добро пожаловать  @{params.username}</h1>


        </div>
    )
}