'use client'

import { useState } from 'react'
import Search from '@/components/Search'
import Post from '@/shared/data/post'

export default function Home() {
    const [search, setSearch] = useState('')

    return (
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Home</h1>
                    <Search value={search} onChange={setSearch} />
                </div>
                <Post search={search} />
            </div>
        </div>
    )
}
