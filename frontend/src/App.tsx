import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3AuthProvider } from "@/contexts/Web3AuthContext";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import AssessmentResults from "./pages/AssessmentResults";
import Programs from "./pages/Programs";
import Coach from "./pages/Coach";
import Courses from "./pages/Courses";
import Mentors from "./pages/Mentors";
import Analytics from "./pages/Analytics";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Tracker from "./pages/Tracker";
import Profile from "./pages/Profile";

const App = () => (
  <Web3AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* All routes - wallet connection handled at component level */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/results" element={<AssessmentResults />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Web3AuthProvider>
);

export default App;
