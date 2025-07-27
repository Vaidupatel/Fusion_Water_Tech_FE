import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "../components/AdminLayout/index.jsx";
import { ThemeProvider } from "../context/ThemeContext";
import Landing from "../pages/Landing.jsx";
import CreateCustomer from "../pages/admin/CreateCustomer.jsx";
import CreateCustomerType from "../pages/admin/CreateCustomerType.jsx";
import CreateProduct from "../pages/admin/CreateProduct.jsx";
import CustomerDetails from "../pages/admin/CustomerDetails.jsx";
import CustomerList from "../pages/admin/CustomerList.jsx";
import CustomerTypeList from "../pages/admin/CustomerTypeList.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import DueServices from "../pages/admin/DueServices.jsx";
import EditCustomer from "../pages/admin/EditCustomer.jsx";
import EditCustomerType from "../pages/admin/EditCustomerType.jsx";
import EditProduct from "../pages/admin/EditProduct.jsx";
import Login from "../pages/admin/Login.jsx";
import ProductList from "../pages/admin/ProductList.jsx";
import AdminRoutes from "./AdminRoutes.jsx";

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        {/* Admin login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin area */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/new" element={<CreateCustomer />} />
            <Route path="customers/:id" element={<EditCustomer />} />
            <Route path="customers/:id/details" element={<CustomerDetails />} />
            {/* <Route path="customers/:id" element={<CustomerForm />} /> */}
            <Route path="due-services" element={<DueServices />} />
            <Route path="customer-type" element={<CustomerTypeList />} />
            <Route path="customer-type/new" element={<CreateCustomerType />} />
            <Route path="customer-type/:id" element={<EditCustomerType />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<CreateProduct />} />
            <Route path="products/:id" element={<EditProduct />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
