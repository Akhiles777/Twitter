'use client';

import { useParams } from "next/navigation";
import Post from "@/app/(public)/u/[username]/Post";
import { TWEETS } from "@/shared/data/tweets.data";

export default function Profile() {
    const params = useParams<{ username: string }>();

    const userTweets = TWEETS.filter(
        (tweet) => tweet.author === params.username
    );


    return (
        <div className="ml-110 mt-10 w-170">
            <h1 className=" ml-32 text-4xl">Profile @{params.username}</h1>

            <h2 className="mt-20  ml-35 text-3xl mb-15 ">Post in @{params.username}</h2>

            {userTweets.length > 0 ? (
                userTweets.map((tweet) => (
                    <Post
                        id={tweet.id}
                        key={tweet.text} // лучше id, если есть
                        author={tweet.author}
                        text={tweet.text}
                    />
                ))
            ) : (

                <p className="ml-50 text-gray-500">Пока нет постов</p>
            )}
        </div>
    );
}
