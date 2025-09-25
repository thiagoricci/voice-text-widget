import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff, Phone, PhoneOff } from "lucide-react";

interface VoiceCallProps {
  onBack: () => void;
}

type CallState = "idle" | "connecting" | "connected" | "ended";

export function VoiceCall({ onBack }: VoiceCallProps) {
  const [callState, setCallState] = useState<CallState>("idle");
  const [isMuted, setIsMuted] = useState(false);

  const startCall = () => {
    setCallState("connecting");
    // Simulate connection
    setTimeout(() => {
      setCallState("connected");
    }, 2000);
  };

  const endCall = () => {
    setCallState("ended");
    setTimeout(() => {
      setCallState("idle");
    }, 1500);
  };

  const getCallStateText = () => {
    switch (callState) {
      case "connecting":
        return "Connecting...";
      case "connected":
        return "Call in progress";
      case "ended":
        return "Call ended";
      default:
        return "Ready to call";
    }
  };

  const getCallStateColor = () => {
    switch (callState) {
      case "connecting":
        return "text-yellow-500";
      case "connected":
        return "text-green-500";
      case "ended":
        return "text-muted-foreground";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Voice Call</h3>
      </div>

      {/* Call Interface */}
      <div className="text-center py-8">
        {/* Avatar/Status */}
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Mic className="w-12 h-12 text-white" />
          </div>
          {callState === "connected" && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
        <p className={`text-sm ${getCallStateColor()} mb-8`}>
          {getCallStateText()}
        </p>

        {/* Setup Notice */}
        {callState === "idle" && (
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
            <p className="font-medium mb-1">Setup Required</p>
            <p>Add your Retell API key and agent ID to enable voice calls.</p>
          </div>
        )}

        {/* Call Controls */}
        <div className="flex justify-center gap-4">
          {callState === "idle" && (
            <Button
              onClick={startCall}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 rounded-full w-16 h-16"
              size="icon"
            >
              <Phone className="w-6 h-6" />
            </Button>
          )}

          {(callState === "connecting" || callState === "connected") && (
            <>
              <Button
                onClick={() => setIsMuted(!isMuted)}
                variant={isMuted ? "destructive" : "outline"}
                className="rounded-full w-14 h-14"
                size="icon"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button
                onClick={endCall}
                variant="destructive"
                className="rounded-full w-16 h-16"
                size="icon"
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>

        {/* Call Instructions */}
        {callState === "connected" && (
          <p className="text-sm text-muted-foreground mt-6">
            Speak naturally - the AI is listening and will respond in real-time.
          </p>
        )}
      </div>
    </div>
  );
}