import {API_URL} from "@/constants";
import ProductCard from "@/components/ProductCard";

import type {IProduct} from "@/components/ProductCard";

export default async function SSGPage() {

    const response = await fetch(API_URL)

    const products = (await response.json()) as ProductCard[]



    return (
        <div className='grid grid-cols-2 '>
            {products.map(products => <ProductCard key={products.id} {...products} />)}
        </div>
    )
}