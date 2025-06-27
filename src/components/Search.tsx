'use client'

import { useState } from 'react'

export default function Search({
                                   value,
                                   onChange,
                               }: {
    value: string
    onChange: (val: string) => void
}) {
    return (
        <div className='mr-50'>
            <input
                onChange={(e) => onChange(e.target.value)}
                type='search'
                value={value}
                placeholder='Search 🔍'
                className=' w-60 pl-4 flex justify-between ml-20 focus:outline-none border rounded-xl px-2 py-1'
            />
        </div>
    )
}
