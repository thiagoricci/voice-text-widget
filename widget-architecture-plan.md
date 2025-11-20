# Embeddable Widget Architecture Plan

## Overview

Transform the existing Vite/TypeScript chat application into a self-contained, embeddable widget that can be integrated into any website with a single script tag.

## Key Requirements

- Maintain full floating chat button functionality
- Bundle all dependencies including React
- Configure API keys via data attributes
- Ensure zero conflicts with host websites
- Single JavaScript file output

## Architecture Design

### 1. Widget Entry Point (`src/widget.tsx`)

```typescript
// Responsibilities:
// - Auto-initialize when script loads
// - Read configuration from data attributes
// - Create isolated container
// - Mount React app with configuration
```

### 2. Configuration Management

The widget will read configuration from the script tag's data attributes:

```html
<script
  src="https://cdn.example.com/widget.js"
  data-retell-api-key="YOUR_API_KEY"
  data-voice-agent-id="YOUR_VOICE_AGENT_ID"
  data-chat-agent-id="YOUR_CHAT_AGENT_ID"
  data-position="bottom-right"
  data-theme="light"
></script>
```

### 3. Component Architecture

```
widget.tsx (Entry Point)
    └── WidgetApp.tsx (Configuration Provider)
         └── FloatingChatButton.tsx (Existing)
              ├── VoiceCall.tsx (Modified to use context)
              └── TextChat.tsx (Modified to use context)
```

### 4. CSS Isolation Strategy

**Option 1: CSS-in-JS with Emotion (Recommended)**

- Convert Tailwind classes to Emotion styled components
- All styles scoped automatically
- No global CSS pollution

**Option 2: Shadow DOM**

- Complete style isolation
- May have compatibility issues with some React libraries

**Option 3: CSS Modules with Prefixing**

- Build-time prefixing of all classes
- Simpler but requires careful configuration

### 5. Build Configuration

```javascript
// vite.config.ts modifications:
{
  build: {
    lib: {
      entry: 'src/widget.tsx',
      name: 'AIAssistantWidget',
      fileName: 'widget',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined
      }
    }
  }
}
```

### 6. API Key Security Considerations

- API keys will be visible in the browser
- Recommend implementing a proxy server for production
- Document security best practices
- Consider allowing backend URL configuration

### 7. Implementation Steps

1. **Context Provider Setup**

   - Create WidgetConfigContext for API keys
   - Wrap components with provider
   - Remove hardcoded environment variables

2. **Entry Point Development**

   - Script tag configuration reader
   - Container injection logic
   - React app mounting

3. **Style Isolation**

   - Convert critical Tailwind utilities to inline styles
   - Implement scoping strategy
   - Test on various websites

4. **Build Pipeline**

   - Separate widget build command
   - Minification and optimization
   - Source map configuration

5. **Testing Strategy**
   - Create test pages with different configurations
   - Test on sites with conflicting styles
   - Performance testing

### 8. Usage Documentation

The final implementation will allow users to embed the widget like this:

```html
<!-- Basic Implementation -->
<script
  src="https://your-cdn.com/widget.js"
  data-retell-api-key="sk_retell_..."
  data-voice-agent-id="agent_voice_123"
  data-chat-agent-id="agent_chat_456"
></script>

<!-- Advanced Implementation with Custom Styling -->
<script
  src="https://your-cdn.com/widget.js"
  data-retell-api-key="sk_retell_..."
  data-voice-agent-id="agent_voice_123"
  data-chat-agent-id="agent_chat_456"
  data-primary-color="#0066CC"
  data-position="bottom-left"
  data-offset-x="20"
  data-offset-y="20"
></script>
```

### 9. Deployment Strategy

1. **CDN Deployment**

   - Build widget.js
   - Upload to CDN (Cloudflare, AWS CloudFront, etc.)
   - Version management strategy

2. **NPM Package (Optional)**
   - Publish as npm package
   - Allow importing as module
   - Provide TypeScript definitions

### 10. Performance Optimizations

- Tree-shaking unused UI components
- Lazy loading for voice/text components
- Minimize bundle size (<200KB gzipped target)
- Async loading pattern

### 11. Browser Compatibility

- Target: Modern browsers (ES6+)
- Polyfills for older browsers if needed
- Progressive enhancement approach

### 12. Error Handling

- Graceful fallbacks for missing configuration
- Console warnings for development
- Error boundary for React crashes
- Network error handling
