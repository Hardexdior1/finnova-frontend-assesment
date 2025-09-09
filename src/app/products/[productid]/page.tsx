
import React from "react";
import { notFound } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}
import ProductDetails from "./components/ProductDetails";
//  shared fetcher
async function getProduct(productid: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project/${productid}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

//  Metadata uses the same fetcher
export async function generateMetadata({ params }: { params: { productid: string } }) {
  const product = await getProduct(await params.productid);

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

// Page uses the same fetcher
const Page = async ({ params }: { params: { productid: string } }) => {
  const product = await getProduct(await params.productid);

  if (!product) return <div className="h-screen text-center flex flex-col items-center justify-center text-xl "><p>Product not found</p></div>;

  return <ProductDetails product={product} />;
};

export default Page;
