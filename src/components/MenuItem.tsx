import Link from "next/link";
import type {IMenuItem} from "@/components/menu.data";

interface Props {
    menuItem: IMenuItem,
    isActive: boolean;
}

export default function MenuItem({menuItem,isActive}:Props){
 return   <Link className={isActive ?  'text-white' : 'text-white/10'} href={menuItem.href}>{menuItem.name}</Link>



}