'use client'
import {useParams} from "next/navigation";

import Image from "next/image";
import SubScribe from "@/app/(public)/u/[username]/SubScribe";

interface Post {
    id: number;
    author: string;
    text: string;
    image?: string;
}





export default function Post({author,text,image,id}:Post){

    const params = useParams<{username:string}>();

    return (
        <div>

            <img className='w-30 h-30 rounded-4xl mt-8 ml-40 mb-8' src={image}/>



            <SubScribe userId={id}/>

            <div className='flex justify-beetwen mb-5'>
                <h2 className='text-xl'>Посты:</h2>
                <p className='mt-0.9 text-xl ml-5'>@{params.username}</p>
            </div>

            <div className='border border-white/10 rounded-xl p-4 bg-black text-white shadow-md'>


                <div className='flex items-center gap-3 mb-2'>

                    <Image src={'/x-logo.svg'} alt={'X logo'} width={24} height={24}/>



                    <h2>@{params.username}</h2>
                </div>

                <p className='text-white/90'>{text}</p>
            </div>
        </div>
    )
}