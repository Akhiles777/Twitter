
import Profile from "@/app/(public)/u/[username]/Profile";
import type {Metadata} from "next";
import Link from "next/link";




export const metadata: Metadata = {
    title: "Profile",
}





export default function ProfilePage(){




    return(
        <div>
            <Link href={'/'}>Go to home</Link>

 <Profile/>


        </div>
    )
}