import { Button, CircularProgress, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useGetProductById } from "../../lib/hooks/product/useGetProductById";
import { useUpdateProduct } from "../../lib/hooks/product/useUpdateProduct";
import { useEffect } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: product, isLoading, isError, error } = useGetProductById(id);

  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#1e293b" : "#f9fafb",
      color: isDark ? "#fff" : "#000",
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#fff" : "#000",
    },
  };

  const onSubmit = (formData) => {
    updateProduct(
      { id, formData },
      {
        onSuccess: () => {
          showSnackbar("Product updated successfully", "success");
          navigate("/admin/products");
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.error ||
              err?.response?.data?.message ||
              "Failed to update product",
            "error"
          );
        },
      }
    );
  };

  useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
  }, [isError]);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        description: product.description || "",
      });
    }
  }, [product, reset]);

  return (
    <div
      className={`flex-1 p-6 rounded-2xl shadow-md ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </button>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      {isLoading ? (
        <div className="py-10 text-center">
          <CircularProgress color={isDark ? "inherit" : "primary"} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name Field */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Product name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={inputStyles}
              />
            )}
          />

          {/* Description Field */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                fullWidth
                sx={inputStyles}
              />
            )}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button onClick={() => navigate(-1)} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || isPending}
              startIcon={!isSubmitting && !isPending && <FaSave />}
            >
              {isSubmitting || isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
