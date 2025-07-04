'use client'

import { useEffect, useState } from "react"

interface SubScribeProps {
    userId: number
}

export default function SubScribe({ userId }: SubScribeProps) {
    const [subs, setSubs] = useState<boolean>(true)

    const storageKey = `subscribe_user_${userId}`

    useEffect(() => {
        // При монтировании проверяем localStorage
        const stored = localStorage.getItem(storageKey)
        if (stored !== null) {
            setSubs(stored === 'true') // строка → boolean
        }
    }, [storageKey])

    const toggleSub = () => {
        const updated = !subs
        setSubs(updated)
        localStorage.setItem(storageKey, String(updated))
    }

    return (
        <div className='ml-42 mb-10'>
            <button
                onClick={toggleSub}
                className={`cursor-pointer rounded-xl w-25 ${subs ? 'bg-blue-500' : 'bg-gray-500'}`}
            >
                {subs ? 'subscribe' : 'unsubscribe'}
            </button>
        </div>
    )
}
