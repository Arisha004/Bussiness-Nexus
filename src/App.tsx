
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";
import InvestorProfile from "./pages/InvestorProfile";
import EntrepreneurProfile from "./pages/EntrepreneurProfile";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Make sure to define App as a proper function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<Index />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Dashboard Routes */}
              <Route 
                path="/dashboard/investor" 
                element={
                  <ProtectedRoute requiredRole="investor">
                    <InvestorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/entrepreneur" 
                element={
                  <ProtectedRoute requiredRole="entrepreneur">
                    <EntrepreneurDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Profile Routes */}
              <Route path="/profile/investor/:id" element={<InvestorProfile />} />
              <Route path="/profile/entrepreneur/:id" element={<EntrepreneurProfile />} />
              
              {/* Messages Routes */}
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:id" element={<Messages />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
