'use client'
import {useParams} from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";

interface Post {
    id: number;
    author: string;
    text: string;
}





export default function Post({author,text}:Post){

    const params = useParams<{username:string}>();
    return (
        <div>


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