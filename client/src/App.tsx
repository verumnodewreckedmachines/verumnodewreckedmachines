import { Switch, Route } from "wouter";
import { useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ParticleBackground } from "@/components/ui/particle-background";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard-new";
import VerumDashboard from "@/pages/verum-dashboard";
import Terminal from "@/pages/terminal";
import NodeStore from "@/pages/node-store";
import OfficeSuite from "@/pages/office-suite";
import DevTools from "@/pages/dev-tools";
import Security from "@/pages/security";
import SystemMonitor from "@/pages/system-monitor";
import SystemHealth from "@/pages/system-health";
import AIConsole from "@/pages/ai-console";
import VerumAIChat from "@/pages/openai-chat";
import MediaAnalyzer from "@/components/MediaAnalyzer";
import ClaudeChat from "@/pages/claude-chat";
import AppleIntegration from "@/pages/apple-integration";
import IntelPack from "@/pages/intel-pack";
import FigmaAssets from "@/pages/figma-assets";
import PublicDemo from "@/pages/public-demo";
import TransformShowcase from "@/pages/transform-showcase";
import TransformDemo from "@/pages/transform-demo";
import VirtualComputer from "@/pages/virtual-computer";
import FigmaShowcase from "@/pages/figma-showcase";
import MacIntegration from "@/pages/mac-integration";
import CopyrightInfo from "@/pages/copyright-info";
import Alerts from "@/pages/alerts";
import Login from "@/pages/login";
import Config from "@/pages/config";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VerumDashboard} />
      <Route path="/dashboard-old" component={Dashboard} />
      <Route path="/ai-console" component={VerumAIChat} />
      <Route path="/ai-operations" component={AIConsole} />
      <Route path="/claude-chat" component={ClaudeChat} />
      <Route path="/verum-ai" component={VerumAIChat} />
      <Route path="/openai-chat" component={VerumAIChat} />
      <Route path="/apple-integration" component={AppleIntegration} />
      <Route path="/intel-pack" component={IntelPack} />
      <Route path="/figma-assets" component={FigmaAssets} />
      <Route path="/terminal" component={Terminal} />
      <Route path="/node-store" component={NodeStore} />
      <Route path="/office-suite" component={OfficeSuite} />
      <Route path="/dev-tools" component={DevTools} />
      <Route path="/security" component={Security} />
      <Route path="/system-monitor" component={SystemMonitor} />
      <Route path="/system-health" component={SystemHealth} />
      <Route path="/public-demo" component={PublicDemo} />
      <Route path="/transform-showcase" component={TransformShowcase} />
      <Route path="/transform-demo" component={TransformDemo} />
      <Route path="/virtual-computer" component={VirtualComputer} />
      <Route path="/media-analyzer" component={MediaAnalyzer} />
      <Route path="/figma-showcase" component={FigmaShowcase} />
      <Route path="/mac-integration" component={MacIntegration} />
      <Route path="/copyright-info" component={CopyrightInfo} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/config" component={Config} />
      <Route path="/chat" component={VerumAIChat} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isPublicDemo = window.location.pathname === "/public-demo";
  const isLocalChatPreview = import.meta.env.DEV &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  useEffect(() => {
    if (isPublicDemo || isLocalChatPreview) {
      setIsAuthenticated(true);
      return;
    }

    fetch("/api/auth/me", { credentials: "include" })
      .then(response => setIsAuthenticated(response.ok))
      .catch(() => setIsAuthenticated(false));
  }, [isLocalChatPreview, isPublicDemo]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isPublicDemo || isLocalChatPreview ? (
          <div className="min-h-screen bg-[#0f0f0f] text-white">
            <Router />
          </div>
        ) : isAuthenticated === null ? (
          <div className="min-h-screen bg-[#0f0f0f] text-white" />
        ) : isAuthenticated ? (
          <div className="min-h-screen bg-[#0f0f0f] text-white">
            <Router />
          </div>
        ) : (
          <Login onAuthenticated={() => setIsAuthenticated(true)} />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
