'use client'

import {useEffect} from "react";
import { Heart } from "lucide-react";



import {useState} from "react";

export default function LikePost(){
    const [isFavorite, setIsFavorite] = useState(false)



 function onClickFavorite(){
     setIsFavorite(!isFavorite)

 }

    return (
        <div className='mt-1'>
            <button
                className="btn"
                onClick={onClickFavorite}
            >
                {isFavorite ? <Heart className="w-5 h-5 fill-red-500 text-red-500"  />   :<Heart className="w-5 h-5 text-gray-500" />}


            </button>
        </div>
    )


}