
import Profile from "@/app/(public)/u/[username]/Profile";
import type {Metadata} from "next";




export const metadata: Metadata = {
    title: "Profile",
}





export default function ProfilePage(){




    return(
        <div>
 <Profile/>


        </div>
    )
}