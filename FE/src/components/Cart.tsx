"use client"

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { removeItem, updateItemQuantity } from "@/redux/cartSlice"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem(itemId))
  }

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch(updateItemQuantity({ _id: itemId, quantity }))
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.retailPrice * item.quantity,
      0
    )
  }

  return (
    <div className="cart">
      <Sheet>
        <SheetTrigger>
          <button className="mx-2 bg-black px-4 py-2 text-white">
            <span className="text-xl">Cart</span>
            <span className="text-xl">({cartItems.length})</span>
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Order</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col items-center justify-center">
                <ul>
                  {cartItems.map((item) => (
                    <li key={item._id}>
                      <div className="flex ">
                        <Image
                          src={item.imgPRM}
                          alt=""
                          width={150}
                          height={150}
                        />
                        <div className="flex-col">
                          <div className="text-bold">
                            {item.fulhausProductName}
                          </div>
                          <div className="flex justify-between">
                            <div className="pr-8">${item.retailPrice}</div>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item._id,
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="border px-2 text-black"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <h1>Total:</h1> <h1>${calculateTotal().toFixed(2)}</h1>
                </div>
                <button className="m-4 mx-auto items-center bg-black px-8 py-4 text-lg text-white">
                  Checkout
                </button>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Cart
