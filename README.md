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

## Customization

### Styling and Colors

The widget uses a design system based on HSL color values defined in `src/index.css`. You can customize the appearance by modifying the CSS variables in the `:root` selector:

```css
:root {
  --primary: 210 100% 50%; /* Primary color (blue) */
  --primary-glow: 220 100% 60%; /* Primary glow color */
  --accent: 220 100% 60%; /* Accent color */
  --gradient-primary: linear-gradient(
    135deg,
    hsl(210 100% 50%),
    hsl(220 100% 60%)
  ); /* Main gradient */
  --shadow-glow: 0 0 30px hsl(210 100% 50% / 0.3); /* Glow shadow */
}
```

To customize the widget colors:

1. Modify the HSL values in `src/index.css`
2. Rebuild the widget using `npm run build:widget`
3. The new styles will be included in the generated `widget.css` and `widget.iife.js` files

### Testing the Widget

To test the widget during development:

1. **Build the widget**:

   ```sh
   npm run build:widget
   ```

2. **Open the test page**:
   After building, open `widget-test.html` in your browser to see the widget in action. This page demonstrates how to embed the widget and provides a testing environment.

3. **Alternative testing method**:
   You can also run the development server to test the widget in the main application:
   ```sh
   npm run dev
   ```

### Building the Embeddable Widget

To build the standalone embeddable widget file, follow these steps:

1. **Install dependencies** (if you haven't already):

   ```sh
   npm install
   ```

2. **Build the widget** using the dedicated build script:

   ```sh
   npm run build:widget
   ```

   This command uses the `vite.widget.config.ts` configuration to create a standalone JavaScript file that can be embedded in any website.

3. **Locate the output files** in the `dist/` directory:

   After running the build command, you'll find these files:

   - `widget.iife.js` - The main widget JavaScript file (IIFE format)
   - `widget.css` - The widget CSS styles

4. **Upload these files** to your server or CDN for distribution.

5. **Embed in your website** by adding these tags to your HTML:

   **How to Embed**

   Simply add the following script tag to your HTML:

   ```html
   <link rel="stylesheet" href="./dist/widget.css" />
   <script src="./dist/widget.iife.js"></script>
   ```

   For production use, replace the paths with your CDN URLs:

   ```html
   <link rel="stylesheet" href="https://your-cdn.com/widget.css" />
   <script src="https://your-cdn.com/widget.iife.js"></script>
   ```

### Widget Build Configuration

The embeddable widget is built using a specialized Vite configuration (`vite.widget.config.ts`) that:

- Uses IIFE (Immediately Invoked Function Expression) format for standalone execution
- Bundles all dependencies into a single file
- Includes necessary polyfills for browser compatibility
- Optimizes the bundle for size and performance
- Creates a self-contained component that can be injected into any webpage

### Development vs Production Builds

- **Development build**: Use `npm run build:dev` for a non-minified version with source maps for debugging
- **Production build**: Use `npm run build:widget` for the optimized, minified version for production use

## License

This project is built with [Lovable](https://lovable.dev).
