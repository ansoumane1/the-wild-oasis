import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* Query dev tools */}
        <ReactQueryDevtools />
        {/* Global styles */}
        <GlobalStyles />
        {/* Router setup */}
        <BrowserRouter>
          <Routes>
            {/* Main app layout */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Redirect to dashboard */}
              <Route index element={<Navigate replace to="/dashboard" />} />
              {/* Dashboard route */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Bookings route */}
              <Route path="/bookings" element={<Bookings />} />
              {/* Bookings route */}
              <Route path="/bookings/:bookingId" element={<Booking />} />
              {/* Checkin route */}
              <Route path="/checkin/:bookingId" element={<Checkin />} />
              {/* Cabins route */}
              <Route path="/cabins" element={<Cabins />} />
              {/* Users route */}
              <Route path="/users" element={<Users />} />
              {/* Settings route */}
              <Route path="/settings" element={<Settings />} />
              {/* Account route */}
              <Route path="/account" element={<Account />} />
            </Route>
            {/* Login route */}
            <Route path="/login" element={<Login />} />
            {/* 404 route */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
export default App;
