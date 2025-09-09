
import React from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

import EditProductPage from "./components/EditProductPage";

// Shared fetcher
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

// Metadata uses the same fetcher
interface PageParams {
  id: string;
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const product = await getProduct(params.id);

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
interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const product = await getProduct(params.id);
  if (!product) {
    return (
      <div className="h-screen text-center flex flex-col items-center justify-center text-xl">
        <p>Product not found</p>
      </div>
    );
  }

  return <EditProductPage product={product} />;
};

export default Page;