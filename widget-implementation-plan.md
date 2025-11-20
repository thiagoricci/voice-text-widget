# Simplified Widget Implementation Plan

## Overview

Convert the existing chat application into a simple embeddable widget that maintains all current functionality without any configuration options. The widget will use the same environment variables as the main application.

## Implementation Steps

### 1. Create Widget Entry Point (`src/widget.tsx`)

```typescript
// Simple auto-injection script that:
// - Creates a container div
// - Mounts the React app with FloatingChatButton
// - Uses existing environment variables
```

### 2. Create Widget App Wrapper (`src/WidgetApp.tsx`)

```typescript
// Minimal wrapper that includes:
// - Required providers (QueryClient, Toaster, etc.)
// - FloatingChatButton component
// - No routing needed
```

### 3. Update Vite Configuration

```javascript
// Two entry points:
// 1. main.tsx - regular app build
// 2. widget.tsx - IIFE widget build

build: {
  lib: {
    entry: 'src/widget.tsx',
    name: 'AIAssistantWidget',
    fileName: 'widget',
    formats: ['iife']
  }
}
```

### 4. CSS Handling

- Import the same index.css in widget.tsx
- Vite will bundle all CSS into the widget.js file
- The styles will be injected when the widget loads

### 5. Build Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "build:widget": "vite build --config vite.widget.config.ts"
  }
}
```

### 6. Test HTML Page

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Widget Test</title>
  </head>
  <body>
    <h1>Test Page</h1>
    <p>The chat widget should appear in the bottom-right corner.</p>

    <!-- Single line to embed the widget -->
    <script src="./dist/widget.js"></script>
  </body>
</html>
```

## File Structure

```
src/
├── widget.tsx          (new - entry point)
├── WidgetApp.tsx       (new - wrapper component)
├── main.tsx            (existing - regular app)
├── App.tsx             (existing - regular app)
└── components/
    └── FloatingChatButton.tsx (reused as-is)

vite.config.ts          (existing - regular build)
vite.widget.config.ts   (new - widget build)
```

## Key Benefits

- Minimal changes to existing code
- Reuses all existing components
- Same functionality as the main app
- Simple one-line integration
- No configuration needed

## Usage

After building, users can embed the widget with:

```html
<script src="https://your-domain.com/widget.js"></script>
```

The widget will automatically appear and function exactly like the floating chat button in the main application.
