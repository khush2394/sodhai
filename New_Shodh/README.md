# Shodh-a-Code Contest Platform - Frontend

A modern React/Next.js frontend for a coding contest platform featuring real-time UI updates, live leaderboards, and an interactive code editor.

## 🎯 Project Overview

This project demonstrates advanced frontend development capabilities, including:
- **Frontend**: React/Next.js with real-time UI updates
- **Code Editor**: Monaco Editor with syntax highlighting
- **Real-time Features**: Live leaderboards and submission status updates
- **Mock Data**: Complete frontend experience with simulated backend

## 🏗️ Architecture

### Frontend (Next.js + Tailwind CSS)
- **Real-time UI**: Live updates for submissions and leaderboards
- **Code Editor**: Monaco Editor with syntax highlighting
- **Responsive Design**: Mobile-friendly interface
- **State Management**: React hooks for async operations
- **Mock API**: Simulated backend with realistic data

### Key Features
- **Join Page**: Simple form for Contest ID and Username
- **Main Contest Page**: Problem view, code editor, and leaderboard
- **Real-time Updates**: Submission status polling and live leaderboard
- **Multi-language Support**: JavaScript, Python, Java, C++, C
- **Interactive Experience**: Complete contest simulation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Setup
```bash
# Clone the repository
git clone <repository-url>
cd New_Shodh

# Install dependencies
npm install

# Start the development server
npm run dev

# Access the application
# Frontend: http://localhost:3000
```

### Demo Usage
1. Navigate to http://localhost:3000
2. Enter Contest ID: `1`
3. Enter Username: `your_username`
4. Select a problem and write code
5. Submit and watch real-time status updates
6. Check the live leaderboard

## 🎮 Demo Features

### Mock Data
The application includes realistic mock data:
- **Contest**: "Shodh-a-Code Championship 2024"
- **Problems**: 3 problems of varying difficulty
  - Two Sum (Easy)
  - Palindrome Number (Easy) 
  - Longest Substring Without Repeating Characters (Medium)
- **Leaderboard**: Live rankings with sample participants
- **Submissions**: Realistic status progression simulation

### Interactive Experience
- **Code Editor**: Full Monaco Editor with syntax highlighting
- **Real-time Updates**: Simulated submission status changes
- **Live Leaderboard**: Auto-refreshing rankings
- **Multi-language Support**: JavaScript, Python, Java, C++, C

## 🏛️ Design Decisions & Justifications

### Frontend Architecture

#### Component Structure
- **CodeEditor**: Monaco Editor integration with language support
- **SubmissionStatus**: Real-time status updates with polling
- **Leaderboard**: Live rankings with automatic refresh
- **ProblemView**: Rich problem display with test cases

**Justification**: Modular components enable reusability and maintainability.

#### State Management Approach
- **React Hooks**: useState and useEffect for local state
- **Polling Strategy**: 2-3 second intervals for submissions, 15 seconds for leaderboard
- **Error Handling**: Graceful degradation and user feedback

**Justification**: React hooks provide sufficient state management for this application's complexity without external libraries.

#### Real-time Updates
- **Submission Polling**: Immediate feedback on code execution
- **Leaderboard Updates**: Live competition experience
- **Status Indicators**: Visual feedback for all submission states

**Justification**: Polling provides reliable real-time updates without WebSocket complexity.

### Mock Data Strategy

#### Realistic Simulation
- **Contest Data**: Complete contest with problems and test cases
- **Leaderboard**: Live rankings with sample participants
- **Submissions**: Realistic status progression (Pending → Running → Final)
- **API Delays**: Simulated network latency for realistic experience

**Justification**: Mock data provides a complete frontend experience without backend dependencies, enabling rapid development and testing.

## 🔧 Configuration

### Environment Variables
```bash
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001  # For future backend integration
```

### Development Setup
- **Port**: 3000
- **Hot Reload**: Enabled for development
- **Mock API**: Simulated backend responses

## 🧪 Testing

### Demo Data
The application includes comprehensive mock data:
- **Contest**: "Shodh-a-Code Championship 2024"
- **Problems**: 3 problems of varying difficulty
  - Two Sum (Easy)
  - Palindrome Number (Easy)
  - Longest Substring Without Repeating Characters (Medium)
- **Test Cases**: Multiple test cases per problem
- **Leaderboard**: Sample participants with realistic scores

### Test the Application
1. Navigate to http://localhost:3000
2. Enter Contest ID: `1`
3. Enter Username: `your_username`
4. Select a problem and write code
5. Submit and watch real-time status updates
6. Check the live leaderboard

## 🚧 Challenges & Solutions

### Mock Data Simulation
**Challenge**: Creating realistic backend behavior without actual backend
**Solution**: Comprehensive mock data with status progression simulation

### Real-time Updates
**Challenge**: Providing immediate feedback on code execution
**Solution**: Polling strategy with appropriate intervals for different data types

### State Management
**Challenge**: Managing complex async operations and real-time updates
**Solution**: React hooks with proper cleanup and error handling

### User Experience
**Challenge**: Creating engaging contest experience with mock data
**Solution**: Realistic status progression and interactive leaderboard

## 📊 Performance Considerations

- **Component Optimization**: Efficient React rendering with proper hooks
- **Polling Strategy**: Optimized intervals for real-time updates
- **Memory Management**: Proper cleanup of intervals and async operations
- **User Experience**: Smooth interactions with loading states and feedback

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real Spring Boot API
- **WebSocket Integration**: Real-time updates without polling
- **Authentication**: User management and security
- **Advanced Features**: More programming languages and test cases
- **Analytics**: Detailed performance metrics and insights

## 📝 Development Notes

### Key Files
- `src/components/CodeEditor.jsx` - Monaco Editor integration
- `src/components/SubmissionStatus.jsx` - Real-time status updates
- `src/components/Leaderboard.jsx` - Live rankings display
- `src/lib/api.js` - Mock API client
- `src/lib/mockData.js` - Sample data and simulation

### Project Structure
```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable React components
├── lib/                   # Utilities and mock data
└── styles/                # Global styles and Tailwind
```

This frontend demonstrates advanced React/Next.js development skills, featuring real-time UI updates, interactive code editing, and comprehensive user experience design.