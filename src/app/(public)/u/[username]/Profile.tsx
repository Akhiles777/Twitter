'use client';

import { useParams } from "next/navigation";
import Post from "@/app/(public)/u/[username]/Post";
import MenuPost from "@/app/(public)/MenuPost/page";

import {TWEETS} from "@/shared/data/tweets.data";

interface Tweet {
    id: string;
    author: string;
    text: string;
    image?: string;
}

interface ProfileProps {
    TWEETS: Tweet[];
}

export default function Profile() {
    const params = useParams<{ username: string }>();

    const userTweets = TWEETS.filter(
        (tweet) => tweet.name === params.username
    );

    return (
        <div className="pl-10 ml-110 mt-10 w-146">

            <h2 className="ml-32 text-3xl">Profile @{params.username}</h2>

            {userTweets.length > 0 ? (
                userTweets.map((tweet) => (
                    <Post
                        key={tweet.id}
                        id={tweet.id}
                        author={tweet.name}
                        text={tweet.post}
                    />
                ))
            ) : (
                <p className="ml-50 text-gray-500">Пока нет постов</p>
            )}

            {userTweets.map((user) => (
                <MenuPost postId={user.id} key={user.id} />
            ))}
        </div>
    );
}
