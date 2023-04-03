import React, { useState } from 'react'
import Image from 'next/image'
import {StarIcon} from '@heroicons/react/solid'
// import reactCurrencyFormatter from 'react-currency-formatter';
import Currency from 'react-currency-formatter';
import { addToBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';
const MAX_RATING=5;
const MIN_RATING=1;
function Product({id,title,price,description,category,image}) {
    const [rating]=useState(
        Math.floor(Math.random()*(MAX_RATING-MIN_RATING+1))+MIN_RATING
    );
    const [isPrime]=useState(
        Math.random()<0.5
    )

      const dispatch=useDispatch()
    const addTobasket=()=>{
      const product={
        id,
        title,
        price,
        description,
        category,
        image,
        isPrime,
        rating
      }
      // sending the product as an action to slice
      dispatch(addToBasket(product))
    }
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className='absolute top-2 right-2 italic text-grey-400'>{category}</p>
      <Image src={image} height={200} width={200} objectFit='contain'/>

      <h4>{title}</h4>
        <div className='flex'>
            {Array(rating).fill().map((_,i)=>

                <StarIcon className='h-5 text-yellow-500'/>

            )}
        </div>
        <p className='text-xs my-2 line-clamp-2'>{description}</p>
        <div className='mb-5'>
            <Currency  quantity={price*80} currency='INR'/>
        </div>
        {isPrime&&(
          <div className='flex items-center space-x-2 -mt-5'>
            <img className='w-12' src="https://links.papareact.com/fdw" alt='isPrime'/>
            <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
          </div>
        )}
        <button onClick={addTobasket} className='mt-auto button'>Add To Basket</button>
    </div>
  )
}

export default Product
