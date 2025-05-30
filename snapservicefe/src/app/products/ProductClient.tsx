'use client'
import Sort from './components/Sort'
import Category from './components/Category'
import Card from './components/Card'
import { ProductType } from '@/types/product/ProductType'

type Props = {
    products: ProductType[],
}

export default function ProductsClient({ products }: Props) {
    return (
        <div className='flex gap-4'>
            <div className='w-[20%]'>
                <Category />
            </div>
            <div className='flex flex-col w-[80%] gap-5'>
                <Sort totalProduct={products.length} />
                <Card products={products} />
            </div>
        </div>
    )
}
