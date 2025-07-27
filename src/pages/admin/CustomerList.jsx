import { Button, ButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../components/comman/CustomModal.jsx";
import { useSnackbar } from "../../context/SnackbarContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useDeleteCustomer } from "../../lib/hooks/customer/useDeleteCustomer.js";
import { useGetCustomerList } from "../../lib/hooks/customer/useGetCustomerList.js";

export default function CustomerList() {
  const { showSnackbar } = useSnackbar();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const { data: resp, isLoading, isError, error } = useGetCustomerList();
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

  const [customers, setCustomers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (resp?.data) setCustomers(resp.data);
  }, [resp]);

  useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
  }, [isError]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteCustomer(selectedId, {
      onSuccess: () => {
        showSnackbar("Customer deleted successfully", "success");
        setCustomers((prev) => prev.filter((c) => c._id !== selectedId));
        setConfirmOpen(false);
        setSelectedId(null);
      },
      onError: (err) => {
        showSnackbar(
          err?.response?.data?.message || "Failed to delete customer",
          "error"
        );
      },
    });
  };

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } h-full p-4`}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <button
          onClick={() => navigate("/admin/customers/new")}
          className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          <FaPlus className="mr-2" /> Add Customer
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
      ) : customers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl">No customers found</p>
          <p className="mt-2 text-gray-500">
            Click "Add Customer" to create one.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div
            className={`hidden md:grid md:grid-cols-8 gap-2 px-4 py-2 font-medium border-b ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div>Name</div>
            <div>Mobile</div>
            <div>Type</div>
            <div>Deposit (₹)</div>
            <div>Service Period (d)</div>
            <div>Date of Sale</div>
            <div>Total Cost</div>
            <div>Actions</div>
          </div>

          {customers.map((c) => (
            <div
              key={c._id}
              className={`grid grid-cols-1 md:grid-cols-8 gap-2 p-4 border-b hover:${
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
                <span className="md:hidden font-semibold">Type: </span>
                {c.customerType?.name}
              </div>
              <div>
                <span className="md:hidden font-semibold">Deposit: </span>₹
                {c.deposit.toFixed(2)}
              </div>
              <div>
                <span className="md:hidden font-semibold">
                  Service Period:{" "}
                </span>
                {c.servicePeriodDays} d
              </div>
              <div>
                <span className="md:hidden font-semibold">Date of Sale: </span>
                {dayjs(c.dateOfSale).format("DD-MM-YYYY")}
              </div>
              <div>
                <span className="md:hidden font-semibold">Total Cost: </span>₹
                {(c.totalCost || 0).toFixed(2)}
              </div>
              <div className="flex space-x-2 justify-start md:justify-center">
                <ButtonGroup variant="outlined">
                  <Button
                    onClick={() =>
                      navigate(`/admin/customers/${c._id}/details`)
                    }
                    title="View"
                  >
                    <FaEye />
                  </Button>
                  <Button
                    onClick={() => navigate(`/admin/customers/${c._id}`)}
                    title="Edit"
                  >
                    <FaEdit />
                  </Button>
                  <Button onClick={() => handleDelete(c._id)} title="Delete">
                    <FaTrash />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <CustomModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        header={
          <span
            className={`text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Delete Confirmation
          </span>
        }
        body={
          <div
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Are you sure you want to delete this customer?
          </div>
        }
        footer={
          <>
            <Button
              onClick={() => setConfirmOpen(false)}
              className={`px-4 py-2 rounded ${
                isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
              }`}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              disabled={isDeleting}
              color="error"
              variant="contained"
              sx={{
                backgroundColor: isDark ? "#b91c1c" : undefined,
                "&:hover": {
                  backgroundColor: isDark ? "#991b1b" : undefined,
                },
              }}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </>
        }
      />
    </div>
  );
}
