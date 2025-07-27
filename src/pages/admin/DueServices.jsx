import { Button, ButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiSquareCheck } from "react-icons/ci";
import CustomModal from "../../components/comman/CustomModal";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useCompletesSrvice } from "../../lib/hooks/service/useCompletesSrvice";
import { useGetDueCustomerList } from "../../lib/hooks/service/useGetDueCustomerList";

const DueServices = () => {
  const { data: resp, isLoading, isError, error } = useGetDueCustomerList();
  const { mutate: markService, isPending } = useCompletesSrvice();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { showSnackbar } = useSnackbar();

  const [dueCustomers, setDueCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (resp?.data) setDueCustomers(resp.data);
  }, [resp]);

  useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
  }, [isError]);

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

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } h-full p-4`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Due Services</h1>
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
              isDark ? "bg-gray-800" : "bg-gray-100"
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
              className={`grid grid-cols-1 md:grid-cols-6 gap-2 p-4 border-b hover:${
                isDark ? "bg-gray-700" : "bg-gray-50"
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

      {/* Custom Modal for Service Completion */}
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
            className={`flex flex-col gap-4 py-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <div className="flex flex-col">
              <label className="font-medium mb-1">Technician *</label>
              <input
                {...register("technician", { required: true })}
                type="text"
                className="p-2 rounded border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Notes</label>
              <textarea
                {...register("notes")}
                rows={3}
                className="p-2 rounded border border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Cost *</label>
              <input
                {...register("cost", { required: true, valueAsNumber: true })}
                type="number"
                step="0.01"
                className="p-2 rounded border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Service Date *</label>
              <input
                {...register("serviceDate", { required: true })}
                type="date"
                className="p-2 rounded border border-gray-300"
                required
              />
            </div>
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
    </div>
  );
};

export default DueServices;
