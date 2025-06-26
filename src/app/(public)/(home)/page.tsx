import Image from "next/image";

import {Tweet} from "@/app/(public)/(home)/Tweet";
import {TWEETS} from "@/shared/data/tweets.data";

import {TweetForm} from "@/app/(public)/(home)/TweetForm";

export default function Home() {
  return (
<div className='min-h-screen flex justify-center px-4 py-8'>

  <div className='w-full max-w-xl'>
    <h1 className='text-3xl font-bold mb-6'>Home</h1>


    <TweetForm/>

    <div className='space-y-6'>




    {TWEETS.map(tweet => (
    <Tweet
      key={tweet.author}
      tweet={tweet}
    />
    ))}
    </div>
  </div>
</div>
  );
}
