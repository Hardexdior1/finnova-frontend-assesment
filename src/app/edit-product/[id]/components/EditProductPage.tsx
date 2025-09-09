
"use client";

import React, {  useState } from "react";
import Link from "next/link";
import endpointroute from "@/app/utils/endpointroute";
import { ToastContainer,toast } from "react-toastify";
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const EditProductPage = ({ product }: { product: Product }) => {

  const [formData, setFormData] = useState<Product>({
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    image: product?.image || "",
  });

  const [saving, setSaving] = useState(false);

  
  //  Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  // this if for uploading file 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file); 
    }
  };

  //  Saving product using put,
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
       await endpointroute.put(`project/${product.id}`, formData);

      toast.success(" Product updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error(" Failed to update product");
      setSaving(false)
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <ToastContainer />
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border">
        <div className="md:flex">
          {/*  Image Preview */}
          <div className="md:w-1/2 flex items-center justify-center bg-gray-100">
            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <p className="text-gray-500">No image uploaded</p>
            )}
          </div>

         
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Edit Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  disabled
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Upload new image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload New Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <Link href={`/`} className="flex-1">
                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition">
                  Back to List
                </button>
              </Link>
               
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
