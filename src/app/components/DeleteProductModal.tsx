
import { X, Trash2 } from "lucide-react";

interface DeleteProductModalProps {
  product: { id: string; name: string } | null;
  showDelete: boolean;
  setShowDelete: (show: boolean) => void;
  onDelete: (id: string) => void; 
  loading:boolean
}

const DeleteProductModal = ({
  product,
  showDelete,
  setShowDelete,
  onDelete,
   loading
}: DeleteProductModalProps) => {
  if (!product) return null; 

  return (
    <div
      className={`fixed inset-0 bg-[rgba(57,64,58,0.35)] backdrop-blur-[3.5px] flex items-end md:items-center justify-center z-50 transition-all duration-300 ease-in-out
      ${showDelete ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}
    >
      <div className="bg-white relative py-8 px-10 max-w-lg rounded-tr-[16px] rounded-tl-[16px] md:rounded-[16px] shadow-lg w-full sm:w-fit flex flex-col items-center text-center gap-6">
        {/* Close Button */}
        <button
          onClick={() => setShowDelete(false)}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Delete Icon */}
        <div className="my-6 flex justify-center">
          <Trash2 size={64} className="text-red" />
        </div>

        {/* Title */}
        <h2 className="text-red-600 font-bold text-2xl md:text-3xl">
          Delete Product?
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">{product.name}</span>?
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 w-full md:flex-row mt-4 md:gap-6">
          <button
            className="flex-1 py-3 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setShowDelete(false)}
          >
            No, cancel
          </button>
          <button
            className="flex-1 py-3 bg-red text-white rounded-md hover:bg-red-700 transition"
            onClick={() => {
              onDelete(product.id);
            }}
            disabled={loading}
          >
           {loading?'deleting':' Yes, delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
