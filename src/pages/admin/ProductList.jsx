import { Button, ButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../components/comman/CustomModal.jsx";
import { useSnackbar } from "../../context/SnackbarContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useDeleteProduct } from "../../lib/hooks/product/useDeleteProduct.js";
import { useGetProductList } from "../../lib/hooks/product/useGetProductList.js";

export default function ProductList() {
  const { showSnackbar } = useSnackbar();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const { data: resp, isLoading, isError, error } = useGetProductList();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (resp) setProducts(resp);
  }, [resp]);

  useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
  }, [isError]);

  const handleDelete = () => {
    deleteProduct(deleteId, {
      onSuccess: () => {
        showSnackbar("Product deleted successfully", "success");
        setConfirmOpen(false);
      },
      onError: (err) => {
        showSnackbar(
          err?.response?.data?.error || err?.response?.data?.message,
          "error"
        );
        setConfirmOpen(false);
      },
    });
  };

  return (
    <div
      className={`h-full p-4 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div
            className={`animate-spin h-10 w-10 border-4 ${
              isDark ? "border-gray-600" : "border-gray-300"
            } border-t-indigo-600 rounded-full`}
          />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl">No products found</p>
          <p className="mt-2 text-gray-500">
            Click "Add Product" to create one.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div
            className={`hidden md:grid md:grid-cols-4 gap-2 px-4 py-2 font-medium border-b ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div>Name</div>
            <div>Description</div>
            <div>Created At</div>
            <div className="text-right">Actions</div>
          </div>

          {products.map((p) => (
            <div
              key={p._id}
              className={`grid grid-cols-1 md:grid-cols-4 gap-2 p-4 border-b hover:${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div>
                <span className="md:hidden font-semibold">Name: </span>
                {p.name}
              </div>
              <div>
                <span className="md:hidden font-semibold">Description: </span>
                {p.description}
              </div>
              <div>
                <span className="md:hidden font-semibold">Created At: </span>
                {dayjs(p.createdAt).format("DD-MM-YYYY")}
              </div>
              <div className="flex space-x-2 justify-start md:justify-end">
                <ButtonGroup variant="outlined">
                  <Button
                    onClick={() => navigate(`/admin/products/${p._id}`)}
                    title="Edit"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteId(p._id);
                      setConfirmOpen(true);
                    }}
                    className="p-2 rounded hover:bg-red-100"
                    title="Delete"
                  >
                    <FaTrash />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <CustomModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        header={
          <span
            className={`text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Delete Confirmation
          </span>
        }
        body={
          <div
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Are you sure you want to delete this product?
          </div>
        }
        footer={
          <>
            <Button
              onClick={() => setConfirmOpen(false)}
              variant="outlined"
              sx={{
                color: isDark ? "#e2e8f0" : "#1f2937",
                borderColor: isDark ? "#334155" : "#cbd5e1",
                "&:hover": {
                  borderColor: isDark ? "#475569" : "#94a3b8",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
              sx={{
                backgroundColor: isDark ? "#b91c1c" : undefined,
                "&:hover": {
                  backgroundColor: isDark ? "#991b1b" : undefined,
                },
              }}
            >
              Yes, Delete
            </Button>
          </>
        }
      />
    </div>
  );
}
