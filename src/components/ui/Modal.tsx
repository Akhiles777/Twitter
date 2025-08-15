'use client'

export default function Modal({
                                  children,
                                  onClose,
                              }: {
    children: any
    onClose: () => void
}) {
    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center'>
            <div className='bg-gray-800 rounded-xl shadow-lg w-full h-70 max-w-md'>
                {children}
            </div>



        </div>
    )
}
