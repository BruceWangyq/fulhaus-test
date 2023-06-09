import Image from "next/image"
import { Inter } from "next/font/google"
import ProductCard from "@/components/ProductCard"
import Cart from "@/components/Cart"

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
  imgPRM?: string
  imgSID?: string
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
  key: string
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
    <main className="flex h-screen max-w-full items-center justify-center">
      <Image
        src="/sofa.jpg"
        alt="sofa"
        width={420}
        height={900}
        className=" 
        h-full
        w-1/3
        object-cover
        object-right
        p-6"
      />

      <div className="grid h-full w-2/3 grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3">
        {productsData.map((product: Product) => (
          <div key={product._id}>
            <ProductCard
              key={product._id}
              imgPRM={product.imageURLs[0]}
              imgSID={product.imageURLs[1]}
              fulhausProductName={product.fulhausProductName}
              retailPrice={product.retailPrice}
              _id={product._id}
            />
          </div>
        ))}
      </div>
      <Cart />
    </main>
  )
}
