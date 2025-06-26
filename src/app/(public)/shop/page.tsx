import {API_URL} from "@/constants";
import ProductCard from "@/components/ProductCard";

export default async function SSRPage(){
    const response = await fetch(API_URL,{
        cache: 'no-store'
    })

    const products = (await response.json()) as ProductCard[]



    return (
        <div className='grid grid-cols-2 '>
            {products.map(products => <ProductCard key={products.id} {...products} />)}
        </div>
    )
}