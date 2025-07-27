import { Button, CircularProgress, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useCreateProduct } from "../../lib/hooks/product/useCreateProduct";

export default function CreateProduct() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: "", description: "" } });

  const { mutate: createProduct, isPending } = useCreateProduct();

  const onSubmit = (formData) => {
    createProduct(formData, {
      onSuccess: () => {
        showSnackbar("Product created successfully", "success");
        navigate("/admin/products");
      },
      onError: (err) => {
        showSnackbar(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Failed to create product",
          "error"
        );
      },
    });
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: isDark ? "#1e293b" : "#f9fafb",
      color: isDark ? "#fff" : "#000",
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#fff" : "#000",
    },
  };

  return (
    <div
      className={`flex-1 p-6 rounded-xl shadow-md ${
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
        <h1 className="text-2xl font-bold">Add Product</h1>
      </div>

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
            startIcon={!isPending && !isSubmitting && <FaSave />}
          >
            {isSubmitting || isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
