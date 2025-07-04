'use client'

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export default function LikePost({ postId }: { postId: number }) {
    const [isLiked, setIsLiked] = useState(false)
    const storageKey = `like_post_${postId}`

    useEffect(() => {
        const stored = localStorage.getItem(storageKey)
        if (stored !== null) {
            setIsLiked(stored === 'true')
        }
    }, [storageKey])

    function toggleLike() {
        const updated = !isLiked
        setIsLiked(updated)
        localStorage.setItem(storageKey, String(updated))
    }

    return (
        <button onClick={toggleLike}>
            {isLiked ? (
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            ) : (
                <Heart className="w-5 h-5 text-gray-500" />
            )}
        </button>
    )
}
