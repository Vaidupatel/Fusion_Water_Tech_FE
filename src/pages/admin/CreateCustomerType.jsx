import { Button, CircularProgress, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useCreateCustomerType } from "../../lib/hooks/customerType/useCreateCustomerType.js";

export default function CreateCustomerType() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: "", notes: "" } });

  const { mutate: createCustomerType, isPending } = useCreateCustomerType();

  const onSubmit = async (formData) => {
    createCustomerType(formData, {
      onSuccess: () => {
        showSnackbar("Customer type created", "success");
        navigate("/admin/customer-type");
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
          Back to Types
        </button>
        <h1 className="text-2xl font-bold">Add Customer Type</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name Field */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Type Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ style: { color: isDark ? "#fff" : "#000" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? "#1e293b" : "#f9fafb",
                  color: isDark ? "#fff" : "#000",
                },
              }}
            />
          )}
        />

        {/* Notes Field */}
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Notes"
              multiline
              rows={3}
              fullWidth
              InputLabelProps={{ style: { color: isDark ? "#fff" : "#000" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? "#1e293b" : "#f9fafb",
                  color: isDark ? "#fff" : "#000",
                },
              }}
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
            disabled={isPending || isSubmitting}
            startIcon={!isPending && !isSubmitting && <FaSave />}
          >
            {isPending || isSubmitting ? (
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
