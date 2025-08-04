import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useGetCustomerById } from "../../lib/hooks/customer/useGetCustomerById";
import { useUpdateCustomer } from "../../lib/hooks/customer/useUpdateCustomer";
import { useGetCustomerTypeList } from "../../lib/hooks/customerType/useGetCustomerTypeList";
import { useGetProductList } from "../../lib/hooks/product/useGetProductList";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { showSnackbar } = useSnackbar();
  const isDark = theme === "dark";
  const [customer, setCustomer] = useState();
  const [products, setProducts] = useState([]);
  const [customerTypes, setCustomerType] = useState([]);

  const {
    data: customerData,
    isLoading: isLoadingCustomer,
    error: customerError,
  } = useGetCustomerById(id);

  const { data: customerTypesData } = useGetCustomerTypeList();
  const { data: productsData } = useGetProductList();
  const { mutate: updateCustomer, isPending } = useUpdateCustomer();

  useEffect(() => {
    if (customerData) setCustomer(customerData);
  }, [customerData]);

  useEffect(() => {
    if (customerTypesData) setCustomerType(customerTypesData);
  }, [customerTypesData]);

  useEffect(() => {
    if (productsData) setProducts(productsData);
  }, [productsData]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      mobilePrimary: "",
      mobileSecondary: "",
      address: "",
      customerType: null,
      product: null,
      servicePeriodDays: 0,
      rent: 0,
      installDate: new Date(),
      installationCost: 0,
      installBy: "",
      referBy: "",
      staff: 0,
      rawWaterTDS: 0,
      productDetails: "",
      dateOfSale: new Date(),
      warranty: 0,
      deposit: 0,
    },
  });

  useEffect(() => {
    if (!customerData || !customerTypes || !products) return;
    reset({
      name: customerData.name || "",
      mobilePrimary: customerData.mobilePrimary || "",
      mobileSecondary: customerData.mobileSecondary || "",
      address: customerData.address || "",
      customerType:
        customerTypes.find(
          (type) => type._id === customerData?.customerType?._id
        ) || null,
      product:
        products.find((prod) => prod._id === customerData?.product?._id) ||
        null,
      servicePeriodDays: customerData?.servicePeriodDays || 0,
      rent: customerData?.rent || 0,
      installDate: customerData?.installDate
        ? customerData.installDate.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      installationCost: customerData?.installationCost || 0,
      installBy: customerData?.installBy || "",
      referBy: customerData?.referBy || "",
      staff: customerData?.staff || 0,
      rawWaterTDS: customerData?.rawWaterTDS || 0,
      productDetails: customerData?.productDetails || "",
      dateOfSale: customerData?.dateOfSale
        ? customerData.dateOfSale.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      warranty: customerData?.warranty || 0,
      deposit: customerData?.deposit || 0,
    });
  }, [customerData, customerTypes, products]);

  const onSubmit = (formData) => {
    updateCustomer(
      {
        id,
        body: {
          ...formData,
          installDate: new Date(formData.installDate).toISOString(),
          dateOfSale: new Date(formData.dateOfSale).toISOString(),
          customerType: formData.customerType?._id,
          product: formData.product?._id,
        },
      },
      {
        onSuccess: () => {
          showSnackbar("Customer updated successfully", "success");
          navigate("/admin/customers");
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.error ||
              err?.response?.data?.message ||
              "Failed to update customer",
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

  if (isLoadingCustomer) {
    return (
      <div className="p-6 text-center">
        <CircularProgress />
      </div>
    );
  }

  if (customerError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load customer. Please try again.
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">Edit Customer</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name Field */}
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

        {/* Address Field */}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              multiline
              rows={3}
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Primary Mobile */}
        <Controller
          name="mobilePrimary"
          control={control}
          rules={{
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit number",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Mobile Number"
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
              fullWidth
              error={!!errors.mobileSecondary}
              helperText={errors.mobileSecondary?.message}
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

        {/* Product */}
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
          rules={{ required: "Rent is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Rent (₹)"
              fullWidth
              error={!!errors.rent}
              helperText={errors.rent?.message}
              sx={inputStyles}
              type="number"
            />
          )}
        />

        {/* Staff */}
        <Controller
          name="staff"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Staff Count"
              type="number"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Raw Water TDS */}
        <Controller
          name="rawWaterTDS"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Raw Water TDS"
              type="number"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Warranty */}
        <Controller
          name="warranty"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Warranty (in days)"
              type="number"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Service Period Days */}
        <Controller
          name="servicePeriodDays"
          control={control}
          rules={{
            required: "Service Period Days is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Service Period"
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
          rules={{ required: "Date of sale is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Sale"
              type="date"
              fullWidth
              error={!!errors.dateOfSale}
              helperText={errors.dateOfSale?.message}
              sx={inputStyles}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />

        {/* Install Date */}
        <Controller
          name="installDate"
          control={control}
          rules={{ required: "Install date is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Install Date"
              type="date"
              fullWidth
              error={!!errors.installDate}
              helperText={errors.installDate?.message}
              sx={inputStyles}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />

        {/* Deposit */}
        <Controller
          name="deposit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Deposit (₹)"
              type="number"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Installation Cost */}
        <Controller
          name="installationCost"
          control={control}
          rules={{ required: "Installation cost is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Installation Cost (₹)"
              fullWidth
              type="number"
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
          render={({ field }) => (
            <TextField
              {...field}
              label="Referred By"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Install By */}
        <Controller
          name="installBy"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Installed By"
              fullWidth
              sx={inputStyles}
            />
          )}
        />

        {/* Action Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
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
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
