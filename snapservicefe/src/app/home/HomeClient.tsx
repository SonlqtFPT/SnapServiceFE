'use client'
import React from 'react'
import Link from 'next/link'
import Banner from './components/Banner'
import Category from './components/Category'
import NewProduct from './components/NewProduct'
import NewArrivals from './components/NewArrivals'
import FeatureProduct from './components/FeatureProduct'

export default function HomeClient() {
  return (
    <div className='mx-28'>
      <Banner />
      <div className=' flex justify-between mb-5'>
        <div className='text-2xl font-semibold'>
          Top Categories
        </div>
        <i className="fa-solid fa-user"></i>
        <Link href='/products'><button className='text-sm text-black border font-semibold rounded-3xl p-2 hover:text-gray-800 cursor-pointer'>
          View All
        </button>
        </Link >
      </div>
      <Category />
      <div className='flex justify-between my-5'>
        <div className='text-2xl font-semibold'>
          New Products
        </div>
        <Link href='/products'><button className='text-sm text-black border font-semibold rounded-3xl p-2 hover:text-gray-800 cursor-pointer'>
          View All
        </button>
        </Link >
      </div>
      <NewProduct />
      <div className='flex justify-between my-5'>
        <div className='text-2xl font-semibold'>
          New Arrivals
        </div>
        <Link href='/products'><button className='text-sm text-black border font-semibold rounded-3xl p-2 hover:text-gray-800 cursor-pointer'>
          View All
        </button>
        </Link >
      </div>
      <NewArrivals />
      <div className='flex justify-between my-5'>
        <div className='text-2xl font-semibold'>
          Featured Products
        </div>
        <Link href='/products'><button className='text-sm text-black border font-semibold rounded-3xl p-2 hover:text-gray-800 cursor-pointer'>
          View All
        </button>
        </Link >
      </div>
      <FeatureProduct />
    </div>
  )
}
