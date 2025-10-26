'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { contestApi } from '@/lib/api'
import CodeEditor from '@/components/CodeEditor'
import ProblemView from '@/components/ProblemView'
import Leaderboard from '@/components/Leaderboard'
import SubmissionStatus from '@/components/SubmissionStatus'
import { Loader2 } from 'lucide-react'

export default function ContestPage() {
  const params = useParams()
  const contestId = params.contestId
  
  console.log('Contest page loaded with contestId:', contestId, 'Type:', typeof contestId)
  
  const [contest, setContest] = useState(null)
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        setIsLoading(true)
        console.log('Fetching data for contest ID:', contestId)
        
        const [contestData, leaderboardData] = await Promise.all([
          contestApi.getContest(contestId),
          contestApi.getLeaderboard(contestId)
        ])
        
        console.log('Contest data received:', contestData)
        console.log('Leaderboard data received:', leaderboardData)
        
        setContest(contestData)
        setLeaderboard(leaderboardData)
        
        // Select first problem by default
        if (contestData.problems && contestData.problems.length > 0) {
          setSelectedProblem(contestData.problems[0])
        }
      } catch (err) {
        console.error('Error fetching contest data:', err)
        setError(`Failed to load contest data: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    if (contestId) {
      fetchContestData()
    } else {
      console.log('No contestId provided')
      setError('No contest ID provided')
      setIsLoading(false)
    }
  }, [contestId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading contest...</span>
        </div>
      </div>
    )
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error || 'Contest not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">{contest.name}</h1>
                <p className="text-purple-100 text-sm">{contest.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                <span className="text-purple-100 text-sm font-medium">Contest ID: {contestId}</span>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem List & View */}
          <div className="lg:col-span-2 space-y-8">
            {/* Problem List */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Problems</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contest.problems.map((problem, index) => (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className={`group relative p-4 text-left rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                      selectedProblem?.id === problem.id
                        ? 'border-purple-400 bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-lg'
                        : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-purple-200 transition-colors">
                          {problem.title}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            problem.difficulty === 'Easy' 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : problem.difficulty === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}>
                            {problem.difficulty}
                          </span>
                          <span className="text-purple-200 text-xs">
                            {problem.timeLimit}s • {problem.memoryLimit}MB
                          </span>
                        </div>
                      </div>
                      <div className="text-purple-300 text-2xl font-bold opacity-50">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                    {selectedProblem?.id === problem.id && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem View */}
            {selectedProblem && (
              <ProblemView problem={selectedProblem} />
            )}

            {/* Code Editor */}
            {selectedProblem && (
              <CodeEditor
                problem={selectedProblem}
                contestId={contestId}
                onSubmission={(submissionId) => {
                  // Handle submission - this will be implemented in CodeEditor
                }}
              />
            )}
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <Leaderboard 
              entries={leaderboard}
              contestId={contestId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


