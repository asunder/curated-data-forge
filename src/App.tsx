import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QualityMetricsPage from "./pages/QualityMetrics";
import SyntheticDataPage from "./pages/SyntheticData";
import EdgeCaseMiningPage from "./pages/EdgeCaseMining";
import Pipelines from "./pages/Pipelines";
import Documentation from "./pages/Documentation";
import SearchPage from "./pages/Search";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quality" element={<QualityMetricsPage />} />
          <Route path="/synthetic" element={<SyntheticDataPage />} />
          <Route path="/edge-cases" element={<EdgeCaseMiningPage />} />
          <Route path="/pipelines" element={<Pipelines />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;