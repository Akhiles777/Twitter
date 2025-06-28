'use client'

import { MessageCircle, X } from "lucide-react"
import { useState, useCallback } from "react"
import Modal from "@/components/ui/Modal"

interface Comment {
    id: number
    comments: string
}

export default function Comments() {
    const [isOpen, setIsOpen] = useState(false)
    const [comments, setComments] = useState('')
    const [posts, setPosts] = useState<Comment[]>([])
    const [nextId, setNextId] = useState(1)

    const [count, setCount] = useState<number>(0)

    const openModal = useCallback(() => setIsOpen(true), [])
    const closeModal = useCallback(() => setIsOpen(false), [])

    function onClick() {
        if (comments.trim() === '') return

        setPosts(posts => [
            ...posts,
            { id: nextId, comments: comments }
        ])
        setComments('')
        setNextId(prev => prev + 1)
    }




    return (
        <div className='mt-1 mr-4'>
            <button onClick={openModal}>
                <MessageCircle className="w-5 h-5 text-gray-500 mr-113 transition" />

            </button>

            {isOpen && (
                <Modal onClose={closeModal}>
                    <div className='p-4'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Комментарии</h2>
                            <button onClick={closeModal}>
                                <X className='w-5 h-5 text-gray-500 hover:text-black' />
                            </button>
                        </div>

                        <div className='space-y-2 flex flex-col'>
                            <div className='flex justify-between'>
                                <input
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    placeholder='Comments'
                                    className='border-black border-b-4 focus:outline-none w-full mr-2'
                                />
                                <button
                                    onClick={onClick}
                                    className='w-24 h-8 cursor-pointer hover:bg-black hover:text-white transition border rounded-xl text-sm'
                                >
                                    Public
                                </button>
                            </div>

                            {posts.map(post => (
                                <div key={post.id} className='flex justify-between'>
                                    <h3>{post.comments}</h3>
                                    <button
                                        className='cursor-pointer mr-50 text-red-500 hover:underline'
                                       onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}
