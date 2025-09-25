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
  const RETELL_API_KEY = "key_236cebe464b79fed5c845d447cb3";
  const AGENT_ID = "agent_eb8b02e8f0280af48e68c8f40a";

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
          {(callState === "connected" && isAgentSpeaking) && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          )}
          {(callState === "connected" && !isAgentSpeaking) && (
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
            <p className="font-medium mb-1">Ready to Connect</p>
            <p>Click the call button below to start your voice conversation with the AI assistant.</p>
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
                onClick={toggleMute}
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