import { Autocomplete, Button, ButtonGroup, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CiSquareCheck } from "react-icons/ci";
import CustomModal from "../../components/comman/CustomModal";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useGetCustomerList } from "../../lib/hooks/customer/useGetCustomerList";
import { useCompletesSrvice } from "../../lib/hooks/service/useCompletesSrvice";
import { useGetDueCustomerList } from "../../lib/hooks/service/useGetDueCustomerList";
import { FaPlus } from "react-icons/fa";

const DueServices = () => {
  const { data: resp, isLoading, isError, error } = useGetDueCustomerList();
  const { data: allCustResp, isLoading: loadingCustomers } =
    useGetCustomerList();
  const { mutate: markService, isPending } = useCompletesSrvice();

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { showSnackbar } = useSnackbar();

  const [dueCustomers, setDueCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addLogOpen, setAddLogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      technician: "",
      notes: "",
      cost: "",
      serviceDate: dayjs().format("YYYY-MM-DD"),
    },
  });

  const {
    control: addControl,
    handleSubmit: addHandleSubmit,
    formState: { errors: addErrors },
    reset: addReset,
  } = useForm({
    defaultValues: {
      customer: null,
      technician: "",
      notes: "",
      cost: "",
      serviceDate: dayjs().format("YYYY-MM-DD"),
    },
  });

  useEffect(() => {
    if (resp?.data) setDueCustomers(resp.data);
  }, [resp]);

  useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
  }, [isError]);

  // --- handlers

  const onSubmit = (data) => {
    if (!selectedCustomer?._id) return;
    markService(
      { id: selectedCustomer._id, data },
      {
        onSuccess: () => {
          showSnackbar("Service marked as completed", "success");
          setDueCustomers((prev) =>
            prev.filter((c) => c._id !== selectedCustomer._id)
          );
          setModalOpen(false);
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || "Failed to complete service",
            "error"
          );
        },
      }
    );
  };

  const onAddLog = (data) => {
    if (!data.customer?._id) return;
    markService(
      { id: data.customer._id, data },
      {
        onSuccess: () => {
          showSnackbar("Service log added", "success");
          setAddLogOpen(false);
        },
        onError: (err) => {
          showSnackbar(
            err?.response?.data?.message || "Failed to add log",
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
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } h-full p-4 rounded-2xl`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Due Services</h1>
        <button
          onClick={() => {
            addReset();
            setAddLogOpen(true);
          }}
          className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          <FaPlus className="mr-2" /> Add Service Log
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
      ) : dueCustomers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl">No due services</p>
          <p className="mt-2 text-gray-500">All customers are up to date.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div
            className={`hidden md:grid md:grid-cols-6 gap-2 px-4 py-2 font-medium border-b ${
              isDark ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
            }`}
          >
            <div>Name</div>
            <div>Mobile</div>
            <div>Address</div>
            <div>Service Period</div>
            <div>Next Service Date</div>
            <div className="text-right">Actions</div>
          </div>

          {dueCustomers.map((c) => (
            <div
              key={c._id}
              className={`grid grid-cols-1 md:grid-cols-6 gap-2 p-4 border-b ${
                isDark
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-200"
              }`}
            >
              <div>
                <span className="md:hidden font-semibold">Name: </span>
                {c.name}
              </div>
              <div>
                <span className="md:hidden font-semibold">Mobile: </span>
                {c.mobilePrimary}
              </div>
              <div>
                <span className="md:hidden font-semibold">Address: </span>
                {c.address}
              </div>
              <div>
                <span className="md:hidden font-semibold">Period: </span>
                {c.servicePeriodDays} d
              </div>
              <div>
                <span className="md:hidden font-semibold">Next Date: </span>
                {dayjs(c.nextServiceDate).format("DD-MM-YYYY")}
              </div>
              <div className="text-right">
                <ButtonGroup variant="outlined">
                  <Button
                    onClick={() => {
                      setSelectedCustomer(c);
                      setModalOpen(true);
                      reset();
                    }}
                    title="Mark Complete"
                  >
                    <CiSquareCheck />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Complete Service for a due customer */}
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        header={
          <span
            className={`text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Complete Service for "{selectedCustomer?.name}"
          </span>
        }
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-4"
          >
            {/* Technician */}
            <Controller
              name="technician"
              control={control}
              rules={{ required: "Technician name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Technician *"
                  fullWidth
                  error={!!errors.technician}
                  helperText={errors.technician?.message}
                  sx={inputStyles}
                />
              )}
            />

            {/* Notes */}
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  sx={inputStyles}
                />
              )}
            />

            {/* Cost */}
            <Controller
              name="cost"
              control={control}
              rules={{ required: "Cost is required", valueAsNumber: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Cost *"
                  fullWidth
                  error={!!errors.cost}
                  helperText={errors.cost?.message}
                  sx={inputStyles}
                />
              )}
            />

            {/* Service Date */}
            <Controller
              name="serviceDate"
              control={control}
              rules={{ required: "Service Date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Service Date *"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.serviceDate}
                  helperText={errors.serviceDate?.message}
                  sx={inputStyles}
                />
              )}
            />

            <div className="flex justify-end gap-2 mt-2">
              <Button
                onClick={() => setModalOpen(false)}
                className={`px-4 py-2 rounded ${
                  isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                }`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                sx={{
                  backgroundColor: isDark ? "#166534" : undefined,
                  "&:hover": {
                    backgroundColor: isDark ? "#14532d" : undefined,
                  },
                }}
              >
                {isPending ? "Submitting..." : "Mark Complete"}
              </Button>
            </div>
          </form>
        }
      />

      {/* Modal: Add Service Log for any customer */}
      <CustomModal
        open={addLogOpen}
        onClose={() => setAddLogOpen(false)}
        header={
          <span
            className={`text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Add Service Log
          </span>
        }
        body={
          <form
            onSubmit={addHandleSubmit(onAddLog)}
            className="flex flex-col gap-4 py-4"
          >
            {/* Customer selector */}
            <Controller
              name="customer"
              control={addControl}
              rules={{ required: "Please select a customer" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={allCustResp?.data || []}
                  getOptionLabel={(opt) => opt.name || ""}
                  onChange={(_, val) => field.onChange(val)}
                  value={field.value}
                  disableClearable
                  loading={loadingCustomers}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer *"
                      fullWidth
                      error={!!addErrors.customer}
                      helperText={addErrors.customer?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingCustomers ? (
                              <CircularProgress size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      sx={inputStyles}
                    />
                  )}
                />
              )}
            />

            {/* Technician */}
            <Controller
              name="technician"
              control={addControl}
              rules={{ required: "Technician name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Technician *"
                  fullWidth
                  error={!!addErrors.technician}
                  helperText={addErrors.technician?.message}
                  sx={inputStyles}
                />
              )}
            />

            {/* Notes */}
            <Controller
              name="notes"
              control={addControl}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  sx={inputStyles}
                />
              )}
            />

            {/* Cost */}
            <Controller
              name="cost"
              control={addControl}
              rules={{ required: "Cost is required", valueAsNumber: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Cost *"
                  fullWidth
                  error={!!addErrors.cost}
                  helperText={addErrors.cost?.message}
                  sx={inputStyles}
                />
              )}
            />

            {/* Service Date */}
            <Controller
              name="serviceDate"
              control={addControl}
              rules={{ required: "Service Date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Service Date *"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!addErrors.serviceDate}
                  helperText={addErrors.serviceDate?.message}
                  sx={inputStyles}
                />
              )}
            />

            <div className="flex justify-end gap-2 mt-2">
              <Button
                onClick={() => setAddLogOpen(false)}
                className={`px-4 py-2 rounded ${
                  isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                }`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isPending}
                sx={{
                  backgroundColor: isDark ? "#166534" : undefined,
                  "&:hover": {
                    backgroundColor: isDark ? "#14532d" : undefined,
                  },
                }}
              >
                {isPending ? "Submitting..." : "Add Log"}
              </Button>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default DueServices;
