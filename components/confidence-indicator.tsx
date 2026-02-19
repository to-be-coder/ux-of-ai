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
    colors: ['bg-[#7d0000]', 'bg-[#475467]', 'bg-[#475467]'],
  },
  medium: {
    label: 'Medium',
    colors: ['bg-[#844600]', 'bg-[#844600]', 'bg-[#475467]'],
  },
  high: {
    label: 'High',
    colors: ['bg-[#12651a]', 'bg-[#12651a]', 'bg-[#12651a]'],
  },
} as const

function ConfidenceLevelTrigger({ level, isSelected }: { level: ConfidenceLevel; isSelected: boolean }) {
  const { colors } = LEVEL_CONFIG[level]

  return (
    <div
      className={cn(
        'flex h-8 items-center justify-center rounded-xl px-2 transition-colors',
        isSelected ? 'bg-[#263035]' : 'hover:bg-[#263035]/50'
      )}
      aria-label={`Confidence: ${level}`}
    >
      <div className="flex h-1 w-14 gap-1">
        {colors.map((color, i) => (
          <div key={i} className={cn('h-full flex-1 rounded-sm', color)} />
        ))}
      </div>
    </div>
  )
}

function ConfidenceLevelCard({
  level,
  missingContext,
  onFindContext,
}: {
  level: ConfidenceLevel
  missingContext: MissingContext[]
  onFindContext?: () => void
}) {
  const { label } = LEVEL_CONFIG[level]

  return (
    <div className="flex w-[300px] flex-col overflow-hidden">
      <div className="px-4 pt-3">
        <span className="text-base leading-6 text-[#d0d5dd]">Confidence: {label}</span>
      </div>

      <Separator className="mt-3 bg-[#3d4a54]" />

      <div className="not-prose space-y-3 overflow-y-auto px-4 py-3">
        <p className="text-base text-[#f2f7fc]">Missing Context:</p>
        <ul className="ml-6 list-disc space-y-3">
          {missingContext.map((item) => (
            <li key={item.id} className="text-base text-[#f2f7fc]">
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-b-xl bg-[#3d4a54] px-3 py-2">
        <Button
          variant="ghost"
          onClick={onFindContext}
          className="h-auto w-full justify-start gap-2 p-0 text-base leading-6 text-[#f2f7fc] hover:bg-transparent hover:opacity-80"
        >
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
        <Button
          variant="ghost"
          className="h-auto p-0 hover:bg-transparent"
          aria-expanded={isOpen}
        >
          <ConfidenceLevelTrigger level={level} isSelected={isOpen} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-auto border-none bg-[#263035] p-0 rounded-xl shadow-md"
      >
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
