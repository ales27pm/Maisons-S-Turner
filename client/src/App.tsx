import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import { ScrollToTop } from "@/components/ScrollToTop";

// ScrollToTop component logic needs to be a real component or just a useEffect
// I'll make a small inline component for it here since it wasn't generated separately
function ScrollHandler() {
  const { useEffect } =  require("react");
  const { useLocation } = require("wouter");
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollHandler />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Portfolio} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
