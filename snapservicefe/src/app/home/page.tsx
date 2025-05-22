import React from 'react'
import Banner from './components/Banner'
import Category from './components/Category'
import NewProduct from './components/NewProduct'
const page = () => {
  return (
    <div>
      <Banner />
      <div className='bg-red-500 flex justify-between'>
        <div>
          Top Categories
        </div>
        <button>
          View All
        </button>
      </div>
      <Category />
      <div className='bg-red-500 flex justify-between'>
        <div>
          New Products
        </div>
        <button>
          View All
        </button>
      </div>
    <NewProduct/>
    </div>
  )
}

export default page