"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { GiRoundStar } from "react-icons/gi"
import { HiShoppingCart } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { addItem } from "@/redux/cartSlice"
import { Product } from "@/app/page"



export default function ProductCard({
  _id,
  imgPRM,
  imgSID,
  fulhausProductName,
  retailPrice,
}: Product) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addItem({ _id, imgPRM, imgSID, fulhausProductName, retailPrice }))
  }
  return (
    <div>
      <Link href="#" className="group m-4 block overflow-hidden border">
        <div className="relative max-h-[250px] sm:h-[350px]">
          <Image
            src={imgPRM}
            alt=""
            className="absolute inset-0 h-full w-full object-scale-down opacity-100 group-hover:opacity-0"
            width={350}
            height={350}
          />

          <Image
            src={imgSID}
            alt=""
            className="absolute inset-0 h-full w-full  object-scale-down opacity-0 group-hover:opacity-100"
            width={350}
            height={350}
          />
        </div>

        <div className="relative bg-white pt-3">
          <h3 className="px-4 text-lg font-semibold text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {fulhausProductName}
          </h3>
          <h3 className="flex px-4 py-2 text-yellow-300">
            <GiRoundStar />
            <GiRoundStar />
            <GiRoundStar />
            <GiRoundStar />
            <GiRoundStar />
          </h3>
          <div className="flex justify-between px-2">
            <p className="mt-1.5 px-4 py-2 text-lg font-bold tracking-wide text-gray-900">
              ${retailPrice}
            </p>
            <button className="px-4 pt-3 text-2xl" onClick={handleAddToCart}>
              <HiShoppingCart />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
