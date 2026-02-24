'use client'

import { useState } from 'react'

const options = [
  { label: 'By sender', tradeoff: 'Group by who sent them' },
  { label: 'By project', tradeoff: 'Match to projects mentioned in subject and body' },
  { label: 'By urgency', tradeoff: 'Flag time-sensitive items first' },
]

export function StructuredChoice() {
  const [selected, setSelected] = useState<string | null>(null)
  const [customText, setCustomText] = useState('')
  const [customOpen, setCustomOpen] = useState(false)
  const [customSubmitted, setCustomSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const hasSelected = selected || (customOpen && customSubmitted)

  function handleSelect(label: string) {
    setSelected(label)
    setCustomOpen(false)
    setCustomSubmitted(false)
    setConfirmed(false)
  }

  function handleCustomClick() {
    setSelected(null)
    setCustomOpen(true)
    setCustomSubmitted(false)
    setConfirmed(false)
  }

  function handleCustomSubmit() {
    if (customText.trim()) setCustomSubmitted(true)
  }

  function handleConfirm() {
    if (!hasSelected) return
    setConfirmed(true)
  }

  function handleReset() {
    setSelected(null)
    setCustomText('')
    setCustomOpen(false)
    setCustomSubmitted(false)
    setConfirmed(false)
  }

  return (
    <div className="w-full max-w-md not-prose">
      {/* Card wrapper */}
      <div className="p-4 rounded-xl bg-bg-secondary space-y-3">
        {/* Options */}
        <div className={`space-y-1.5 ${confirmed ? 'opacity-60 pointer-events-none' : ''}`}>
        {options.map((opt) => {
          const isSelected = selected === opt.label
          return (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`
                w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all cursor-pointer
                ${isSelected ? 'border-2 border-primary bg-primary/5' : 'border border-border-primary bg-bg-primary hover:border-border-tertiary'}
              `}
            >
              {/* Radio circle */}
              <div
                className={`
                  mt-0.5 w-4 h-4 rounded-full flex-shrink-0 transition-all
                  ${isSelected ? 'border-[5px] border-primary' : 'border-2 border-border-tertiary'}
                `}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-text-primary">{opt.label}</div>
                <div className="text-xs text-text-secondary leading-relaxed">{opt.tradeoff}</div>
              </div>
            </button>
          )
        })}

        {/* Custom option */}
        {customOpen && !customSubmitted ? (
          <div
            className="w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all border-2 border-primary bg-primary/5"
          >
            <div className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 transition-all border-[5px] border-primary" />
            <div className="flex-1 min-w-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCustomSubmit()
                  }}
                  placeholder="Organize by..."
                  autoFocus
                  className="flex-1 text-sm px-2 py-1 rounded-md border border-border-primary bg-bg-primary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleCustomSubmit}
                  disabled={!customText.trim()}
                  className={`
                    px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer
                    ${customText.trim() ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'}
                  `}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleCustomClick}
            className={`
              w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all cursor-pointer
              ${customSubmitted ? 'border-2 border-primary bg-primary/5' : 'border border-border-primary bg-bg-primary hover:border-border-tertiary'}
            `}
          >
            <div
              className={`
                mt-0.5 w-4 h-4 rounded-full flex-shrink-0 transition-all
                ${customSubmitted ? 'border-[5px] border-primary' : 'border-2 border-border-tertiary'}
              `}
            />
            <div className="flex-1 min-w-0">
              {customSubmitted ? (
                <div>
                  <div className="text-sm font-semibold text-text-primary">{customText}</div>
                  <div className="text-xs text-primary mt-0.5">Custom</div>
                </div>
              ) : (
                <div>
                  <div className="text-sm font-medium text-text-secondary">Something else</div>
                  <div className="text-xs text-text-tertiary leading-relaxed">Tell me how you'd like them organized</div>
                </div>
              )}
            </div>
          </button>
        )}
        </div>

        {/* Confirm */}
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={!hasSelected}
            className={`
              w-full py-2.5 rounded-full text-sm font-semibold transition-all
              ${hasSelected ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer' : 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'}
            `}
          >
            Confirm
          </button>
        ) : (
          <div className="flex items-center justify-between py-2.5 px-3 rounded-full bg-bg-success/20 border border-bg-success">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-success-700 dark:text-success-400">
                <path d="M13.3 4.3a1 1 0 010 1.4l-6 6a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4L6.6 9.6l5.3-5.3a1 1 0 011.4 0z" fill="currentColor" />
              </svg>
              <span className="text-sm font-semibold text-success-700 dark:text-success-400">Confirmed: {customSubmitted ? customText : selected}</span>
            </div>
            <button onClick={handleReset} className="text-xs text-text-tertiary hover:text-text-primary transition-colors cursor-pointer">
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StructuredChoice
