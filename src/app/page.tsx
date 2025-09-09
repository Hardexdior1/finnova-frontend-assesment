"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Eye, Trash } from "lucide-react"
import Hero from "./components/Hero"
import endpointroute from "./utils/endpointroute"
import DeleteProductModal from "./components/DeleteProductModal"
import LoadingSpinner from "./components/LoadinSpinner"
import { ToastContainer,toast } from "react-toastify"

interface Product {
  id: string
  name: string
  description: string
  price:  string
  image: string
  createdAt?: string
}





export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
const [showDelete,setShowDelete]=useState(false)
const [loadingDelete,setLoadingDelete]=useState(false)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await endpointroute.get("/project")
        // setProducts(response.data?.slice(0,16))
                setProducts(response?.data)

        console.log(response.data)
        // i dont want all the products to render at once, pagination is going to be usefull here,
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // delete function
const handleDelete= async(id:string)=>{
setLoadingDelete(true)
  try {
    await endpointroute.delete(`/project/${id}`)
    setLoadingDelete(false)
    setShowDelete(false)
    toast.success('product deleted succesfully')
    // i am filtring the product immediately so users wont have to refresh pge to see the updated listing
     setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );
  } catch (error) {
        setLoadingDelete(false)
toast.error('could not delete product an error occured')
  }
}
  return (
    <div className="flex flex-col gap-10 py-10 container bg-background">
      <ToastContainer />
      {/* hero component */}
      <Hero />
      {/* delete modal */}
      <DeleteProductModal product={productToDelete} loading={loadingDelete} showDelete={showDelete} setShowDelete={setShowDelete} onDelete={handleDelete} />
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pt-8">
          <h2 className="text-3xl font-bold text-foreground">Product Collection</h2>
          <Link href="/create-product">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">
              + Add New Product
            </button>
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-card rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <div className="text-muted-foreground text-4xl">📦</div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No products yet</h3>
            <p className="text-muted-foreground text-lg mb-6">
              Start by adding your first product
            </p>
            <Link href={`/create-product`}>
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all shadow-md">
                Add Your First Product
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
            {products.map((product) => (
             <div
  key={product.id}
  className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
>
  {/* Product Image */}
          <Link href={`/products/${product.id}`}>

  <div className="aspect-square overflow-hidden">
    <img 
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </div>
 </Link>

  <div className="p-5 flex flex-col  justify-between">
    <div>
      <h3 className="text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
        {product.description}  
      </p>
    </div>

    
    <div className="mt-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold text-primary">
          ${product.price} 
        </span>
      </div>

     
      <div className="flex flex-col flex-wrap sm:flex-row gap-3">
        <Link href={`/products/${product.id}`} className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg text-base font-medium hover:bg-blue-700 transition">
            <Eye className="w-5 h-5" /> View
          </button>
        </Link>

        <Link href={`/edit-product/${product.id}`} className="flex-1">
          <button className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-white p-3 rounded-lg text-base font-medium hover:bg-yellow-600 transition">
            <Edit className="w-5 h-5" /> Edit
          </button>
        </Link>

        <button onClick={() => {
          setProductToDelete(product);
          setShowDelete(true);
        }} className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white p-3 rounded-lg text-base font-medium hover:bg-red-700 transition">
          <Trash className="w-5 h-5" /> Delete
        </button>
      </div>
    </div>
  </div>
</div>

            ))}
          </div>
        )}
      </div>
    </div>
  )
}
