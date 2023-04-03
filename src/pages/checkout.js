import { useSelector } from "react-redux"
import Header from "../components/header"
import Image from "next/image"
import { selectItems, selectTotal } from "../slices/basketSlice"
import CheckoutProduct from "../components/checkoutProduct";
import Currency from 'react-currency-formatter'
import { useSession } from "next-auth/react";
function Checkout() {
    const items=useSelector(selectItems);
    const {data:session,event}=useSession()
    const total=useSelector(selectTotal);
  return (
    <div className="bg-gray-100">
        <Header/>
        <main className="lg:flex max-w-screen-2xl mx-auto">
            {/* left */}

            <div className="flex-grow m-5 shadow-sm">
                <Image
                src="https://links.papareact.com/ikj"
                width={1020}
                height={250}
                objectFit="contain"
                />

<div className="flex flex-col p-5 space-y-10 bg-white ">
                <h1 className="text-3xl">{items.length===0?'Your cart is empty':`Checkout ${items.length} items`}</h1>
            

            {   items.length>0&&
                items.map((item,i)=>{
                    return <CheckoutProduct
                    key={i}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    image={item.image}
                    isPrime={item.isPrime}
                    rating={item.rating}
                    />
                })
            }

</div>
            </div>
            

            {/* right */}
            <div className="flex bg-white p-10 flex-col shadow-md">
                {
                    items.length>0&&(
                        <>
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} items:)
                            <span className="font-bold">
                             <Currency quantity={total*80} currency="INR"/>   
                            </span>
                        </h2>
                        <button
                        disabled={!session}
                        className={`button whitespace-nowrap mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-700 cursor-not-allowed' }`}
                        >
                            {!session?'SignIn to Checkout':'Proceed to Checkout'}
                        </button>
                        </>
                    )
                }
            </div>
        </main>
    </div>
  )
}

export default Checkout
