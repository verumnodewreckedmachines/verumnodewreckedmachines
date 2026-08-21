import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard-new";
import Terminal from "@/pages/terminal";
import NodeStore from "@/pages/node-store";
import OfficeSuite from "@/pages/office-suite";
import DevTools from "@/pages/dev-tools";
import Security from "@/pages/security";
import SystemMonitor from "@/pages/system-monitor";
import AIConsole from "@/pages/ai-console";
import PublicDemo from "@/pages/public-demo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/terminal" component={Terminal} />
      <Route path="/node-store" component={NodeStore} />
      <Route path="/office-suite" component={OfficeSuite} />
      <Route path="/dev-tools" component={DevTools} />
      <Route path="/security" component={Security} />
      <Route path="/system-monitor" component={SystemMonitor} />
      <Route path="/ai-console" component={AIConsole} />
      <Route path="/public-demo" component={PublicDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex bg-verum-dark text-white font-inter overflow-hidden">
          <ParticleBackground />
          
          {/* Floating Assistant */}
          <div className="fixed bottom-6 right-6 glass-effect rounded-full p-4 animate-float cursor-pointer hover:scale-110 transition-transform z-50">
            <i className="fas fa-robot text-verum-cyan text-xl"></i>
          </div>
          
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <TopBar />
            <Router />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
