import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { RetellWebClient } from "retell-client-js-sdk";

interface VoiceCallProps {
  onBack: () => void;
}

type CallState = "idle" | "connecting" | "connected" | "ended";

export function VoiceCall({ onBack }: VoiceCallProps) {
  const [callState, setCallState] = useState<CallState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const retellWebClient = useRef<RetellWebClient>();

  // Your Retell credentials
  const RETELL_API_KEY = import.meta.env.VITE_RETELL_API_KEY;
  const AGENT_ID = import.meta.env.VITE_RETELL_VOICE_AGENT_ID;

  useEffect(() => {
    // Initialize Retell Web Client
    retellWebClient.current = new RetellWebClient();

    // Set up event listeners
    retellWebClient.current.on("call_started", () => {
      console.log("Call started");
      setCallState("connected");
    });

    retellWebClient.current.on("call_ended", () => {
      console.log("Call ended");
      setCallState("ended");
      setTimeout(() => {
        setCallState("idle");
      }, 1500);
    });

    retellWebClient.current.on("agent_start_talking", () => {
      console.log("Agent started talking");
      setIsAgentSpeaking(true);
    });

    retellWebClient.current.on("agent_stop_talking", () => {
      console.log("Agent stopped talking");
      setIsAgentSpeaking(false);
    });

    retellWebClient.current.on("error", (error) => {
      console.error("Retell error:", error);
      setCallState("ended");
      setTimeout(() => {
        setCallState("idle");
      }, 1500);
    });

    return () => {
      // Cleanup on unmount
      if (retellWebClient.current) {
        retellWebClient.current.stopCall();
      }
    };
  }, []);

  const createWebCall = async () => {
    try {
      const response = await fetch("https://api.retellai.com/v2/create-web-call", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RETELL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: AGENT_ID,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating web call:", error);
      throw error;
    }
  };

  const startCall = async () => {
    try {
      setCallState("connecting");
      
      // Create web call to get access token
      const callData = await createWebCall();
      
      // Start the call with Retell Web Client
      await retellWebClient.current?.startCall({
        accessToken: callData.access_token,
      });
    } catch (error) {
      console.error("Error starting call:", error);
      setCallState("ended");
      setTimeout(() => {
        setCallState("idle");
      }, 1500);
    }
  };

  const endCall = () => {
    retellWebClient.current?.stopCall();
  };

  const toggleMute = () => {
    // Note: Mute functionality would need to be implemented with additional SDK methods
    // For now, we'll just toggle the visual state
    setIsMuted(!isMuted);
  };

  const getCallStateText = () => {
    switch (callState) {
      case "connecting":
        return "Connecting to AI...";
      case "connected":
        return isAgentSpeaking ? "AI is speaking..." : "Listening...";
      case "ended":
        return "Call ended";
      default:
        return "Ready to start voice call";
    }
  };

  const getCallStateColor = () => {
    switch (callState) {
      case "connecting":
        return "text-yellow-500";
      case "connected":
        return isAgentSpeaking ? "text-blue-500" : "text-green-500";
      case "ended":
        return "text-muted-foreground";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="py-2">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Voice Call</h3>
      </div>

      {/* Call Interface */}
      <div className="text-center py-4">
        {/* Call Button at Top */}
        <div className="mb-4">
          {callState === "idle" && (
            <Button
              onClick={startCall}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 rounded-full w-16 h-16 mx-auto"
              size="icon"
            >
              <Phone className="w-6 h-6" />
            </Button>
          )}

          {(callState === "connecting" || callState === "connected") && (
            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "outline"}
                className="rounded-full w-12 h-12"
                size="icon"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button
                onClick={endCall}
                variant="destructive"
                className="rounded-full w-12 h-12"
                size="icon"
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Avatar/Status */}
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <Mic className="w-10 h-10 text-white" />
          </div>
          {(callState === "connected" && isAgentSpeaking) && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
          {(callState === "connected" && !isAgentSpeaking) && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
        <p className={`text-sm ${getCallStateColor()} mb-4`}>
          {getCallStateText()}
        </p>


      </div>
    </div>
  );
}