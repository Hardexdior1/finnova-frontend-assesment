
import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}
import ProductDetails from "./components/EditProductPage";
// shared fetcher , 
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

//  Metadata uses the same fetcher
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(await params.id);

  if (!product) {
    return {
      title: "Product not found",
      description: "This product does not exist.",
    };
  }

  return {
    title: `${product.name} | $${product.price}`,
    description: product.description,
  };
}

//  Page uses the same fetcher
const Page = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(await params.id);
  if (!product) return <div className="h-screen text-center flex flex-col items-center justify-center text-xl "><p>Product not found</p></div>;


  return <ProductDetails product={product} />;
};

export default Page;
