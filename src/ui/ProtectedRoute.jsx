import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-gray-50);
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  // 1. Load The authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2. If the user is not logged in redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, navigate, isAuthenticated]);

  // 3. While loading , show a spinner
  if (isLoading) return <Spinner />;

  // 4. If there is a user, render
  if (isAuthenticated) return <FullPage>{children}</FullPage>;
}

export default ProtectedRoute;
