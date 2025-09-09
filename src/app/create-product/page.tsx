
"use client";
import { ToastContainer, toast } from "react-toastify";
import type React from "react";
import { useState } from "react";
import endpointroute from "../utils/endpointroute";
import { X } from "lucide-react";
import Link from "next/link";
function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
const [loading,setLoding]=useState(false)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    setLoding(true)

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", imageFile); 

      let response = await endpointroute.post("/project", formData);
setLoding(false)
      console.log("Product created:", response.data);
toast.success("Product created successfully!");
      // reset form
      setName("");
      setDescription("");
      setPrice("");
      removeImage();
    } catch (error) {
      console.error("Error creating product:", error);
      setLoding(false)
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="bg-card p-10 rounded-2xl shadow-sm border border-border max-w-2xl mx-auto mt-8">
  <ToastContainer />
  <h2 className="text-3xl font-bold mb-8 text-card-foreground">
    Add New Product
  </h2>

  <form onSubmit={handleSubmit} className="space-y-8">
   
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-semibold mb-3 text-card-foreground">
          Product Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
          className="w-full p-4 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          placeholder="Enter product name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3 text-card-foreground">
          Price (USD)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value.trim())}
          className="w-full p-4 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          min="0"
          step="0.01"
          placeholder="0.00"
          required
        />
      </div>
    </div>

    {/* Description  */}
    <div>
      <label className="block text-sm font-semibold mb-3 text-card-foreground">
        Description
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value.trim())}
        className="w-full p-4 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
        rows={4}
        placeholder="Enter product description"
        required
      />
    </div>

    {/* Product Image */}
    <div>
      <label className="block text-sm font-semibold mb-3 text-card-foreground">
        Product Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 bg-input border border-border rounded-lg focus:outline-none"
      />

      {previewUrl && (
        <div className="relative inline-block mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>

    {/* Actions */}
  <div>
   
    <div className="flex flex-col gap-4 my-4 md:flex-row ">
      <button
        type="submit"
        className="flex-1 bg-blue text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
      >

        {loading ? "Creating..." : "Create Product"}
      </button>
      <button
        disabled={loading}
        type="button"
        onClick={() => {
          setName("");
          setDescription("");
          setPrice("");
          removeImage();
        }}
        className="flex-1 bg-muted text-muted-foreground border border-black px-8 py-4 rounded-lg hover:bg-muted/80 transition-all duration-200 font-semibold"
      >
        Cancel
      </button>
    </div>
    <Link href={`/`} className="mt-2">
      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg shadow-md transition">
        Back to List
      </button>
    </Link>
  </div>
  </form>
</div>

  );
}

export default ProductForm;
