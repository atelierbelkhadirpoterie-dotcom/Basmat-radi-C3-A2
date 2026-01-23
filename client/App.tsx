import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Arabic Pages
import ArCause from "./pages/Ar/Cause";
import ArNeeds from "./pages/Ar/Needs";
import ArDonate from "./pages/Ar/Donate";

// English Pages
import EnCause from "./pages/En/Cause";
import EnNeeds from "./pages/En/Needs";
import EnDonate from "./pages/En/Donate";

// French Pages
import FrCause from "./pages/Fr/Cause";
import FrNeeds from "./pages/Fr/Needs";
import FrDonate from "./pages/Fr/Donate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Arabic Routes */}
          <Route path="/ar/cause" element={<ArCause />} />
          <Route path="/ar/needs" element={<ArNeeds />} />
          <Route path="/ar/donate" element={<ArDonate />} />

          {/* English Routes */}
          <Route path="/en/cause" element={<EnCause />} />
          <Route path="/en/needs" element={<EnNeeds />} />
          <Route path="/en/donate" element={<EnDonate />} />

          {/* French Routes */}
          <Route path="/fr/cause" element={<FrCause />} />
          <Route path="/fr/needs" element={<FrNeeds />} />
          <Route path="/fr/donate" element={<FrDonate />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
