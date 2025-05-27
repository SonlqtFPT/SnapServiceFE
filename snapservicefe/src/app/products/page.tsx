import React from 'react'
import ProductsClient from './ProductClient'
import { ProductType } from './Type/ProductType'

export default async function page() {

  const products: ProductType[] = [
    {
      id: '1',
      name: 'Product 1',
      created_at: new Date(),
      price: 100,
      description: 'Description 1',
      image: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w',
      stock_in_quantity: 10,
      rating_average: 4.5,
      sku: 'SKU1',
      discount_price: 90,
      discount_percent: 10,
      sold_quantity: 5,
      available_quantity: 5,
      is_active: true,
      is_sale: false,
      slug: 'product-1',
      categories_id: 1,
      supplier_id: 1,
      is_favorite: false
    },
    {
      id: '2',
      name: 'Product 2',
      created_at: new Date(),
      price: 200,
      description: 'Description 2',
      image: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w',
      stock_in_quantity: 20,
      rating_average: 4.0,
      sku: 'SKU2',
      discount_price: 180,
      discount_percent: 10,
      sold_quantity: 10,
      available_quantity: 10,
      is_active: true,
      is_sale: true,
      slug: 'product-2',
      categories_id: 2,
      supplier_id: 2,
      is_favorite: false
    },
    {
      id: '3',
      name: 'Product 3',
      created_at: new Date(),
      price: 300,
      description: 'Description 3',
      image: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w',
      stock_in_quantity: 0,
      rating_average: 3.5,
      sku: 'SKU3',
      discount_price: 270,
      discount_percent: 10,
      sold_quantity: 15,
      available_quantity: 15,
      is_active: false,
      is_sale: false,
      slug: 'product-3',
      categories_id: 3,
      supplier_id: 3,
      is_favorite: true
    },
    {
      id: '4',
      name: 'Product 4',
      created_at: new Date(),
      price: 400,
      description: 'Description 4',
      image: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w',
      stock_in_quantity: 40,
      rating_average: 5.0,
      sku: 'SKU4',
      discount_price: 360,
      discount_percent: 10,
      sold_quantity: 20,
      available_quantity: 20,
      is_active: true,
      is_sale: true,
      slug: 'product-4',
      categories_id: 4,
      supplier_id: 4,
      is_favorite: false
    },
    {
      id: '5',
      name: 'Product 5',
      created_at: new Date(),
      price: 500,
      description: 'Description 5',
      image: 'https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1671853906962-RV08WWNIS1LTNE453MOX/Artboard%2B2.jpg?format=750w',
      stock_in_quantity: 50,
      rating_average: 4.0,
      sku: 'SKU5',
      discount_price: 450,
      discount_percent: 10,
      sold_quantity: 25,
      available_quantity: 25,
      is_active: true,
      is_sale: false,
      slug: 'product-5',
      categories_id: 5,
      supplier_id: 5,
      is_favorite: true
    }
    // Add more products as needed
  ]
  return (
    <div>
      <ProductsClient products={products} />
    </div>
  )
}
