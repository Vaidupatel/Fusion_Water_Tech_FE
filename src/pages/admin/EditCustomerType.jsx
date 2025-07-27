import { Button, CircularProgress, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useUpdateCustomerType } from "../../lib/hooks/customerType/useUpdateCustomerType.js";
import { useGetCustomerTypeById } from "../../lib/hooks/customerType/useGetCustomerTypeById.js";

export default function EditCustomerType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const { showSnackbar } = useSnackbar();
  const isDark = theme === "dark";

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", notes: "" } });

  const { mutate: updateCustomerType, isPending: isSaving } =
    useUpdateCustomerType();
  const { data: resp, isLoading, isError, error } = useGetCustomerTypeById(id);

  useEffect(() => {
    if (resp) {
      setValue("name", resp.name || "");
      setValue("notes", resp.notes || "");
    }
  }, [resp]);

  useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
  }, [isError]);

  const onSubmit = (formData) => {
    updateCustomerType(
      { id, payload: formData },
      {
        onSuccess: () => {
          showSnackbar("Customer type updated successfully", "success");
          queryClient.invalidateQueries(["customerType", id]);
          queryClient.invalidateQueries(["customerTypes"]);
          navigate("/admin/customer-type");
        },
        onError: (err) =>
          showSnackbar(
            err?.response?.data?.error || err?.response?.data?.message,
            "error"
          ),
      }
    );
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
          Back
        </button>
        <h1 className="text-2xl font-bold">Edit Customer Type</h1>
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
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Type Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
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
                variant="outlined"
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

          {/* Submit/Cancel Buttons */}
          <div className="flex justify-end gap-3">
            <Button onClick={() => navigate(-1)} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSaving}
              color="primary"
              startIcon={!isSaving && <FaSave />}
            >
              {isSaving ? (
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
