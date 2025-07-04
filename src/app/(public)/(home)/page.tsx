'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Tweet } from '@/app/(public)/(home)/Tweet'
import { TWEETS } from '@/shared/data/tweets.data'

import Search from '@/components/Search'
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState('')

  const filteredTweets = TWEETS.filter((tweet) =>
      tweet.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
      <div className='flex  justify-center mt-5'>
          <div className='w-full max-w-xl'>
              <div className='flex justify-between'>
                  <h1 className='text-3xl font-bold mb-6'>Home</h1>

                  <Search value={search} onChange={setSearch}/>
              </div>



              <div className='space-y-6 mt-6'>
                  {filteredTweets.map((tweet) => (
                      <Tweet key={tweet.author} tweet={tweet}/>
                  ))}

                  {filteredTweets.length === 0 && (
                      <p className='text-center text-gray-500'>Ничего не найдено</p>
                  )}
              </div>
          </div>
      </div>
  )
}
