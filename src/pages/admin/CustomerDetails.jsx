import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "../../context/ThemeContext";
import { useGetCustomerById } from "../../lib/hooks/customer/useGetCustomerById";
import { useGetServiceHistoryById } from "../../lib/hooks/service/useGetServiceHistoryById";

const LabelValue = ({ label, value }) => (
  <div className="flex flex-col gap-1 mb-3">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-base font-medium">{value || "—"}</span>
  </div>
);

export default function CustomerDetails() {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { showSnackbar } = useSnackbar();

  const { data: customer, isLoading, isError, error } = useGetCustomerById(id);

  const {
    data: history,
    isLoading: loadingHistory,
    isError: errorHistory,
    error: historyError,
  } = useGetServiceHistoryById(id);

  React.useEffect(() => {
    if (isError) showSnackbar(error.message, "error");
    if (errorHistory) showSnackbar(historyError.message, "error");
  }, [isError, errorHistory]);

  if (isLoading || loadingHistory) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div
          className={`animate-spin h-10 w-10 border-4 ${
            isDark ? "border-gray-600" : "border-gray-300"
          } border-t-indigo-600 rounded-full`}
        />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center mt-10 text-lg">
        Customer not found or failed to load.
      </div>
    );
  }

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } h-full p-4 rounded-2xl`}
    >
      <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <LabelValue label="Name" value={customer.name} />
        <LabelValue label="Mobile" value={customer.mobilePrimary} />
        <LabelValue label="Secondary Mobile" value={customer.mobileSecondary} />
        <LabelValue label="Address" value={customer.address} />
        <LabelValue label="Customer Type" value={customer.customerType?.name} />
        <LabelValue label="Product" value={customer.product?.name} />
        <LabelValue
          label="Deposit"
          value={`₹${(customer.deposit || 0).toFixed(2)}`}
        />
        <LabelValue
          label="Service Period"
          value={`${customer.servicePeriodDays} days`}
        />
        <LabelValue
          label="Date of Sale"
          value={dayjs(customer.dateOfSale).format("DD-MM-YYYY")}
        />
        <LabelValue
          label="Last Service Date"
          value={
            customer.lastServiceDate
              ? dayjs(customer.lastServiceDate).format("DD-MM-YYYY")
              : "—"
          }
        />
        <LabelValue
          label="Total Cost"
          value={`₹${(customer.totalCost || 0).toFixed(2)}`}
        />
      </div> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <LabelValue label="Name" value={customer.name} />
        <LabelValue label="Mobile" value={customer.mobilePrimary} />
        <LabelValue label="Secondary Mobile" value={customer.mobileSecondary} />
        <LabelValue label="Address" value={customer.address} />
        <LabelValue label="Customer Type" value={customer.customerType?.name} />
        <LabelValue label="Product" value={customer.product?.name} />
        <LabelValue label="Product Details" value={customer.productDetails} />
        <LabelValue label="Refer By" value={customer.referBy} />
        <LabelValue label="Install By" value={customer.installBy} />
        <LabelValue
          label="Install Date"
          value={dayjs(customer.installDate).format("DD-MM-YYYY")}
        />
        <LabelValue label="Staff" value={customer.staff} />
        <LabelValue label="Raw Water TDS" value={customer.rawWaterTDS} />
        <LabelValue label="Warranty" value={`${customer.warranty} days`} />
        <LabelValue
          label="Rent"
          value={`₹${(customer.rent || 0).toFixed(2)}`}
        />
        <LabelValue
          label="Deposit"
          value={`₹${(customer.deposit || 0).toFixed(2)}`}
        />
        <LabelValue
          label="Installation Cost"
          value={`₹${(customer.installationCost || 0).toFixed(2)}`}
        />
        <LabelValue
          label="Service Period"
          value={`${customer.servicePeriodDays} days`}
        />
        <LabelValue
          label="Date of Sale"
          value={dayjs(customer.dateOfSale).format("DD-MM-YYYY")}
        />
        <LabelValue
          label="Last Service Date"
          value={
            customer.lastServiceDate
              ? dayjs(customer.lastServiceDate).format("DD-MM-YYYY")
              : "—"
          }
        />
        <LabelValue
          label="Total Cost"
          value={`₹${(customer.totalCost || 0).toFixed(2)}`}
        />
        <LabelValue
          label="Created At"
          value={dayjs(customer.createdAt).format("DD-MM-YYYY")}
        />
        <LabelValue
          label="Updated At"
          value={dayjs(customer.updatedAt).format("DD-MM-YYYY")}
        />
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Service History</h3>

      {history?.length > 0 ? (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full text-sm">
            <thead
              className={`${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Technician</th>
                <th className="p-3 text-left">Cost</th>
                <th className="p-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr
                  key={entry._id}
                  className={`border-t ${
                    isDark
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  <td className="p-3">
                    {dayjs(entry.serviceDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="p-3 capitalize">{entry.serviceType}</td>
                  <td className="p-3">{entry.technician}</td>
                  <td className="p-3">₹{entry.cost.toFixed(2)}</td>
                  <td className="p-3">{entry.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No service history available.</p>
      )}
    </div>
  );
}
