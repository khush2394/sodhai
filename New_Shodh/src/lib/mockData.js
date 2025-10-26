// Mock data for frontend-only development
export const mockContest = {
  id: "1",
  name: "Shodh-a-Code Championship 2024",
  description: "Welcome to the ultimate coding championship! Solve challenging problems and climb the leaderboard.",
  startTime: "2024-01-15T09:00:00",
  endTime: "2024-01-22T18:00:00",
  problems: [
    {
      id: "1",
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nExample 2:\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\nExample 3:\nInput: nums = [3,3], target = 6\nOutput: [0,1]",
      difficulty: "Easy",
      timeLimit: 2,
      memoryLimit: 128,
      testCases: [
        {
          id: "1",
          input: "[2,7,11,15]\n9",
          expectedOutput: "[0,1]"
        },
        {
          id: "2", 
          input: "[3,2,4]\n6",
          expectedOutput: "[1,2]"
        },
        {
          id: "3",
          input: "[3,3]\n6", 
          expectedOutput: "[0,1]"
        }
      ]
    },
    {
      id: "2",
      title: "Palindrome Number",
      description: "Given an integer x, return true if x is a palindrome integer.\n\nAn integer is a palindrome when it reads the same backward as forward.\n\nFor example, 121 is a palindrome while 123 is not.\n\nExample 1:\nInput: x = 121\nOutput: true\nExplanation: 121 reads as 121 from left to right and from right to left.\n\nExample 2:\nInput: x = -121\nOutput: false\nExplanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.\n\nExample 3:\nInput: x = 10\nOutput: false\nExplanation: Reads 01 from right to left. Therefore it is not a palindrome.",
      difficulty: "Easy",
      timeLimit: 1,
      memoryLimit: 64,
      testCases: [
        {
          id: "4",
          input: "121",
          expectedOutput: "true"
        },
        {
          id: "5",
          input: "-121", 
          expectedOutput: "false"
        },
        {
          id: "6",
          input: "10",
          expectedOutput: "false"
        }
      ]
    },
    {
      id: "3",
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string s, find the length of the longest substring without repeating characters.\n\nExample 1:\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n\nExample 2:\nInput: s = \"bbbbb\"\nOutput: 1\nExplanation: The answer is \"b\", with the length of 1.\n\nExample 3:\nInput: s = \"pwwkew\"\nOutput: 3\nExplanation: The answer is \"wke\", with the length of 3.\nNotice that the answer must be a substring, \"pwke\" is a subsequence and not a substring.",
      difficulty: "Medium",
      timeLimit: 3,
      memoryLimit: 256,
      testCases: [
        {
          id: "7",
          input: "abcabcbb",
          expectedOutput: "3"
        },
        {
          id: "8",
          input: "bbbbb",
          expectedOutput: "1"
        },
        {
          id: "9",
          input: "pwwkew",
          expectedOutput: "3"
        }
      ]
    }
  ]
}

export const mockLeaderboard = [
  {
    userId: "alice_coder",
    username: "Alice Coder",
    totalScore: 90,
    problemsSolved: 3,
    lastSubmissionTime: "2024-01-15T14:30:00"
  },
  {
    userId: "bob_dev",
    username: "Bob Developer", 
    totalScore: 60,
    problemsSolved: 2,
    lastSubmissionTime: "2024-01-15T14:25:00"
  },
  {
    userId: "charlie_hacker",
    username: "Charlie Hacker",
    totalScore: 30,
    problemsSolved: 1,
    lastSubmissionTime: "2024-01-15T14:20:00"
  }
]

// Mock submission statuses for demonstration
export const mockSubmissionStatuses = {
  "pending": "Pending",
  "running": "Running", 
  "accepted": "Accepted",
  "wrong_answer": "Wrong Answer",
  "time_limit_exceeded": "Time Limit Exceeded",
  "runtime_error": "Runtime Error",
  "compilation_error": "Compilation Error"
}
