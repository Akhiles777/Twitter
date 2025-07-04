'use client';

import { useParams } from "next/navigation";
import Post from "@/app/(public)/u/[username]/Post";
import { TWEETS } from "@/shared/data/tweets.data";
import MenuPost from "@/app/(public)/MenuPost/page";

export default function Profile(  ) {
    const params = useParams<{ username: string }>();

    const userTweets = TWEETS.filter(
        (tweet) => tweet.author === params.username
    );


    return (
        <div className="pl-10 ml-110 mt-10 w-146">
            <h2 className="ml-32 text-3xl">Profile @{params.username}</h2>


            {userTweets.length > 0 ? (
                userTweets.map((tweet) => (
                    <Post
                        id={tweet.id}
                        image={tweet.image}
                        key={tweet.text} // лучше id, если есть
                        author={tweet.author}
                        text={tweet.text}
                    />
                ))

            ) : (
                <p className="ml-50 text-gray-500">Пока нет постов</p>
            )}


            {userTweets.map(user => (
                <MenuPost postId={user.id} key={user.id} />
            ))}
        </div>
    );
}
