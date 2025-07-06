'use client';

import Image from "next/image";
import Search from "./Search";
import Link from "next/link";
import {Menu} from "@/components/Menu";
import {TWEETS} from "@/shared/data/tweets.data";
import { UserInfo } from "./auth/UserInfo";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
    const { user } = useAuth();

    return (
        <div>
            <header className='border-b border-white/10 px-6 py-4 flex items-center justify-between bg-black'>
                <Link href={'/'} className='flex items-center gap-3'>
                    <Image src={'/x-logo.svg'} alt={'X-l'} width={28} priority height={28}/>
                </Link>

                <div className="flex items-center gap-4">
                    <Menu/>
                    {user ? (
                        <UserInfo />
                    ) : (
                        <Link 
                            href="/auth"
                            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Войти
                        </Link>
                    )}
                </div>
            </header>
        </div>
    )
}