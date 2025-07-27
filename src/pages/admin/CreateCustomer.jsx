import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useCreateCustomer } from "../../lib/hooks/customer/useCreateCustomer";
import { useGetCustomerTypeList } from "../../lib/hooks/customerType/useGetCustomerTypeList";
import { useGetProductList } from "../../lib/hooks/product/useGetProductList";
import dayjs from "dayjs";

export default function CreateCustomer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      mobilePrimary: "",
      mobileSecondary: "",
      address: "",
      customerType: null,
      product: null,
      productDetails: "",
      dateOfSale: dayjs().format("YYYY-MM-DD"),
      warranty: 0,
      deposit: 0,
      servicePeriodDays: 0,
    },
  });

  const { data: customerTypes = [] } = useGetCustomerTypeList();
  const { data: products = [] } = useGetProductList();
  const { mutate: createCustomer, isPending } = useCreateCustomer();

  const onSubmit = (formData) => {
    createCustomer(
      {
        ...formData,
        customerType: formData.customerType?._id,
        product: formData.product?._id,
      },
      {
        onSuccess: () => {
          showSnackbar("Customer created successfully", "success");
          navigate("/admin/customers");
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.error ||
              err?.response?.data?.message ||
              "Failed to create customer",
            "error"
          );
        },
      }
    );
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
          Back to Customers
        </button>
        <h1 className="text-2xl font-bold">Add Customer</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Each field inside grid */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Customer Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="mobilePrimary"
          control={control}
          rules={{
            required: "Primary mobile is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit number",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Primary Mobile"
              fullWidth
              error={!!errors.mobilePrimary}
              helperText={errors.mobilePrimary?.message}
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="mobileSecondary"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Secondary Mobile"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              multiline
              rows={2}
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="customerType"
          control={control}
          rules={{ required: "Customer Type is required" }}
          render={({ field }) => (
            <Autocomplete
              options={customerTypes}
              getOptionLabel={(option) => option?.name || ""}
              onChange={(_, value) => field.onChange(value)}
              value={field.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Customer Type"
                  error={!!errors.customerType}
                  helperText={errors.customerType?.message}
                  sx={inputStyles}
                />
              )}
            />
          )}
        />

        <Controller
          name="product"
          control={control}
          rules={{ required: "Product is required" }}
          render={({ field }) => (
            <Autocomplete
              options={products}
              getOptionLabel={(option) => option?.name || ""}
              onChange={(_, value) => field.onChange(value)}
              value={field.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product"
                  error={!!errors.product}
                  helperText={errors.product?.message}
                  sx={inputStyles}
                />
              )}
            />
          )}
        />

        <Controller
          name="productDetails"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Product Details"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="dateOfSale"
          control={control}
          rules={{ required: "Date of Sale is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Sale"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.dateOfSale}
              helperText={errors.dateOfSale?.message}
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="warranty"
          control={control}
          rules={{
            min: { value: 0, message: "Warranty must be ≥ 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Warranty (days)"
              type="number"
              fullWidth
              error={!!errors.warranty}
              helperText={errors.warranty?.message}
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="deposit"
          control={control}
          rules={{
            min: { value: 0, message: "Deposit must be ≥ 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Deposit (₹)"
              type="number"
              fullWidth
              error={!!errors.deposit}
              helperText={errors.deposit?.message}
              sx={inputStyles}
            />
          )}
        />

        <Controller
          name="servicePeriodDays"
          control={control}
          rules={{
            min: { value: 0, message: "Service period must be ≥ 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Service Period (days)"
              type="number"
              fullWidth
              error={!!errors.servicePeriodDays}
              helperText={errors.servicePeriodDays?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Full-width on both columns */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-3">
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
              "Create"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
