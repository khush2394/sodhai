'use client'

import { useState, useEffect } from 'react'
import { contestApi } from '@/lib/api'
import { Trophy, Medal, Award, Users } from 'lucide-react'

export default function Leaderboard({ entries: initialEntries, contestId }) {
  const [entries, setEntries] = useState(initialEntries)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const pollLeaderboard = async () => {
      try {
        setIsLoading(true)
        const data = await contestApi.getLeaderboard(contestId)
        setEntries(data)
        setLastUpdated(new Date())
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Poll every 15 seconds
    const interval = setInterval(pollLeaderboard, 15000)
    
    return () => clearInterval(interval)
  }, [contestId])

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
    }
  }

  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return 'bg-yellow-50 border-yellow-200'
      case 1:
        return 'bg-gray-50 border-gray-200'
      case 2:
        return 'bg-amber-50 border-amber-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  const formatTime = (timeString) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString()
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Trophy className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Leaderboard</h3>
        </div>
        <div className="flex items-center space-x-3">
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
          )}
          <div className="text-xs text-purple-200 bg-white/10 px-2 py-1 rounded-lg">
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-purple-300" />
          </div>
          <p className="text-purple-200 text-lg">No participants yet</p>
          <p className="text-purple-300 text-sm mt-2">Be the first to join!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div
              key={entry.userId}
              className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${getRankColor(index)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-purple-200 transition-colors">
                      {entry.username}
                    </div>
                    <div className="text-sm text-purple-200">
                      {entry.problemsSolved} problem{entry.problemsSolved !== 1 ? 's' : ''} solved
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {entry.totalScore}
                  </div>
                  <div className="text-xs text-purple-300">
                    {formatTime(entry.lastSubmissionTime)}
                  </div>
                </div>
              </div>
              {index < 3 && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-xs text-purple-300 text-center bg-white/5 px-3 py-2 rounded-lg">
          🔄 Updates automatically every 15 seconds
        </div>
      </div>
    </div>
  )
}


