import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navigation } from "@/components/Navigation";
import Dashboard from "./pages/Dashboard";
import SignalsChat from "./pages/SignalsChat";
import Strategies from "./pages/Strategies";
import Creator from "./pages/Creator";
import Terms from "./pages/Terms";
import Football from "./pages/Football";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signals" element={<SignalsChat />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/football" element={<Football />} />
            <Route path="/painel" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
