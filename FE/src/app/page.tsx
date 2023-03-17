import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "./page.module.css"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard"

const inter = Inter({ subsets: ["latin"] })
export interface FulhausCategory {
  _id: string
  name: string
}

export interface Vendor {
  _id: string
  name: string
}

export interface Product {
  _id: string
  imageURLs: string[]
  lifeStyleImageURLs: string[]
  weight: number
  length: number
  width: number
  height: number
  fulhausCategory: FulhausCategory
  material: string
  stockQty: number
  tags: string[]
  warrantyInfo: string | null
  careInfo: string | null
  currency: string
  dimensionUnit: string
  weightUnit: string
  vendor: Vendor
  updatedAt: string
  retailPrice: number
  fulhausProductName: string
  fulhausColorName: string
  fulhausDescription: string
  rentalPrice: number
  orderCurrency: string
}

const getProductsData = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://fh-api-dev.herokuapp.com/api/products-service/products/website/CAD?page=0&limit=6"
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  const productsData = data.data.products
  return productsData
}

export default async function Home() {
  const productsData = await getProductsData()

  return (
    <main className="w-full">
      <div className="flex">
        <Image
          src="/images/hero.png"
          alt="Picture of the author"
          width={320}
          height={1080}
        />
        <div className="grid grid-cols-3 gap-10">
          {productsData.map((product: Product) => (
            <div key={product._id}>
              <ProductCard
                imgPRM={product.imageURLs[0]}
                imgSID={product.imageURLs[2]}
                productName={product.fulhausProductName}
                prize={product.retailPrice}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
