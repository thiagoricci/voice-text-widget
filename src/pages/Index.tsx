import { FloatingChatButton } from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            AI Voice Assistant
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Experience the future of conversation with our intelligent voice assistant. 
            Chat via text or speak naturally with advanced AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <div className="flex items-center gap-3 text-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Intelligent Responses</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Natural Voice</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse"></div>
              <span>24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8 shadow-elegant hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Text Conversations</h3>
            <p className="text-muted-foreground">
              Type your questions and get instant, intelligent responses in a clean chat interface.
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8 shadow-elegant hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Voice Calls</h3>
            <p className="text-muted-foreground">
              Speak naturally and have real-time voice conversations with our AI assistant.
            </p>
          </div>
        </div>
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

export default Index;