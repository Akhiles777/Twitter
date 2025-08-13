'use client'
import {useEffect,useState} from "react";

import {TWEETS} from "@/shared/data/tweets.data";
import Image from "next/image";
import Link from "next/link";
import {PAGES} from "@/config/pages.config";


interface IPost {
    id: number;
    title: string;
    text: string;
    name: string;
    author: string;
}


export default function Post(){

    const [posts, setPosts] = useState<IPost[]>([])


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setPosts(data))
        console.log(posts)
    }, []);




    return(
        <div>

            <p>{TWEETS.map(tweet => (
                <div key={tweet.id}>


                    <Image src={'/x-logo.svg'} alt={'X logo'} width={24} height={24}/>

                    <Link href={PAGES.PROFILE(tweet.author)} className='font-semibold'>@{tweet.author}</Link>

                <p className='text-white/90'>{tweet.text}</p>

                </div>
            ))}</p>


            {posts.map(post => (
                <div key={post.id}>

                    <Image src={'/x-logo.svg'} alt={'X logo'} width={24} height={24}/>

                    <Link href={PAGES.PROFILE(post.name)} className='font-semibold'>@{post.name}</Link>

                    <p className='text-white/90'>{post.text}</p>
                </div>
            ))}

        </div>
    )
}