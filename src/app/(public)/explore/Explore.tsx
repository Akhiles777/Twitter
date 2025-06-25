'use client'

import {useSearchParams} from "next/navigation";

export default function Explore() {

    const searchParams = useSearchParams();

    const tag = searchParams.get("tag");


    return(
        <div>
            <h1 className='text-3xl font-bold'> Explore {!!tag && `by ${tag}`}</h1>
        </div>
    )
}