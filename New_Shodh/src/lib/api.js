import { mockContest, mockLeaderboard } from './mockData'

// Mock API client for frontend-only development
export const contestApi = {
  // Get contest details
  getContest: async (contestId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Debug: Log the contest ID being requested
    console.log('Fetching contest for ID:', contestId, 'Type:', typeof contestId)
    
    // For demo purposes, accept any contest ID
    if (contestId) {
      return mockContest
    }
    throw new Error('Contest not found')
  },

  // Get leaderboard
  getLeaderboard: async (contestId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // For demo purposes, accept any contest ID
    if (contestId) {
      return mockLeaderboard
    }
    return []
  },

  // Submit code
  submitCode: async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Generate a random submission ID
    const submissionId = Math.floor(Math.random() * 10000) + 1
    return { submissionId: submissionId.toString() }
  },

  // Get submission status
  getSubmission: async (submissionId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Mock different submission statuses based on submission ID
    const statuses = ['Pending', 'Running', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
    
    // Simulate progression: Pending -> Running -> Final Status
    const submissionNumber = parseInt(submissionId) % 3
    let status, score, executionTime, memoryUsed
    
    if (submissionNumber === 0) {
      // First submission - still pending/running
      status = Math.random() > 0.5 ? 'Pending' : 'Running'
      score = 0
      executionTime = 0
      memoryUsed = 0
    } else if (submissionNumber === 1) {
      // Second submission - running
      status = 'Running'
      score = 0
      executionTime = 0
      memoryUsed = 0
    } else {
      // Third submission - completed
      status = randomStatus
      score = status === 'Accepted' ? 30 : 0
      executionTime = Math.floor(Math.random() * 500) + 100
      memoryUsed = Math.floor(Math.random() * 2048) + 512
    }
    
    return {
      id: submissionId,
      contestId: "1",
      problemId: "1", 
      userId: "demo_user",
      code: "// Your submitted code here",
      language: "javascript",
      status: status,
      score: score,
      executionTime: executionTime,
      memoryUsed: memoryUsed,
      submittedAt: new Date().toISOString()
    }
  },
}

export default contestApi


