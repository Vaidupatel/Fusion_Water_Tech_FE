import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "../../context/SnackbarContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useGetCustomerTypeList } from "../../lib/hooks/customerType/useGetCustomerTypeList.js";
import { useDeleteCustomerType } from "../../lib/hooks/customerType/useDeleteCustomerType.js";
import CustomModal from "../../components/comman/CustomModal.jsx";

export default function CustomerTypeList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [customerTypes, setCustomerType] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data: resp, isLoading, isError, error } = useGetCustomerTypeList();
  const { mutate: deleteCustomerType } = useDeleteCustomerType();

  useEffect(() => {
    if (resp) setCustomerType(resp);
  }, [resp]);

  useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
  }, [isError]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteCustomerType(selectedId, {
      onSuccess: () => {
        showSnackbar("Customer type deleted successfully", "success");
        setConfirmOpen(false);
        setSelectedId(null);
      },
      onError: (err) => {
        showSnackbar(
          err?.response?.data?.error || err?.response?.data?.message,
          "error"
        );
      },
    });
  };

  return (
    <div
      className={`p-4 min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Customer Types</h1>
        <button
          onClick={() => navigate("/admin/customer-type/new")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Type
        </button>
      </div>

      <div
        className={`shadow rounded overflow-hidden ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        {customerTypes?.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No customer types found
          </div>
        ) : (
          <table className="w-full table-auto">
            <thead className={isDark ? "bg-gray-700" : "bg-gray-200"}>
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-right px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerTypes.map((type) => (
                <tr
                  key={type._id}
                  className={`border-b ${
                    isDark ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <td className="px-4 py-2">{type.name}</td>
                  <td className="px-4 py-2 text-right">
                    <ButtonGroup variant="outlined">
                      <Button
                        onClick={() =>
                          navigate(`/admin/customer-type/${type._id}`)
                        }
                        title="Edit"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        onClick={() => handleDelete(type._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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
            Are you sure you want to delete this customer type?
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
              color="error"
              variant="contained"
              sx={{
                backgroundColor: isDark ? "#b91c1c" : undefined,
                "&:hover": {
                  backgroundColor: isDark ? "#991b1b" : undefined,
                },
              }}
            >
              Yes, Delete
            </Button>
          </>
        }
      />
    </div>
  );
}
