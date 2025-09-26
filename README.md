# AI Voice Assistant Chat Widget

A modern, responsive chat widget with voice and text capabilities powered by Retell AI. Features an expandable interface with professional design and seamless user experience.

## Features

- 🎤 **Voice Calls**: Real-time voice conversations with AI assistant
- 💬 **Text Chat**: Instant messaging with intelligent responses
- 🎨 **Modern UI**: Clean, expandable interface design
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Auto-scroll**: Automatic scrolling for long conversations
- 🔄 **Session Management**: Efficient chat session handling

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **AI Integration**: Retell AI SDK
- **Icons**: Lucide React

## Environment Setup

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Retell AI account - [Sign up here](https://retell.ai)

### Installation & Setup

1. **Clone the repository**

   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with your Retell AI credentials:

   ```env
   # Retell AI Configuration
   VITE_RETELL_API_KEY=your_retell_api_key_here
   VITE_RETELL_VOICE_AGENT_ID=your_voice_agent_id_here
   VITE_RETELL_CHAT_AGENT_ID=your_chat_agent_id_here
   ```

   ### Getting Your Retell AI Credentials

   1. **Sign up/Login** to [Retell AI](https://retell.ai)
   2. **Get your API Key**:
      - Go to your dashboard
      - Navigate to "API Keys" section
      - Copy your API key (starts with `key_`)
   3. **Create/Get Agent IDs**:
      - Go to "Agents" section
      - Create new agents or use existing ones
      - Copy the agent IDs (start with `agent_`)

4. **Start the development server**

   ```sh
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:8080` to see your chat widget in action!

## Usage

1. **Click the floating chat button** in the bottom-right corner
2. **Choose your preferred method**:
   - **Voice chat**: Click the green "Voice chat" button
   - **Text chat**: Click the "Text chat" button
3. **Start conversing** with the AI assistant!

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/
│   ├── FloatingChatButton.tsx  # Main chat interface
│   ├── TextChat.tsx           # Text chat component
│   ├── VoiceCall.tsx          # Voice call component
│   └── ui/                    # UI components
├── pages/
│   └── Index.tsx              # Main page
└── App.tsx                    # Root component
```

## Deployment

### Deploy with Lovable

Simply open [Lovable](https://lovable.dev/projects/2cdc8c77-2fb8-48d4-8c5f-6f3c49c327e7) and click on Share → Publish.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

## Support

For issues related to:

- **Retell AI integration**: Check [Retell AI Documentation](https://docs.retell.ai)
- **General development**: Check the [Lovable Documentation](https://docs.lovable.dev)

## License

This project is built with [Lovable](https://lovable.dev).
