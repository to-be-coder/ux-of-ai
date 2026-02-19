'use client'

import { useState, useCallback } from 'react'
import { ConfidenceIndicator } from './confidence-indicator'

const PRESET_QUESTION = 'What investment strategy should I use for my portfolio?'

const PRESET_RESPONSE = {
  text: `Based on current market trends and historical data, the recommended approach would be to diversify your portfolio across multiple asset classes. However, individual circumstances vary significantly, and this general advice may not apply to your specific situation.`,
  confidence: 'low' as const,
  missingContext: [
    { id: '1', text: 'Your current portfolio allocation' },
    { id: '2', text: 'Risk tolerance level' },
    { id: '3', text: 'Investment timeline' },
    { id: '4', text: 'Financial goals' },
  ],
}

const FOLLOW_UP_MESSAGE = `Here's the missing context you need:
• Current portfolio: 60% stocks, 30% bonds, 10% cash
• Risk tolerance: Moderate
• Timeline: 15 years until retirement
• Goal: Maximize growth while preserving capital`

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center h-6">
      <div className="w-2 h-2 bg-[#475467] rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-[#475467] rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-[#475467] rounded-full animate-bounce" />
    </div>
  )
}

export function StreamingDemo() {
  const [showQuestion, setShowQuestion] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showConfidence, setShowConfidence] = useState(false)
  const [showFollowUp, setShowFollowUp] = useState(false)

  const startDemo = useCallback(() => {
    // Reset state
    setShowQuestion(false)
    setShowTyping(false)
    setDisplayedText('')
    setIsStreaming(false)
    setIsComplete(false)
    setShowConfidence(false)
    setShowFollowUp(false)

    // Step 1: Show human question
    setShowQuestion(true)

    // Step 2: Show typing indicator after a brief pause
    setTimeout(() => {
      setShowTyping(true)

      // Step 3: Start streaming after typing indicator shows
      setTimeout(() => {
        setShowTyping(false)
        setIsStreaming(true)

        const text = PRESET_RESPONSE.text
        let index = 0

        const interval = setInterval(() => {
          if (index < text.length) {
            const chunkSize = Math.floor(Math.random() * 3) + 1
            const nextIndex = Math.min(index + chunkSize, text.length)
            setDisplayedText(text.slice(0, nextIndex))
            index = nextIndex
          } else {
            clearInterval(interval)
            setIsStreaming(false)
            setIsComplete(true)
            setTimeout(() => setShowConfidence(true), 300)
          }
        }, 30)
      }, 1000)
    }, 500)
  }, [])

  const handleFindContext = useCallback(() => {
    setShowFollowUp(true)
  }, [])

  const handleReset = () => {
    setShowQuestion(false)
    setShowTyping(false)
    setDisplayedText('')
    setIsStreaming(false)
    setIsComplete(false)
    setShowConfidence(false)
    setShowFollowUp(false)
  }

  return (
    <div className="flex flex-col gap-4 w-full not-prose">
      {/* Chat area */}
      <div className="bg-[#1a1a1a] rounded-xl p-4 min-h-[500px] flex flex-col">
        {!showQuestion && !isComplete && (
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={startDemo}
              className="bg-[#3d4a54] text-[#f2f7fc] rounded-xl px-6 py-3 text-base font-medium hover:bg-[#475467] transition-colors cursor-pointer"
            >
              Run Demo
            </button>
          </div>
        )}

        {/* Human question section */}
        {showQuestion && (
          <div className="flex flex-col gap-1 items-end w-full">
            <div className="bg-[#3d4a54] rounded-lg px-3.5 py-2.5 max-w-[80%]">
              <p className="text-[#f2f7fc] text-base leading-6">{PRESET_QUESTION}</p>
            </div>
          </div>
        )}

        {/* Spacer between question and response */}
        {(showTyping || displayedText) && <div className="h-10" />}

        {/* AI response section */}
        {(showTyping || displayedText) && (
          <div className="flex flex-col gap-1 items-start w-full">
            {/* AI typing indicator */}
            {showTyping && <TypingIndicator />}

            {/* AI response */}
            {displayedText && (
              <div className="px-3.5 py-2.5 w-full">
                <p className="text-[#f2f7fc] text-base leading-6 whitespace-pre-line">
                  {displayedText}
                  {isStreaming && <span className="inline-block w-0.5 h-4 bg-[#f2f7fc] ml-0.5 animate-pulse" />}
                </p>
              </div>
            )}

            {/* Bottom row with confidence indicator */}
            {isComplete && (
              <div className="flex items-start justify-between w-full p-2.5">
                <div />
                {showConfidence && (
                  <ConfidenceIndicator
                    level={PRESET_RESPONSE.confidence}
                    missingContext={PRESET_RESPONSE.missingContext}
                    onFindContext={handleFindContext}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Follow-up human message with context */}
        {showFollowUp && (
          <>
            <div className="h-10" />
            <div className="flex flex-col gap-1 items-end w-full">
              <div className="bg-[#3d4a54] rounded-lg px-3.5 py-2.5 max-w-[80%]">
                <p className="text-[#f2f7fc] text-base leading-6 whitespace-pre-line">{FOLLOW_UP_MESSAGE}</p>
              </div>
            </div>
          </>
        )}

        
      </div>

      {/* Controls */}
      {isComplete && (
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="bg-transparent text-[#667085] rounded-xl px-4 py-3 text-base hover:text-[#f2f7fc] transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

export default StreamingDemo
