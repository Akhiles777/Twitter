import {API_URL} from "@/constants";
import ProductCard, {type IProduct} from "@/components/ProductCard";

export default async function SSRPage(){
    const response = await fetch(API_URL,{
        cache: 'no-store'
    })

    const products = (await response.json()) as IProduct[]



    return (
        <div className='pl-80 grid grid-cols-2 '>
            {products.map(products => <ProductCard key={products.id} {...products} />)}
        </div>
    )
}
