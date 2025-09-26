import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Mic, MessageSquare, ArrowLeft } from "lucide-react";
import { TextChat } from "./TextChat";
import { VoiceCall } from "./VoiceCall";

type ViewMode = "button" | "selector" | "text" | "voice";

export function FloatingChatButton() {
  const [viewMode, setViewMode] = useState<ViewMode>("button");

  const handleButtonClick = () => {
    if (viewMode === "button") {
      setViewMode("selector");
    } else {
      setViewMode("button");
    }
  };

  const handleOptionSelect = (mode: "text" | "voice") => {
    setViewMode(mode);
  };

  const handleBackToSelector = () => {
    setViewMode("selector");
  };

  const handleBackToButton = () => {
    setViewMode("button");
  };

  const renderContent = () => {
    switch (viewMode) {
      case "text":
        return (
          <div className="w-80 h-80">
            <TextChat onBack={handleBackToSelector} />
          </div>
        );
      case "voice":
        return (
          <div className="w-80 h-80">
            <VoiceCall onBack={handleBackToSelector} />
          </div>
        );
      case "selector":
        return (
          <div className="w-72 p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">How would you like to connect with an agent?</h3>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => handleOptionSelect("voice")}
                className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                size="lg"
              >
                <Mic className="mr-3 h-5 w-5" />
                Voice chat
              </Button>
              <Button
                onClick={() => handleOptionSelect("text")}
                variant="outline"
                className="w-full h-12 rounded-full border-2 font-medium hover:bg-accent"
                size="lg"
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Text chat
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Main floating button */}
      <Button
        onClick={handleButtonClick}
        className="h-14 w-14 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-110"
        size="icon"
      >
        {viewMode === "button" ? (
          <MessageCircle className="h-6 w-6" />
        ) : (
          <X className="h-6 w-6" onClick={handleBackToButton} />
        )}
      </Button>

      {/* Expandable content */}
      {viewMode !== "button" && (
        <div className="absolute bottom-16 right-0 bg-card border rounded-2xl shadow-xl animate-in slide-in-from-bottom-2 p-2">
          {renderContent()}
        </div>
      )}
    </div>
  );
}