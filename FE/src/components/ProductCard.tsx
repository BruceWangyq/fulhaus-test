import Image from "next/image"
import Link from "next/link"
import React from "react"

interface ProductCardProps {
  imgPRM: string
  imgSID: string
  productName: string
  prize: number
}

export default function ProductCard({
  imgPRM,
  imgSID,
  productName,
  prize,
}: ProductCardProps) {
  return (
    <div>
      <Link href="#" className="group block overflow-hidden">
        <div className="relative h-[350px] sm:h-[450px]">
          <Image
            src={imgPRM}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
            width={350}
            height={350}
          />

          <Image
            src={imgSID}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            width={350}
            height={350}
          />
        </div>

        <div className="relative bg-white pt-3">
          <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {productName}
          </h3>

          <p className="mt-1.5 tracking-wide text-gray-900">${prize}</p>
        </div>
      </Link>
    </div>
  )
}
