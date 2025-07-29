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
      address: "",
      customerType: null,
      product: null,
      servicePeriodDays: 0,
    },
  });

  useEffect(() => {
    if (!customerData || !customerTypes || !products) return;
    reset({
      name: customerData.name || "",
      mobilePrimary: customerData.mobilePrimary || "",
      address: customerData.address || "",
      customerType:
        customerTypes.find(
          (type) => type._id === customerData?.customerType?._id
        ) || null,
      product:
        products.find((prod) => prod._id === customerData?.product?._id) ||
        null,
      servicePeriodDays: customerData?.servicePeriodDays || 0,
    });
  }, [customerData, customerTypes, products]);

  const onSubmit = (formData) => {
    updateCustomer(
      {
        id,
        body: {
          ...formData,
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

        {/* Mobile Field */}
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

        {/* Customer Type Autocomplete */}
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

        {/* Product Autocomplete */}
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

        {/* Service Period Days Field */}
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
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
