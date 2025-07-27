import { Navigate } from "react-router-dom";

import { checkIsLoggedIn, useToken } from "../../lib/utils/auth";

export function ProtectedRoute({ children, redirectPath = "/" }) {
  const { removeToken } = useToken();
  const isAuthorized = checkIsLoggedIn();
  if (!isAuthorized) removeToken();
  if (!isAuthorized) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
