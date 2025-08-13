'use client'

import { useState } from 'react'

import Post from '@/shared/data/post'




import Search from '@/components/Search'



export default function Home() {
    const [search, setSearch] = useState('')




    return (
        <div className='flex justify-center mt-5'>
            <div className='w-full max-w-xl'>
                <div className='flex justify-between items-center mb-6'>
                    <div>
                        <h1 className='text-3xl font-bold'>Home</h1>

                    </div>
                    <Search value={search} onChange={setSearch}/>
                </div>


             <div className='w-full max-w-xl'>
                 <Post/>
             </div>


            </div>
        </div>
    )
}