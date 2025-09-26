import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Retell from 'retell-sdk';

interface TextChatProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function TextChat({ onBack }: TextChatProps) {
   const [messages, setMessages] = useState<Message[]>([
     {
       id: "1",
       text: "Hello! I'm your AI assistant. How can I help you today?",
       isUser: false,
       timestamp: new Date(),
     },
   ]);
   const [inputValue, setInputValue] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isTyping, setIsTyping] = useState(false);
   const [currentChatId, setCurrentChatId] = useState<string | null>(null);
   const scrollAreaRef = useRef<HTMLDivElement>(null);
   const messagesEndRef = useRef<HTMLDivElement>(null);

   // Retell AI credentials
   const RETELL_API_KEY = import.meta.env.VITE_RETELL_API_KEY;
   const AGENT_ID = import.meta.env.VITE_RETELL_CHAT_AGENT_ID;

   // Initialize Retell client
   const retellClient = useRef<Retell>();

   useEffect(() => {
     retellClient.current = new Retell({
       apiKey: RETELL_API_KEY,
     });
   }, [RETELL_API_KEY]);

   // Create chat session once per component lifecycle
   const createChatSession = async (): Promise<string> => {
     if (!retellClient.current) {
       throw new Error("Retell client not initialized");
     }

     try {
       const chatResponse = await retellClient.current.chat.create({
         agent_id: AGENT_ID
       });

       console.log("Chat session created:", chatResponse);
       return chatResponse.chat_id;
     } catch (error) {
       console.error("Error creating chat session:", error);
       throw error;
     }
   };

   // Auto-scroll to bottom when messages change
   const scrollToBottom = () => {
     if (messagesEndRef.current) {
       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
     }
   };

   useEffect(() => {
     scrollToBottom();
   }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading || !retellClient.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      console.log("Sending message to Retell AI:", inputValue);

      // Use existing chat_id or create a new chat session
      let chatId = currentChatId;

      if (!chatId) {
        console.log("Creating new chat session...");
        chatId = await createChatSession();
        setCurrentChatId(chatId);
      }

      console.log("Using chat ID:", chatId);

      // Use the correct Retell SDK method for chat completion
      const response = await retellClient.current.chat.createChatCompletion({
        chat_id: chatId,
        content: inputValue,
      });

      console.log("Retell AI response:", response);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: (response.messages?.[0] as any)?.content || "I apologize, but I couldn't process your message right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // If chat session expired or invalid, reset and try again
      if (error instanceof Error && error.message.includes('chat')) {
        console.log("Chat session may have expired, resetting...");
        setCurrentChatId(null);

        // Retry once with a new chat session
        try {
          const newChatId = await createChatSession();
          setCurrentChatId(newChatId);

          if (!retellClient.current) return;

          const response = await retellClient.current.chat.createChatCompletion({
            chat_id: newChatId,
            content: inputValue,
          });

          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: (response.messages?.[0] as any)?.content || "I apologize, but I couldn't process your message right now. Please try again.",
            isUser: false,
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, aiResponse]);
        } catch (retryError) {
          console.error("Retry failed:", retryError);
          const errorResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I'm having trouble connecting right now. Please check your internet connection and try again.",
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorResponse]);
        }
      } else {
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I'm having trouble connecting right now. Please check your internet connection and try again.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="h-80 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-semibold">Text Chat</h3>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 py-2">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  message.isUser
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-3 py-2 bg-muted">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
                </div>
              </div>
            </div>
          )}

          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex gap-2 pt-2 border-t">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="bg-gradient-primary"
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}