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
      rent: 0,
      installDate: dayjs().format("YYYY-MM-DD"),
      installationCost: 0,
      installBy: "",
      referBy: "",
      staff: 0,
      rawWaterTDS: 0,
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
        {/* Name */}
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

        {/* Address */}
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

        {/* Primary Mobile */}
        <Controller
          name="mobilePrimary"
          control={control}
          rules={{
            required: "Primary mobile is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit number",
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

        {/* Secondary Mobile */}
        <Controller
          name="mobileSecondary"
          control={control}
          rules={{
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit number",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Secondary Mobile"
              helperText={errors.mobileSecondary?.message}
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Customer Type */}
        <Controller
          name="customerType"
          control={control}
          rules={{ required: "Customer Type is required" }}
          render={({ field }) => (
            <Autocomplete
              options={customerTypes}
              getOptionLabel={(opt) => opt.name}
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

        {/* Product */}
        <Controller
          name="product"
          control={control}
          rules={{ required: "Product is required" }}
          render={({ field }) => (
            <Autocomplete
              options={products}
              getOptionLabel={(opt) => opt.name}
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

        {/* Product Details */}
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

        {/* Rent */}
        <Controller
          name="rent"
          control={control}
          rules={{
            min: { value: 0, message: "Rent must be ≥ 0" },
            valueAsNumber: true,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rent (₹)"
              type="number"
              fullWidth
              error={!!errors.rent}
              helperText={errors.rent?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Staff */}
        <Controller
          name="staff"
          control={control}
          rules={{
            min: { value: 0, message: "Staff must be ≥ 0" },
            valueAsNumber: true,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Number of Staff"
              type="number"
              fullWidth
              error={!!errors.staff}
              helperText={errors.staff?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Raw Water TDS */}
        <Controller
          name="rawWaterTDS"
          control={control}
          rules={{
            min: { value: 0, message: "Raw Water TDS must be ≥ 0" },
            valueAsNumber: true,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Raw Water TDS"
              type="number"
              fullWidth
              error={!!errors.rawWaterTDS}
              helperText={errors.rawWaterTDS?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Warranty */}
        <Controller
          name="warranty"
          control={control}
          rules={{
            min: { value: 0, message: "Warranty must be ≥ 0" },
            valueAsNumber: true,
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

        {/* Service Period */}
        <Controller
          name="servicePeriodDays"
          control={control}
          rules={{
            min: { value: 0, message: "Service Period must be ≥ 0" },
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

        {/* Date of Sale */}
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

        {/* Install Date */}
        <Controller
          name="installDate"
          control={control}
          rules={{ required: "Install Date is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Install Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.installDate}
              helperText={errors.installDate?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Deposit */}
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

        {/* Installation Cost */}
        <Controller
          name="installationCost"
          control={control}
          rules={{
            min: { value: 0, message: "Installation Cost must be ≥ 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Installation Cost (₹)"
              type="number"
              fullWidth
              error={!!errors.installationCost}
              helperText={errors.installationCost?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Refer By */}
        <Controller
          name="referBy"
          control={control}
          rules={{ required: "Refer By is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Refer By"
              fullWidth
              error={!!errors.referBy}
              helperText={errors.referBy?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Install By */}
        <Controller
          name="installBy"
          control={control}
          rules={{ required: "Install By is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Install By"
              fullWidth
              error={!!errors.installBy}
              helperText={errors.installBy?.message}
              sx={inputStyles}
            />
          )}
        />

        {/* Action Buttons (full width) */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
          <Button onClick={() => navigate(-1)} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || isPending}
            startIcon={!isSubmitting && !isPending && <FaSave />}
          >
            {(isSubmitting || isPending) && (
              <CircularProgress size={20} color="inherit" />
            )}
            {!(isSubmitting || isPending) && "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
