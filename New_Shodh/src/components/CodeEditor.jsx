'use client'

import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import { contestApi } from '@/lib/api'
import { Play, Loader2 } from 'lucide-react'
import SubmissionStatus from './SubmissionStatus'

export default function CodeEditor({ problem, contestId, onSubmission }) {
  const [code, setCode] = useState(`// Write your solution here
function solution() {
    // Your code goes here
    return 0;
}`)
  const [language, setLanguage] = useState('javascript')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentSubmissionId, setCurrentSubmissionId] = useState(null)
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  const handleSubmit = async () => {
    if (!code.trim()) return

    setIsSubmitting(true)
    try {
      const username = localStorage.getItem('username') || 'anonymous'
      const response = await contestApi.submitCode({
        contestId,
        problemId: problem.id,
        userId: username,
        code,
        language
      })
      
      setCurrentSubmissionId(response.submissionId)
      onSubmission(response.submissionId)
    } catch (error) {
      console.error('Error submitting code:', error)
      alert('Failed to submit code. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getLanguageOptions = () => [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Code Editor</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            >
              {getLanguageOptions().map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !code.trim()}
            className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
          >
            <span className="relative z-10 flex items-center space-x-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span>Submit</span>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      <div className="border border-white/20 rounded-xl overflow-hidden shadow-lg">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontFamily: "'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace",
            fontLigatures: true,
            cursorStyle: 'line',
            cursorBlinking: 'smooth',
            renderWhitespace: 'selection',
            wordWrap: 'on',
            lineHeight: 1.6,
            padding: { top: 16, bottom: 16 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
            },
          }}
        />
      </div>

      {/* Submission Status */}
      {currentSubmissionId && (
        <div className="mt-6">
          <SubmissionStatus submissionId={currentSubmissionId} />
        </div>
      )}
    </div>
  )
}


