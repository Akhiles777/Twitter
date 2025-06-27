import Image from "next/image";
import Search from "./Search";

import Link from "next/link";




import {Menu} from "@/components/Menu";
import {TWEETS} from "@/shared/data/tweets.data";

export function Header() {


    return (
<div>


    <header className='border-b border-white/10 px-6 py-4 flex items-center justify-between bg-black'>

        <Link href={'/'} className='flex items-center gap-3'>

            <Image src={'/x-logo.svg'} alt={'X-l'} width={28} priority height={28}/>

        </Link>


        <Menu/>
    </header>

</div>
)
}