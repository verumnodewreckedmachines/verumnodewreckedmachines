import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import VerumDashboard from "@/pages/verum-dashboard";
import AIConsole from "@/pages/ai-console";
import VerumAIChat from "@/pages/openai-chat";
import ClaudeChat from "@/pages/claude-chat";
import PublicDemo from "@/pages/public-demo";
import Terminal from "@/pages/terminal";
import OfficeSuite from "@/pages/office-suite";
import DevTools from "@/pages/dev-tools";
import Security from "@/pages/security";
import SystemMonitor from "@/pages/system-monitor";
import SystemHealth from "@/pages/system-health";
import NodeStore from "@/pages/node-store";
import MediaAnalyzer from "@/components/MediaAnalyzer";
import AppleIntegration from "@/pages/apple-integration";
import IntelPack from "@/pages/intel-pack";
import FigmaAssets from "@/pages/figma-assets";
import TransformShowcase from "@/pages/transform-showcase";
import TransformDemo from "@/pages/transform-demo";
import VirtualComputer from "@/pages/virtual-computer";
import FigmaShowcase from "@/pages/figma-showcase";
import MacIntegration from "@/pages/mac-integration";
import CopyrightInfo from "@/pages/copyright-info";
import Alerts from "@/pages/alerts";
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
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-[#0f0f0f] text-white">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
