import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mic } from "lucide-react";
import { TextChat } from "./TextChat";
import { VoiceCall } from "./VoiceCall";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ChatMode = "selection" | "text" | "voice";

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [mode, setMode] = useState<ChatMode>("selection");

  const handleClose = () => {
    setMode("selection");
    onClose();
  };

  const renderContent = () => {
    switch (mode) {
      case "text":
        return <TextChat onBack={() => setMode("selection")} />;
      case "voice":
        return <VoiceCall onBack={() => setMode("selection")} />;
      default:
        return (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-6">How would you like to chat?</h2>
            <div className="space-y-4">
              <Button
                onClick={() => setMode("text")}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Text Conversation
              </Button>
              <Button
                onClick={() => setMode("voice")}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                size="lg"
              >
                <Mic className="mr-2 h-5 w-5" />
                Voice Call
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}