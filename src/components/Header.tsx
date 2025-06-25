import Image from "next/image";

import Link from "next/link";
import {PAGES} from "@/config/pages.config";


import {TWEETS} from "@/shared/data/tweets.data";
import {Menu} from "@/components/Menu";

export function Header() {





    return (
        <header className='border-b border-white/10 px-6 py-4 flex items-center justify-between bg-black'>
    <Link href={'/'} className='flex items-center gap-3'>

            <Image src={'/x-logo.svg'} alt={'X-l'} width={28} priority height={28}/>

        </Link>




<Menu/>
        </header>
    )
}