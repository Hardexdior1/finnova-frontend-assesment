"use client";

import React from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

interface ProductDetailProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border">
        <div className="md:flex">
          {/* Left: Image */}
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Right: Details */}
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
              <p className="text-2xl font-semibold text-blue-600">
                ${product.price}
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Link href={`/edit-product/${product.id}`} className="flex-1">
                <button className="w-full bg-blue hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition">
                  Edit Product
                </button>
              </Link>
              <Link href={`/`} className="flex-1">
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition">
                  Back to List
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
