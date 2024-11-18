import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const EngineProducts = () => {

    const {products} = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() =>{
      setLatestProducts(products.slice(0,5));
    }, [])
    

    // console.log(products);
    
  return (
    <div className='custom-margin my-10 sm:my-8 md:my-10'>
      <div className="text-center md:mt-2 py-8 text-3xl">
        <Title text1={"Latest"} text2={"Arrivals"} />
        <p className='w-3/4 m-auto text-xl sm:text-sm md:text-base text-gray-700' >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At, quisquam dolores! Et deleniti quibusdam id!
        </p>
      </div>
    {/* Rendering Products */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
      {
        latestProducts.map((item, index) =>(
          <ProductItem key={index} id={item._id} img={item.image[0]} name={item.name} price={item.price}/>
        ))
      }
    </div>
    </div>
  )
}

export default EngineProducts;