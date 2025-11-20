# AI Assistant Embeddable Widget

This project has been configured to build as an embeddable widget that can be integrated into any website with just two lines of HTML.

## Features

✨ **Voice Chat** - Real-time voice conversations with AI assistant  
💬 **Text Chat** - Traditional text-based chat interface  
🎨 **Floating Button** - Elegant floating button that expands to show options  
📦 **Self-Contained** - All dependencies bundled, no conflicts with host site  
🚀 **Easy Integration** - Just add two lines of HTML to embed

## Quick Start

### 1. Build the Widget

```bash
npm run build:widget
```

This creates two files in the `dist/` directory:

- `widget.iife.js` - The JavaScript bundle (includes React and all dependencies)
- `widget.css` - The widget styles

### 2. Test Locally

Open `widget-test.html` in your browser to see the widget in action:

```bash
open widget-test.html
```

### 3. Embed on Your Website

Add these two lines to any HTML page:

```html
<link rel="stylesheet" href="https://your-cdn.com/widget.css" />
<script src="https://your-cdn.com/widget.iife.js"></script>
```

That's it! The chat button will appear in the bottom-right corner of the page.

## Development

### Project Structure

```
src/
├── widget.tsx          # Widget entry point - auto-injects the chat button
├── WidgetApp.tsx       # Widget wrapper - includes required providers
├── components/
│   ├── FloatingChatButton.tsx  # Main chat interface
│   ├── VoiceCall.tsx          # Voice chat component
│   └── TextChat.tsx           # Text chat component
└── index.css                  # Styles (bundled into widget.css)

vite.widget.config.ts   # Widget-specific Vite configuration
```

### Key Files

- **`src/widget.tsx`** - Entry point that creates a container div and mounts the React app
- **`src/WidgetApp.tsx`** - Minimal wrapper that includes only necessary providers
- **`vite.widget.config.ts`** - Vite config for building as IIFE bundle

### Build Configuration

The widget is built using a separate Vite configuration that:

- Bundles React and all dependencies
- Creates an IIFE (Immediately Invoked Function Expression)
- Outputs separate CSS and JS files
- Includes polyfills for Node.js modules

## Deployment

### Option 1: CDN Deployment

1. Build the widget:

   ```bash
   npm run build:widget
   ```

2. Upload `dist/widget.iife.js` and `dist/widget.css` to your CDN

3. Share the embed code with your users:
   ```html
   <link rel="stylesheet" href="https://your-cdn.com/widget.css" />
   <script src="https://your-cdn.com/widget.iife.js"></script>
   ```

### Option 2: Self-Hosted

1. Copy the built files to your web server
2. Reference them with relative or absolute URLs

### Option 3: NPM Package (Future Enhancement)

Consider publishing as an NPM package for easier version management.

## Bundle Size

Current bundle sizes (after build):

- JavaScript: ~1.87 MB (530 KB gzipped)
- CSS: ~62 KB (11 KB gzipped)

The large JavaScript size is due to bundling React, React DOM, and all UI components. Consider these optimizations for production:

- Use a CDN for React/ReactDOM with externals
- Code splitting for voice/text chat components
- Tree-shaking unused UI components

## Security Considerations

⚠️ **Important**: The current implementation uses environment variables for API keys. For production:

1. **Don't expose API keys in the frontend** - Use a backend proxy
2. **Implement rate limiting** - Protect your API endpoints
3. **Add domain restrictions** - Limit which domains can use your widget
4. **Use secure tokens** - Generate temporary tokens for each session

## Customization (Future Enhancements)

While the current version uses fixed configuration, future versions could support:

```html
<script
  src="https://your-cdn.com/widget.iife.js"
  data-position="bottom-left"
  data-primary-color="#0066CC"
  data-api-endpoint="https://your-api.com"
></script>
```

## Browser Support

The widget supports modern browsers with ES6+ support:

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+

## Troubleshooting

### Widget doesn't appear

- Check browser console for errors
- Ensure both CSS and JS files are loaded
- Verify no Content Security Policy violations

### Styles conflict with host site

- Widget styles are not fully isolated
- Consider Shadow DOM implementation for complete isolation

### API connection issues

- Check network tab for failed requests
- Verify environment variables are set correctly
- Ensure CORS is configured on your API

## Development Commands

```bash
# Development
npm run dev              # Run the main app in development mode

# Building
npm run build           # Build the main application
npm run build:widget    # Build the embeddable widget

# Testing
npm run preview         # Preview the built application
```

## Future Improvements

1. **Single File Bundle** - Inline CSS into JavaScript
2. **Shadow DOM** - Complete style isolation
3. **Configuration API** - Runtime configuration options
4. **Smaller Bundle** - Optimize dependencies
5. **TypeScript Definitions** - For better integration
6. **Analytics** - Track widget usage
7. **Theming System** - Allow custom themes
8. **Accessibility** - Enhanced keyboard navigation

## License

[Your License Here]

## Support

[Your Support Information Here]
