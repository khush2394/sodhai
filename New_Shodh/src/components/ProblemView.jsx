'use client'

export default function ProblemView({ problem }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {problem.title}
          </h2>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              problem.difficulty === 'Easy' 
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : problem.difficulty === 'Medium'
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2 text-purple-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Time Limit: {problem.timeLimit}s</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span>Memory Limit: {problem.memoryLimit}MB</span>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <div 
          className="text-purple-100 whitespace-pre-wrap leading-relaxed"
          dangerouslySetInnerHTML={{ __html: problem.description }}
        />
      </div>

      {/* Test Cases Preview */}
      {problem.testCases && problem.testCases.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Sample Test Cases</h3>
          </div>
          <div className="space-y-6">
            {problem.testCases.slice(0, 2).map((testCase, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <h4 className="font-semibold text-green-300">Input:</h4>
                    </div>
                    <pre className="text-sm bg-slate-900/50 text-green-100 p-4 rounded-lg border border-green-500/20 overflow-x-auto font-mono">
                      {testCase.input}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <h4 className="font-semibold text-blue-300">Expected Output:</h4>
                    </div>
                    <pre className="text-sm bg-slate-900/50 text-blue-100 p-4 rounded-lg border border-blue-500/20 overflow-x-auto font-mono">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


