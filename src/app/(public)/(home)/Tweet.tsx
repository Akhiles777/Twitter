import type {ITweet} from "@/shared/types/tweet.interface";
import Image from "next/image";

import Link from "next/link";
import {PAGES} from "@/config/pages.config";

interface Props{
    tweet: ITweet
}

export function Tweet({tweet}: Props){
    return (
        <div className='border border-white/10 rounded-xl p-4 bg-black text-white shadow-md'>


            <div className='flex items-center gap-3 mb-2'>

                <Image src={'/x-logo.svg'} alt={'X logo'} width={24} height={24}/>

                <Link href={PAGES.PROFILE(tweet.author)} className='font-semibold'>@{tweet.author}</Link>

            </div>

            <p className='text-white/90'>{tweet.text}</p>
        </div>
    )
}