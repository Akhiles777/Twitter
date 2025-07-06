'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Tweet } from '@/app/(public)/(home)/Tweet'
import { TWEETS } from '@/shared/data/tweets.data'

import Search from '@/components/Search'
import Link from "next/link";
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const [search, setSearch] = useState('')
  const { user } = useAuth();

  const filteredTweets = TWEETS.filter((tweet) =>
      tweet.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
      <div className='flex justify-center mt-5'>
          <div className='w-full max-w-xl'>
              <div className='flex justify-between items-center mb-6'>
                  <div>
                      <h1 className='text-3xl font-bold'>Home</h1>
                      {user && (
                          <p className='text-gray-600 mt-1'>Добро пожаловать, {user.name}!</p>
                      )}
                  </div>
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
