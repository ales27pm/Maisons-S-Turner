import { Switch, Route } from "wouter";
import { ScrollToTop } from "@/components/ScrollToTop";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Realisations from "@/pages/Realisations";
import RendezVous from "@/pages/RendezVous";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/realisations" component={Realisations} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/rendez-vous" component={RendezVous} />
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
