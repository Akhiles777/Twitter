import type {PropsWithChildren} from "react";
import ShopMenu from "@/app/(public)/shop/ShopMenu";



export default function Layout({children}: PropsWithChildren) {
    return (
        <div className='w-full'>
            <h1 className='text-3xl font-bold mb-6'>Shop</h1>
<ShopMenu/>
            {children}
        </div>
    )
}