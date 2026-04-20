# TraceAPI - Modern API Testing Tool

A powerful, user-friendly API testing application built with Next.js, featuring AI-powered insights, resizable sidebars, and a beautiful modern interface.

## 🚀 Features

### Core Functionality
- **Multi-Tab Interface**: Create and manage multiple API requests simultaneously
- **HTTP Methods Support**: GET, POST, PUT, DELETE requests
- **Dynamic Headers & Body**: Add custom headers and JSON request bodies
- **Real-time Response Display**: View formatted JSON responses with syntax highlighting
- **AI-Powered Explanations**: Get intelligent insights about API responses using Groq AI
- **Request History**: Automatically track all sent requests
- **Saved Requests**: Save and reuse frequently used API configurations

### Advanced Features
- **Resizable Sidebars**: Drag-to-resize request panel and chat/history panels
- **Interactive AI Chat**: Natural language interface for sending API requests
- **Status-Based Styling**: Dynamic border colors (green/yellow/red) based on response status
- **Performance Optimized**: All animations removed for maximum performance and smooth scrolling
- **Responsive Design**: Fully responsive layout that works on all screen sizes

## 🛠️ Technologies Used

### Frontend Framework
- **Next.js 15+**: React framework with App Router
- **TypeScript**: Type-safe development
- **React Hooks**: useState, useEffect for state management

### UI/UX Libraries
- **TailwindCSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on TailwindCSS
- **React Icons**: Comprehensive icon library

### Styling & Design
- **Glassmorphism**: Modern glass-like UI effects with backdrop blur
- **Custom CSS**: Optimized animations and transitions (removed for performance)
- **Responsive Grid**: Mobile-first responsive design
- **Color System**: OKLCH color space for better color consistency

### API & Data
- **Fetch API**: Native browser API for HTTP requests
- **Groq AI**: AI integration for response analysis
- **Local Storage**: Browser storage for saving requests and history

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization

## 📁 Project Structure

```
app/
├── globals.css              # Global styles and custom CSS
├── layout.tsx              # Root layout component
├── page.tsx                # Homepage with hero section
└── test-api/
    ├── TestApiApp.tsx       # Main API testing interface
    └── Resizable.tsx        # Resizable sidebar component
```

## 🎯 Implementation Details

### Resizable Sidebar Implementation
- **Custom Resizable Component**: Built from scratch for drag-to-resize functionality
- **Mouse Event Handling**: Tracks mouse movements during resize operations
- **Width Persistence**: Saves sidebar width to localStorage
- **Collapse/Expand**: Toggle functionality with smooth transitions
- **Boundary Constraints**: Prevents panels from becoming too small/large

### Request Handling System
- **Tab Management**: Dynamic creation, switching, and deletion of request tabs
- **Draft System**: Real-time editing of request parameters
- **Error Handling**: Comprehensive error catching and user feedback
- **Response Parsing**: Automatic JSON formatting and syntax highlighting
- **Status Tracking**: Visual indicators for request states (loading, success, error)

### AI Integration
- **Groq API Integration**: Uses Groq's Llama model for AI insights
- **Natural Language Processing**: Parses user commands like "send GET request to..."
- **Response Analysis**: Provides explanations of API responses
- **Error Detection**: Identifies potential issues in API responses
- **Environment Variables**: Secure API key management

### Performance Optimizations
- **Animation Removal**: All CSS animations disabled for maximum performance
- **Scroll Optimization**: Hardware acceleration and smooth scrolling
- **Minimal Transitions**: Only essential hover effects retained
- **Optimized Rendering**: Efficient React component structure
- **CSS Containment**: Isolates rendering for better performance

## 🎨 UI Components

### Request Panel
- **Method Selector**: Dropdown for HTTP method selection
- **URL Input**: Large, accessible input field for API endpoints
- **Headers Section**: Dynamic key-value pair management
- **Body Editor**: Textarea for JSON request bodies
- **Send Button**: Primary action button with loading states

### Response Display
- **Status Bar**: Shows HTTP status code, message, and response time
- **Formatted JSON**: Syntax-highlighted JSON response display
- **Error Messages**: Clear error display with helpful information
- **Copy Function**: One-click copying of response data

### AI Chat Interface
- **Message History**: Scrollable chat conversation
- **Input Field**: Natural language input for API requests
- **Command Parsing**: Recognizes various request formats
- **Response Formatting**: Markdown rendering for AI explanations

### History & Saved Requests
- **Request List**: Chronological list of sent requests
- **Quick Access**: Click to load previous requests
- **Save Functionality**: Store frequently used configurations
- **Search/Filter**: Easy navigation through request history

## 🔧 Configuration

### Environment Variables
```env
GROQ_API_KEY=your_groq_api_key_here
```

### Local Storage Keys
- `traceapi-tabs`: Active tabs and their configurations
- `traceapi-history`: Request history
- `traceapi-saved`: Saved request configurations
- `resizable-width-left`: Left sidebar width
- `resizable-width-right`: Right sidebar width

## 🚀 Getting Started

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd TraceAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your GROQ_API_KEY to .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Basic API Testing
1. **Create a new tab** using "New" button
2. **Select HTTP method** (GET, POST, PUT, DELETE)
3. **Enter API URL** in input field
4. **Add headers** (optional) using key-value interface
5. **Add JSON body** (optional for POST/PUT requests)
6. **Click "Send"** to execute request
7. **View response** in formatted display panel

### AI Chat Interface
1. **Type natural language commands** like:
   - "Send GET request to https://api.github.com/users/octocat"
   - "POST to https://httpbin.org/post with body {\"test\": \"data\"}"
   - "Delete request to https://api.example.com/resource/123"
2. **Press Enter** or click "Send" to execute
3. **View AI analysis** of response

### Managing Requests
- **Save Requests**: Click save icon to store frequently used requests
- **View History**: Access all previous requests in right sidebar
- **Resize Panels**: Drag divider between panels to adjust widths
- **Multiple Tabs**: Work on several API requests simultaneously

## 🎯 Key Features Explained

### Resizable Sidebars
The application features custom-built resizable sidebars that allow users to:
- **Drag to resize**: Click and drag the divider between panels
- **Persistent sizing**: Width preferences saved to localStorage
- **Minimum/Maximum limits**: Prevents panels from becoming unusable
- **Smooth transitions**: Visual feedback during resize operations

### Dynamic Response Styling
Response panels automatically change border colors based on HTTP status:
- **Green (200-299)**: Success responses
- **Yellow (300-399)**: Redirect/Warning responses  
- **Red (400-599)**: Error responses
- **Gray (default)**: No response yet

### Performance Optimization
All animations and visual effects have been removed to ensure:
- **Maximum scrolling performance**: No animation interference
- **Fast page loading**: Minimal CSS overhead
- **Smooth interactions**: Direct response to user actions
- **Low resource usage**: Optimized rendering pipeline

## 🔮 Future Enhancements

- [ ] Request/Response Collections
- [ ] Environment Variables Management
- [ ] WebSocket Testing Support
- [ ] GraphQL Query Testing
- [ ] Automated Testing Suites
- [ ] Response Assertions
- [ ] Export/Import Functionality
- [ ] Dark/Light Theme Toggle
- [ ] Keyboard Shortcuts
- [ ] Request Caching
- [ ] Proxy Configuration

## 📄 License

This project is open source and available under [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**TraceAPI** - Making API testing simple, powerful, and intelligent.
- **Persistent Storage**: Saved requests and history are automatically persisted to `localStorage`.
- **Modern UI/UX**: Built with Stitch-inspired MSP principles, featuring resizable sidebars, dark/light themes (DaisyUI), and smooth transitions.

---

## 🛠️ Project Architecture

### Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: React Icons (FaPiedPiperAlt)
- **AI Backend**: Groq API via Serverless Functions
- **State Management**: React Hooks (useMemo, useToasts, Context)

### Directory Structure
```text
app/
├── api/
│   ├── groq/             # Server-side proxy for AI requests
│   └── proxy/            # Server-side proxy for API calls (to bypass CORS)
├── components/           # Shared UI (Navbar, ThemeContext)
└── test-api/             # Core Logic
    ├── Resizable.tsx      # Sidebar resizing components
    ├── TestApiApp.tsx     # Main application state and UI logic
    ├── storage.ts         # localStorage management
    ├── types.ts           # Shared TypeScript definitions
    └── utils.ts           # Fetching logic, AI parsing, and UID generation
```

---

## 🧠 Core Logic & Workflow

### 1. Request Handling (`utils.ts` & `TestApiApp.tsx`)
When a user clicks "Send":
- **Proxy Layer**: For absolute URLs, the app routes requests through `/api/proxy`. This is crucial for web-based testers to bypass browser **CORS (Cross-Origin Resource Sharing)** restrictions that would otherwise block requests to external domains.
- **Draft & Tab State**: Each tab maintains its own `RequestDraft` (method, URL, headers, body).
- **Response Processing**: The system captures status codes, response time, and attempts to "pretty-print" JSON bodies.

### 2. AI Intelligence
The app integrates with Groq to provide two layers of assistance:
- **The Whisper Panel**: After a request finishes, the `groqChat` utility sends the request context and response details to the AI. It returns a concise explanation and troubleshooting steps tailored for beginners.
- **The Control Chat**: Located in the right sidebar, it uses a pattern-matcher and AI to parse user commands. Commands like `"GET https://example.com"` are automatically extracted to fill the request builder and trigger a run.

### 3. Persistence (`storage.ts`)
The app uses a robust wrapper around `localStorage`:
- **Saved Requests**: Limit of 10 persisted requests.
- **History**: Automatically records the last 10 successful/failed runs.
- **Tab Management**: Closing a tab prompts the user to save it to their local library.

---

## 🚦 Getting Started

1. **Install Dependencies**: `npm install`
2. **Environment Setup**: Add your `GROQ_API_KEY` to your `.env.local` file.
3. **Run Dev Server**: `npm run dev`

---

Built with ❤️ by TraceAPI Team.