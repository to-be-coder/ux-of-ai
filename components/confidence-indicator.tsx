'use client'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import { useState } from 'react'

type ConfidenceLevel = 'low' | 'medium' | 'high'

interface MissingContext {
  id: string
  text: string
}

interface ConfidenceIndicatorProps {
  level?: ConfidenceLevel
  missingContext?: MissingContext[]
  onFindContext?: () => void
}

const LEVEL_CONFIG = {
  low: {
    label: 'Low',
    colors: ['bg-bg-error', 'bg-bg-quinary', 'bg-bg-quinary'],
  },
  medium: {
    label: 'Medium',
    colors: ['bg-bg-warning', 'bg-bg-warning', 'bg-bg-quinary'],
  },
  high: {
    label: 'High',
    colors: ['bg-bg-success', 'bg-bg-success', 'bg-bg-success'],
  },
} as const

function ConfidenceLevelTrigger({ level }: { level: ConfidenceLevel }) {
  const { colors } = LEVEL_CONFIG[level]

  return (
    <div className="flex h-1 w-14 gap-1" aria-label={`Confidence: ${level}`}>
      {colors.map((color, i) => (
        <div key={i} className={cn('h-full flex-1 rounded-sm', color)} />
      ))}
    </div>
  )
}

function ConfidenceLevelCard({ level, missingContext, onFindContext }: { level: ConfidenceLevel; missingContext: MissingContext[]; onFindContext?: () => void }) {
  const { label } = LEVEL_CONFIG[level]

  return (
    <div className="flex w-[300px] flex-col overflow-hidden rounded-xl">
      <div className="px-4 pt-3">
        <span className="text-base leading-6 text-text-secondary">Confidence: {label}</span>
      </div>

      <Separator className="mt-3 bg-border-secondary" />

      <div className="not-prose space-y-3 overflow-y-auto px-4 py-3">
        <p className="text-base text-text-primary">Missing Context:</p>
        <ul className="ml-6 list-disc space-y-3">
          {missingContext.map((item) => (
            <li key={item.id} className="text-base text-text-primary">
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-b-xl bg-bg-tertiary px-3 py-2">
        <Button variant="ghost" onClick={onFindContext} className="h-auto w-full justify-start gap-2 p-0 bg-bg-tertiary text-text-primary hover:bg-transparent hover:opacity-80 cursor-pointer">
          <Search size={16} strokeWidth={1.5} />
          Find missing context
        </Button>
      </div>
    </div>
  )
}

export function ConfidenceIndicator({
  level = 'low',
  missingContext = [
    { id: '1', text: 'Missing context 1' },
    { id: '2', text: 'Missing context 2' },
    { id: '3', text: 'Missing context 3' },
    { id: '4', text: 'Missing context 4' },
  ],
  onFindContext,
}: ConfidenceIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="min-h-8 cursor-pointer rounded-xl px-2 py-1.5 hover:bg-bg-quaternary" aria-expanded={isOpen}>
          <ConfidenceLevelTrigger level={level} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto border-none bg-bg-secondary p-0 rounded-xl shadow-md overflow-hidden">
        <ConfidenceLevelCard
          level={level}
          missingContext={missingContext}
          onFindContext={() => {
            setIsOpen(false)
            onFindContext?.()
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default ConfidenceIndicator
