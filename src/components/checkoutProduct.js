import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import Currency from 'react-currency-formatter'
import { addToBasket,removeFromBasket } from "../slices/basketSlice"
import { useDispatch } from "react-redux"
function CheckoutProduct({
    id,
    title, 
    price,
    description,
    category,
    image,
    isPrime,
    rating
}) {

    const dispatch=useDispatch()
    const addItemToBasket=()=>{
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
        dispatch(addItemToBasket(product))
    }
    const removeItemFromBarket=()=>{
        //remove item using redux
        dispatch(removeFromBasket({id}))
    }

  return (
    <div className="grid grid-cols-5">
        <Image 
            src={image}
            height={200}
            width={200}
            objectFit="contain"
        />
      


      {/* middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
            {Array(rating).fill().map((_,i)=>(
                <StarIcon key={i} className="h-5 text-yellow-500"/>
            ))
            }
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price*80} currency="INR"/>
        {isPrime&&
        <div className="flex items-center space-x-2">
            <img
            loading="lazy"
            src="https://links.papareact.com/fdw"
            className="w-12"
            alt="prime"
            />
            <p className="text-grey-500 text-xs">FREE Next-day Delivery </p>
            </div>
            }
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end mr-2">
        <button className="button" onClick={addItemToBasket}>
            Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBarket}>
            Remove
        </button>
      </div>
    </div>
  )
}

export default CheckoutProduct
