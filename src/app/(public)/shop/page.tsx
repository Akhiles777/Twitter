import {API_URL} from "@/constants";
import ProductCard, {type IProduct} from "@/components/ProductCard";

export default async function SSRPage(){
    const response = await fetch(API_URL,{
        cache: 'no-store'
    })

    const products = (await response.json()) as IProduct[]



    return (
        <div className='sm:pl-8  pl-50 grid grid-cols-2 gap-1 '>
            {products.map(products => <ProductCard key={products.id} {...products} />)}
        </div>
    )
}
