'use client'

import { useState, useEffect } from 'react'
import { contestApi } from '@/lib/api'
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react'

export default function SubmissionStatus({ submissionId }) {
  const [submission, setSubmission] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const pollSubmission = async () => {
      try {
        const data = await contestApi.getSubmission(submissionId)
        setSubmission(data)
        
        // Stop polling if submission is completed
        if (data.status === 'Accepted' || 
            data.status === 'Wrong Answer' || 
            data.status === 'Time Limit Exceeded' || 
            data.status === 'Runtime Error' || 
            data.status === 'Compilation Error') {
          setIsLoading(false)
          return
        }
        
        // Continue polling for pending/running submissions
        setTimeout(pollSubmission, 2000) // Poll every 2 seconds
      } catch (err) {
        console.error('Error fetching submission:', err)
        setError('Failed to fetch submission status')
        setIsLoading(false)
      }
    }

    pollSubmission()
  }, [submissionId])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'Wrong Answer':
      case 'Time Limit Exceeded':
      case 'Runtime Error':
      case 'Compilation Error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'Running':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'Wrong Answer':
      case 'Time Limit Exceeded':
      case 'Runtime Error':
      case 'Compilation Error':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'Running':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!submission && isLoading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          <span className="text-blue-600">Fetching submission status...</span>
        </div>
      </div>
    )
  }

  if (!submission) {
    return null
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-white">Submission Status</h4>
        </div>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(submission.status)}`}>
          {getStatusIcon(submission.status)}
          <span className="text-sm font-semibold">{submission.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-purple-200 text-xs mb-1">Score</div>
          <div className="text-white font-bold text-lg">{submission.score}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-purple-200 text-xs mb-1">Time</div>
          <div className="text-white font-bold text-lg">{submission.executionTime}ms</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-purple-200 text-xs mb-1">Memory</div>
          <div className="text-white font-bold text-lg">{submission.memoryUsed}KB</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-purple-200 text-xs mb-1">Language</div>
          <div className="text-white font-bold text-lg capitalize">{submission.language}</div>
        </div>
      </div>

      {submission.status === 'Running' && (
        <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-300">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span className="text-sm font-medium">Your code is being executed...</span>
          </div>
        </div>
      )}
    </div>
  )
}


