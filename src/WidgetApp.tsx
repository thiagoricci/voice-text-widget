import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FloatingChatButton } from "@/components/FloatingChatButton";

const queryClient = new QueryClient();

const WidgetApp = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FloatingChatButton />
    </TooltipProvider>
  </QueryClientProvider>
);

export default WidgetApp;