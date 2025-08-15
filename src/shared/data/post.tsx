'use client'

import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import { TWEETS, setTweets } from '@/shared/data/tweets.data'
import Link from "next/link"
import { PAGES } from "@/config/pages.config"
import MenuPost from "@/app/(public)/MenuPost/page"

interface PostItem {
    id: string
    name?: string
    post?: string
    time?: any
}

export default function Post({ search = '' }: { search?: string }) {
    const [posts, setPosts] = useState<PostItem[]>([])

    useEffect(() => {
        async function loadPosts() {
            const snapshot = await getDocs(collection(db, 'Post'))
            const data: PostItem[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<PostItem, 'id'>)
            }))
            setPosts(data)
            setTweets(data)
        }

        loadPosts()
    }, [])

    // фильтрация с защитой от undefined
    const filteredPosts = posts.filter(post => {
        const name = post.name?.toLowerCase() || ''
        const content = post.post?.toLowerCase() || ''
        const searchTerm = search.toLowerCase()
        return name.includes(searchTerm) || content.includes(searchTerm)
    })

    return (
        <div style={{ padding: 20 }}>
            <h2 className='mb-5 text-xl ml-2'>Посты</h2>

            {filteredPosts.map(post => (
                <div key={post.id} className='mb-5 border border-white/10 rounded-xl p-4 bg-black text-white shadow-md'>
                    <div className='flex items-center gap-3 mb-2'>
                        <Image src={'/x-logo.svg'} alt={'X logo'} width={24} height={24} />
                        <Link href={PAGES.PROFILE(post.name || '')} className='font-semibold'>
                            @{post.name || 'unknown'}
                        </Link>
                    </div>

                    <p className='text-white/90'>{post.post || ''}</p>

                    <MenuPost postId={post.id} />
                </div>
            ))}
        </div>
    )
}
